# OpenAI Integration

## Overview
OpenAI integration for the Kike virtual assistant, providing intelligent conversational capabilities.

## Architecture

```
lib/openai/
├── config.js              # OpenAI client configuration
├── assistant.service.js   # Main service class for assistant
├── types.js              # TypeScript-like type definitions
├── response-cleaner.js   # Response formatting utility
└── cleaner.config.js     # Cleaner configuration
```

## Components

### config.js
OpenAI client initialization and configuration.
- **API Key**: Environment variable `OPENAI_API_KEY`
- **Assistant ID**: Environment variable `OPENAI_ASSISTANT_ID`
- **Client Instance**: Singleton OpenAI client

### assistant.service.js
Main service class for managing assistant interactions.

#### Methods
```javascript
class AssistantService {
  // Create a new conversation thread
  async createThread()
  
  // Send a message to the assistant
  async sendMessage(threadId, message)
  
  // Run the assistant and get response
  async runAssistant(threadId)
  
  // Get messages from a thread
  async getMessages(threadId)
  
  // Wait for run completion with polling
  async waitForCompletion(threadId, runId, maxAttempts = 30)
}
```

#### Usage Example
```javascript
const assistant = new AssistantService();

// Initialize conversation
const thread = await assistant.createThread();

// Send message and get response
await assistant.sendMessage(thread.id, "How do I generate a payment code?");
const run = await assistant.runAssistant(thread.id);
const messages = await assistant.getMessages(thread.id);
```

### types.js
Type definitions for OpenAI responses.

```javascript
export const RunStatus = {
  QUEUED: 'queued',
  IN_PROGRESS: 'in_progress',
  REQUIRES_ACTION: 'requires_action',
  CANCELLING: 'cancelling',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
  COMPLETED: 'completed',
  EXPIRED: 'expired'
};

export const MessageRole = {
  USER: 'user',
  ASSISTANT: 'assistant'
};
```

### response-cleaner.js
Advanced utility for cleaning and formatting assistant responses while preserving markdown.

#### Features
- Remove OpenAI artifacts (file references, knowledge base refs)
- Preserve line breaks and paragraph formatting
- Convert markdown lists to bullet points (•)
- Clean code blocks while maintaining syntax
- Format markdown for optimal chat display
- Handle special characters correctly

#### Key Methods
```javascript
// Basic cleaning - removes artifacts
responseCleaner.clean(text, options)

// Chat-optimized formatting
responseCleaner.formatForChat(text)

// Full processing pipeline
responseCleaner.process(text, config)
```

#### Recent Improvements
- Fixed line break preservation (`/[^\S\n]+/g` instead of `/\s+/g`)
- Added `formatForChat()` for better markdown display
- Enhanced list formatting with proper spacing
- Improved bullet point conversion (- or * → •)

### cleaner.config.js
Configuration for response cleaning rules.

```javascript
export const getCleanerConfig = () => ({
  removeFileReferences: true,    // Remove 【file】 patterns
  removeSandboxPaths: true,      // Remove sandbox paths
  removeKnowledgeRefs: true,     // Remove knowledge refs
  removeCitations: false,         // Keep citations
  trimExtraSpaces: true,         // Clean spaces
  preserveFormatting: true,      // CRITICAL: Preserve line breaks
  preserveCodeBlocks: true,      // Keep code intact
  applyMarkdownFixes: true       // Apply markdown improvements
});
```

**Important Settings:**
- `preserveFormatting: true` - Essential for maintaining markdown structure
- `trimExtraSpaces: true` with `preserveFormatting: true` - Cleans spaces but keeps line breaks

## Environment Setup

### Required Environment Variables
```bash
# .env.local
OPENAI_API_KEY=sk-...
OPENAI_ASSISTANT_ID=asst_...
```

### Assistant Configuration (OpenAI Platform)
1. Create assistant at platform.openai.com
2. Configure system prompt:
```
You are Kike, a friendly virtual assistant for Kueski Pay POS system.
You help users with:
- Payment processing
- Transaction management
- Order creation and tracking
- Technical support
Respond in Spanish, be concise and helpful.
```
3. Set model: gpt-4 or gpt-3.5-turbo
4. Enable tools if needed (code interpreter, retrieval)

