# Virtual Assistant - Kike

## Overview

Kike is a virtual assistant integrated into the Kueski Pay POS system. It provides real-time help and support to users through a conversational interface. The assistant is designed to be friendly, helpful, and always available.

## Architecture

```
assistant/
├── ChatMessage.jsx          # Message bubble component
├── ChatModal.jsx            # Main chat interface
├── ChatFloatingButton.jsx   # Draggable floating button
├── VirtualAssistant.jsx     # Main container component
└── CLAUDE.md               # This documentation
```

## Components

### VirtualAssistant

Main component that orchestrates the entire chat system.

```jsx
import VirtualAssistant from './design-system/components/assistant/VirtualAssistant';

// Usage in DashboardLayout
<VirtualAssistant />
```

**Features:**
- Integrates all chat components
- Uses `useChat` hook for state management
- Handles message preview and notifications
- Auto-renders on all dashboard pages

### ChatFloatingButton

Draggable floating button with Kike's avatar that provides access to the chat.

```jsx
<ChatFloatingButton
  onClick={openChat}
  hasNewMessage={hasNewMessage}
  previewMessage={previewMessage}
/>
```

**Features:**
- **Draggable**: Can be repositioned by dragging
- **Message Preview**: Shows assistant responses for 5 seconds
- **Visual Feedback**: Pulse animation for new messages
- **Kike's Avatar**: Uses `/kike.jpg` image
- **Tooltip**: "Chat con Kike" on hover
- **Smart Click Detection**: Differentiates between drag and click

**Position State:**
```javascript
const [position, setPosition] = useState({ 
  bottom: 24, 
  right: 24 
});
```

### ChatModal

Main chat interface using the Modal component with a special 'chat' variant.

```jsx
<ChatModal
  isOpen={isModalOpen}
  onClose={closeChat}
  messages={messages}
  onSendMessage={sendMessage}
  isTyping={isTyping}
/>
```

**Features:**
- **Full Height Layout**: Uses flexbox with `min-h-0` for proper expansion
- **Welcome Message**: "¿En qué puedo ayudarte hoy?"
- **Quick Actions**: Pre-defined action buttons for common questions
- **Emoji Picker**: 16 popular emojis
- **Typing Indicator**: Animated dots when assistant is "typing"
- **Auto-scroll**: Automatically scrolls to latest message
- **Enter to Send**: Supports keyboard shortcuts

**Layout Structure:**
```jsx
<Modal variant="chat">
  <div className="flex flex-col flex-1 min-h-0">
    <div className="flex-1 overflow-y-auto">
      {/* Messages */}
    </div>
    {/* Quick Actions */}
    {/* Input Area */}
  </div>
</Modal>
```

### ChatMessage

Simple, clean message bubble component.

```jsx
<ChatMessage
  message="Hello, how can I help?"
  isUser={false}
/>
```

**Styling:**
- **User Messages**: Blue background, right-aligned
- **Assistant Messages**: Gray background, left-aligned
- **Max Width**: 70% of container
- **No Avatars**: Clean, minimalist design
- **Responsive**: Adapts to mobile screens

## Hook - useChat

Custom React hook that manages all chat functionality.

```javascript
import useChat from './hooks/useChat';

const {
  messages,
  isTyping,
  isModalOpen,
  hasNewMessage,
  previewMessage,
  sendMessage,
  openChat,
  closeChat,
  clearChat
} = useChat();
```

### State Management

```javascript
{
  messages: Array<{
    id: number,
    text: string,
    isUser: boolean,
    timestamp: Date
  }>,
  isTyping: boolean,
  isModalOpen: boolean,
  hasNewMessage: boolean,
  previewMessage: string
}
```

### Methods

- **sendMessage(text)**: Send a message and get response
- **openChat()**: Open the chat modal
- **closeChat()**: Close the chat modal
- **clearChat()**: Clear all messages
- **setHasNewMessage(boolean)**: Control new message indicator
- **setPreviewMessage(string)**: Set preview text

### Response Logic

Currently uses mock responses based on keywords. Ready for OpenAI integration.

