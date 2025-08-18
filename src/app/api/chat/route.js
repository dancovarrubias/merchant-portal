import { NextResponse } from 'next/server';
import assistantService from '@/lib/openai/assistant.service';

export async function POST(request) {
  try {
    const { message, threadId, action } = await request.json();

    if (action === 'create-thread') {
      const result = await assistantService.createThread();
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        threadId: result.data.id,
        thread: result.data 
      });
    }

    if (action === 'send-message') {
      if (!threadId || !message) {
        return NextResponse.json(
          { error: 'Thread ID and message are required' },
          { status: 400 }
        );
      }

      const sendResult = await assistantService.sendMessage(threadId, message);
      if (!sendResult.success) {
        return NextResponse.json(
          { error: sendResult.error },
          { status: 500 }
        );
      }

      const runResult = await assistantService.runAssistant(threadId);
      if (!runResult.success) {
        return NextResponse.json(
          { error: runResult.error },
          { status: 500 }
        );
      }

      const completionResult = await assistantService.waitForCompletion(
        threadId, 
        runResult.data.id
      );
      if (!completionResult.success) {
        return NextResponse.json(
          { error: completionResult.error },
          { status: 500 }
        );
      }

      const messagesResult = await assistantService.getMessages(threadId);
      if (!messagesResult.success) {
        return NextResponse.json(
          { error: messagesResult.error },
          { status: 500 }
        );
      }

      const assistantMessage = messagesResult.data.find(
        msg => msg.role === 'assistant' && msg.run_id === runResult.data.id
      );

      if (!assistantMessage) {
        return NextResponse.json(
          { error: 'No assistant response found' },
          { status: 500 }
        );
      }

      const content = assistantService.extractTextContent(assistantMessage);

      return NextResponse.json({
        success: true,
        message: content,
        threadId: threadId,
        messageId: assistantMessage.id,
      });
    }

    if (action === 'get-messages') {
      if (!threadId) {
        return NextResponse.json(
          { error: 'Thread ID is required' },
          { status: 400 }
        );
      }

      const result = await assistantService.getMessages(threadId);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        );
      }

      const messages = result.data.map(msg => ({
        id: msg.id,
        role: msg.role,
        content: assistantService.extractTextContent(msg),
        createdAt: msg.created_at,
      }));

      return NextResponse.json({ 
        success: true,
        messages: messages.reverse() 
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json(
        { error: 'Thread ID is required' },
        { status: 400 }
      );
    }

    const result = await assistantService.deleteThread(threadId);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Thread deleted successfully' 
    });

  } catch (error) {
    console.error('Delete Thread Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}