## Integration with Chat Hook

### Current Implementation
The `useChat` hook is fully integrated with OpenAI:
- Automatically creates/restores threads on mount
- Stores thread ID in localStorage for persistence
- Handles message sending and receiving
- Cleans responses using `formatForChat()`

### Session Management
```javascript
// Thread stored in localStorage
localStorage.setItem('chatThreadId', threadId);

// Clear on logout
localStorage.removeItem('chatThreadId');
  
  useEffect(() => {
    // Initialize thread on mount
    const initThread = async () => {
      const result = await assistant.createThread();
      if (result.success) {
        setThreadId(result.data.id);
      }
    };
    initThread();
  }, []);
  
  const sendMessage = async (text) => {
    if (!threadId) return;
    
    // Add user message
    const userMessage = { text, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    
    // Send to OpenAI
    setIsTyping(true);
    await assistant.sendMessage(threadId, text);
    const run = await assistant.runAssistant(threadId);
    
    if (run.success) {
      const messages = await assistant.getMessages(threadId);
      const latestResponse = messages.data[0].content[0].text.value;
      
      const assistantMessage = {
        text: latestResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }
    
    setIsTyping(false);
  };
  
  return { messages, sendMessage, isTyping };
};
```

## API Route Integration

### /app/api/chat/route.js
```javascript
import AssistantService from '@/lib/openai/assistant.service';

export async function POST(req) {
  const { threadId, message } = await req.json();
  const assistant = new AssistantService();
  
  try {
    // Send message
    await assistant.sendMessage(threadId, message);
    
    // Run assistant
    const run = await assistant.runAssistant(threadId);
    
    // Get response
    const messages = await assistant.getMessages(threadId);
    
    return Response.json({
      success: true,
      response: messages.data[0].content[0].text.value
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

## Error Handling

### Common Errors
```javascript
// Rate limiting
if (error.code === 'rate_limit_exceeded') {
  // Implement exponential backoff
  await delay(1000 * Math.pow(2, attempt));
}

// Invalid API key
if (error.code === 'invalid_api_key') {
  console.error('Invalid OpenAI API key');
  // Return fallback response
}

// Network errors
if (error.code === 'ECONNREFUSED') {
  // Retry with backoff
}
```

## Testing

### Mock Service for Development
```javascript
class MockAssistantService {
  async createThread() {
    return { success: true, data: { id: 'mock-thread-123' } };
  }
  
  async sendMessage(threadId, message) {
    return { success: true, data: { id: 'msg-123' } };
  }
  
  async getMessages() {
    return {
      success: true,
      data: [{
        content: [{ text: { value: 'Mock response' } }]
      }]
    };
  }
}

// Use in development
const assistant = process.env.NODE_ENV === 'development' 
  ? new MockAssistantService() 
  : new AssistantService();
```

## Performance Optimization

### Response Caching
```javascript
const responseCache = new Map();

async function getCachedResponse(message) {
  const cacheKey = message.toLowerCase().trim();
  
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }
  
  const response = await assistant.sendMessage(threadId, message);
  responseCache.set(cacheKey, response);
  
  // Clear cache after 5 minutes
  setTimeout(() => responseCache.delete(cacheKey), 5 * 60 * 1000);
  
  return response;
}
```

### Streaming Responses
```javascript
// For real-time streaming (future enhancement)
const stream = await openai.beta.threads.runs.createAndStream(
  threadId,
  { assistant_id: ASSISTANT_ID }
);

stream.on('textDelta', (delta) => {
  // Update UI with partial response
  updateMessage(delta.value);
});
```

## Security Considerations

- Never expose API keys in client-side code
- Use environment variables for sensitive data
- Implement rate limiting on API routes
- Validate and sanitize user inputs
- Use HTTPS for all API calls
- Implement user authentication before chat access

## Future Enhancements

- Streaming responses for better UX
- Conversation history persistence
- Multi-language support
- Voice input/output
- File upload support
- Function calling for actions
- Fine-tuning for domain-specific responses
- Analytics and usage tracking