```javascript
// Current implementation (Mock)
const getAssistantResponse = (userMessage) => {
  // Keyword-based response selection
  return MOCK_RESPONSES[category][randomIndex];
};

// Future OpenAI integration
const getAssistantResponse = async (userMessage) => {
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: userMessage }]
  });
  return response.choices[0].message.content;
};
```

## Configuration

All configuration is centralized in `/src/constants/chat.js`:

### CHAT_CONFIG

```javascript
{
  WELCOME_MESSAGE: '¿En qué puedo ayudarte hoy?',
  ASSISTANT_NAME: 'Kike',
  ASSISTANT_IMAGE: '/kike.jpg',
  ASSISTANT_STATUS: 'Activo ahora',
  INPUT_PLACEHOLDER: 'Escribe tu mensaje...',
  MODAL_TITLE: 'Chat con Kike',
  PREVIEW_DURATION: 5000,  // 5 seconds
  TYPING_DELAY: {
    MIN: 1000,  // 1 second
    MAX: 2000   // 2 seconds
  }
}
```

### QUICK_ACTIONS

Pre-defined action buttons for common questions:

```javascript
[
  {
    id: 'payment-code',
    text: '¿Cómo genero un código de pago?',
    className: 'px-2.5 py-1 text-xs bg-blue-50...'
  },
  {
    id: 'transactions',
    text: 'Ver mis transacciones',
    className: '...'
  },
  {
    id: 'help',
    text: 'Necesito ayuda',
    className: '...'
  }
]
```

### EMOJI_LIST

```javascript
['😊', '😂', '❤️', '👍', '👏', '🎉', '🙏', '😍', 
 '🤔', '👋', '💪', '🚀', '✨', '🔥', '💯', '😎']
```

### MOCK_RESPONSES

Categorized responses for different types of questions:

```javascript
{
  greeting: [...],     // Welcome messages
  payment: [...],      // Payment-related responses
  transactions: [...], // Transaction queries
  help: [...],        // Help requests
  default: [...]      // Fallback responses
}
```

## Features

### 1. Draggable Floating Button
- User can drag the button to any corner
- Position persists during session
- Smart click vs drag detection (5px threshold)

### 2. Message Preview
- Shows assistant responses when modal is closed
- Auto-dismisses after 5 seconds
- Truncates long messages with ellipsis

### 3. Typing Simulation
- Random delay between 1-2 seconds
- Animated typing indicator
- Creates natural conversation flow

### 4. Keyboard Shortcuts
- **Enter**: Send message
- **Shift+Enter**: New line in message
- **Escape**: Close modal (with confirmation if typing)

### 5. Responsive Design
- Mobile-first approach
- Full-screen modal on mobile
- Centered modal on desktop
- Touch-friendly controls

## OpenAI Integration Guide

### Step 1: Install OpenAI SDK
```bash
npm install openai
```

### Step 2: Add API Key
```javascript
// .env
REACT_APP_OPENAI_API_KEY=your-api-key-here
```

### Step 3: Update useChat Hook
```javascript
// hooks/useChat.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // For development only
});

const getAssistantResponse = async (userMessage) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres Kike, un asistente virtual amigable para Kueski Pay POS. Ayudas con pagos, transacciones y soporte técnico."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    return "Lo siento, hubo un error. ¿Puedes intentar de nuevo?";
  }
};
```

### Step 4: Update sendMessage Method
```javascript
const sendMessage = useCallback(async (messageText) => {
  // ... existing code ...
  
  setIsTyping(true);
  
  try {
    const responseText = await getAssistantResponse(messageText);
    
    const assistantResponse = {
      id: Date.now() + 1,
      text: responseText,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantResponse]);
  } catch (error) {
    // Handle error
  } finally {
    setIsTyping(false);
  }
}, []);
```

## Customization

### Changing Kike's Avatar
1. Replace `/public/kike.jpg` with new image
2. Update `CHAT_CONFIG.ASSISTANT_IMAGE` if path changes

### Modifying Quick Actions
Edit `QUICK_ACTIONS` in `/src/constants/chat.js`:
```javascript
QUICK_ACTIONS.push({
  id: 'new-action',
  text: 'Nueva acción',
  className: 'px-2.5 py-1 text-xs bg-blue-50...'
});
```

