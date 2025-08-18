import openai, { ASSISTANT_ID } from './config';
import { RunStatus } from './types';
import responseCleaner from './response-cleaner';
import { getCleanerConfig } from './cleaner.config';

class AssistantService {
  constructor() {
    this.openai = openai;
    this.assistantId = ASSISTANT_ID;
  }

  async createThread() {
    try {
      const thread = await this.openai.beta.threads.create();
      return { success: true, data: thread };
    } catch (error) {
      console.error('Error creating thread:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to create thread' 
      };
    }
  }

  async sendMessage(threadId, message) {
    try {
      const threadMessage = await this.openai.beta.threads.messages.create(
        threadId,
        {
          role: 'user',
          content: message,
        }
      );
      return { success: true, data: threadMessage };
    } catch (error) {
      console.error('Error sending message:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to send message' 
      };
    }
  }

  async runAssistant(threadId) {
    try {
      console.log('Running assistant with:', { threadId, assistantId: this.assistantId });
      const run = await this.openai.beta.threads.runs.create(threadId, {
        assistant_id: this.assistantId,
      });
      console.log('Run created successfully:', { runId: run.id, status: run.status });
      return { success: true, data: run };
    } catch (error) {
      console.error('Error running assistant:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to run assistant' 
      };
    }
  }

  async checkRunStatus(threadId, runId) {
    try {
      console.log('Checking run status:', { threadId, runId });
      if (!threadId || !runId) {
        throw new Error(`Invalid parameters: threadId=${threadId}, runId=${runId}`);
      }
      
      // Use fetch directly to avoid SDK parameter issues
      const apiKey = process.env.OPENAI_API_KEY;
      const url = `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'OpenAI-Beta': 'assistants=v2',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to retrieve run status');
      }
      
      const run = await response.json();
      console.log('Run status retrieved:', { status: run.status });
      return { success: true, data: run };
    } catch (error) {
      console.error('Error checking run status:', error);
      console.error('Error details:', {
        threadId,
        runId,
        errorMessage: error.message
      });
      return { 
        success: false, 
        error: error.message || 'Failed to check run status' 
      };
    }
  }

  async waitForCompletion(threadId, runId, maxAttempts = 30) {
    let attempts = 0;
    
    console.log('Starting waitForCompletion with:', { threadId, runId });
    
    while (attempts < maxAttempts) {
      const { success, data: run, error } = await this.checkRunStatus(threadId, runId);
      
      if (!success) {
        console.error('Failed to check run status:', error);
        return { success: false, error };
      }

      if (run.status === RunStatus.COMPLETED) {
        return { success: true, data: run };
      }

      if (run.status === RunStatus.FAILED || 
          run.status === RunStatus.CANCELLED || 
          run.status === RunStatus.EXPIRED) {
        return { 
          success: false, 
          error: `Run ${run.status}: ${run.last_error?.message || 'Unknown error'}` 
        };
      }

      if (run.status === RunStatus.REQUIRES_ACTION) {
        return { 
          success: false, 
          error: 'Assistant requires action, which is not supported yet' 
        };
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return { 
      success: false, 
      error: 'Timeout waiting for completion' 
    };
  }

  async getMessages(threadId, limit = 20) {
    try {
      const messages = await this.openai.beta.threads.messages.list(threadId, {
        limit,
        order: 'desc',
      });
      return { success: true, data: messages.data };
    } catch (error) {
      console.error('Error getting messages:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to get messages' 
      };
    }
  }

  async deleteThread(threadId) {
    try {
      const result = await this.openai.beta.threads.del(threadId);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error deleting thread:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to delete thread' 
      };
    }
  }

  extractTextContent(message) {
    if (!message.content || !Array.isArray(message.content)) {
      return '';
    }

    const rawText = message.content
      .filter(content => content.type === 'text')
      .map(content => content.text.value)
      .join('\n');

    // Clean the response to remove file references and other artifacts
    // Use configuration based on environment
    const cleanerConfig = getCleanerConfig();
    const cleanedText = responseCleaner.process(rawText, cleanerConfig);

    // Log cleaning in development for debugging
    if (process.env.NODE_ENV === 'development' && rawText !== cleanedText) {
      console.log('Response cleaned:', {
        original: rawText.substring(0, 200) + '...',
        cleaned: cleanedText.substring(0, 200) + '...',
        removed: rawText.length - cleanedText.length + ' characters'
      });
    }

    return cleanedText;
  }
}

export default new AssistantService();