### Changing Color Scheme
Update className properties in components:
- User messages: `bg-blue-600` in ChatMessage
- Assistant messages: `bg-gray-100` in ChatMessage
- Floating button: `bg-blue-600` in ChatFloatingButton

### Adding Message Persistence
```javascript
// In useChat hook
useEffect(() => {
  const saved = localStorage.getItem('chat_messages');
  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem('chat_messages', JSON.stringify(messages));
}, [messages]);
```

## Testing

### Unit Tests
```javascript
describe('ChatMessage', () => {
  it('renders user message correctly', () => {
    render(<ChatMessage message="Hello" isUser={true} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});

describe('useChat', () => {
  it('sends and receives messages', async () => {
    const { result } = renderHook(() => useChat());
    
    act(() => {
      result.current.sendMessage('Hello');
    });
    
    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2);
    });
  });
});
```

### E2E Tests
```javascript
describe('Virtual Assistant', () => {
  it('opens chat when button is clicked', () => {
    cy.visit('/dashboard');
    cy.get('[data-testid="chat-button"]').click();
    cy.get('[data-testid="chat-modal"]').should('be.visible');
  });
  
  it('sends message on Enter key', () => {
    cy.get('textarea').type('Hello{enter}');
    cy.get('[data-testid="message"]').should('contain', 'Hello');
  });
});
```

## Performance Optimization

### Lazy Loading
```javascript
const VirtualAssistant = lazy(() => 
  import('./design-system/components/assistant/VirtualAssistant')
);

// In DashboardLayout
<Suspense fallback={null}>
  <VirtualAssistant />
</Suspense>
```

### Message Virtualization
For long conversations (100+ messages):
```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={400}
  itemCount={messages.length}
  itemSize={80}
>
  {({ index, style }) => (
    <div style={style}>
      <ChatMessage {...messages[index]} />
    </div>
  )}
</FixedSizeList>
```

### Memoization
```javascript
const ChatMessage = React.memo(({ message, isUser }) => {
  // Component implementation
});

const MemoizedQuickActions = React.memo(({ onAction }) => {
  return QUICK_ACTIONS.map(action => (
    <button key={action.id} onClick={() => onAction(action)}>
      {action.text}
    </button>
  ));
});
```

## Accessibility

### ARIA Labels
```jsx
<button aria-label="Abrir chat con Kike">
<div role="dialog" aria-label="Chat con asistente virtual">
<textarea aria-label="Mensaje para el asistente">
```

### Keyboard Navigation
- Tab navigation through all interactive elements
- Escape key to close modal
- Enter key to send messages
- Arrow keys for emoji picker

### Screen Reader Support
```jsx
<div className="sr-only">
  Nuevo mensaje de Kike: {previewMessage}
</div>
```

## Troubleshooting

### Chat not appearing
1. Check VirtualAssistant is imported in DashboardLayout
2. Verify all dependencies are installed
3. Check browser console for errors

### Messages not sending
1. Verify useChat hook is properly imported
2. Check sendMessage function is called correctly
3. Look for JavaScript errors in console

### Floating button not draggable
1. Check touch/mouse event handlers
2. Verify hasMoved state logic
3. Test on different devices/browsers

### Performance issues
1. Implement message virtualization for long chats
2. Use React.memo for components
3. Lazy load the assistant component
4. Clear old messages periodically

## Future Enhancements

- [ ] Voice input/output support
- [ ] File attachment capability
- [ ] Chat history persistence
- [ ] Multi-language support
- [ ] Sentiment analysis
- [ ] Smart suggestions based on context
- [ ] Integration with backend APIs
- [ ] WebSocket for real-time responses
- [ ] Chat export functionality
- [ ] User feedback system
- [ ] Analytics and metrics tracking
- [ ] Conversation threading
- [ ] Rich message formats (cards, buttons)
- [ ] Proactive assistance triggers

## Version History

- **v1.0.0** - Initial implementation with mock responses
- **v1.1.0** - Added draggable floating button
- **v1.2.0** - Implemented emoji picker
- **v1.3.0** - Added message preview feature
- **v2.0.0** - Complete refactoring with hooks and constants