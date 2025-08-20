# Virtual Assistant - Kike

## Overview
Kike is the virtual assistant integrated into the Kueski Pay POS system, providing real-time help through a conversational interface.

## Components

### VirtualAssistant.jsx
Main container that orchestrates the chat system.
- Integrates ChatFloatingButton and ChatModal
- Uses `useChat` hook for state management
- Auto-renders on all dashboard pages

### ChatFloatingButton.jsx
Draggable floating button with Kike's avatar.
- **Draggable**: Can be repositioned by dragging
- **Message Preview**: Shows responses for 5 seconds
- **Pulse Animation**: Visual feedback for new messages
- **Smart Click Detection**: 5px threshold for drag vs click

### ChatModal.jsx
Main chat interface using Modal component with 'chat' variant.
- **Welcome Message**: "¿En qué puedo ayudarte hoy?"
- **Quick Actions**: Pre-defined common questions
- **Emoji Picker**: 16 popular emojis
- **Typing Indicator**: Animated dots
- **Auto-scroll**: Scrolls to latest message
- **Keyboard Support**: Enter to send, Escape to close

### ChatMessage.jsx
Message bubble component.
- **User Messages**: Blue, right-aligned
- **Assistant Messages**: Gray, left-aligned
- **Max Width**: 70% of container
- **Clean Design**: No avatars, minimalist

### MessageRenderer.jsx
Advanced markdown renderer for beautifully formatted chat messages.

**Features:**
- **Rich Text Support**: Bold, italic, emphasis
- **Lists**: Bullet points with custom blue bullets (•), numbered lists
- **Headings**: H1, H2, H3 with proper spacing
- **Code**: Inline code and code blocks with syntax highlighting
- **Links**: Clickable links that open in new tabs
- **Tables**: Responsive tables with headers
- **Blockquotes**: Styled with blue border
- **Line Breaks**: Proper paragraph spacing preserved from OpenAI

**Styling Highlights:**
- Custom blue bullet points (•) for unordered lists
- Bold text appears darker for emphasis
- Numbered lists with blue markers
- Responsive design for all screen sizes
- Smooth animations and transitions
- Proper preservation of markdown formatting from AI responses

**Recent Improvements:**
- Fixed line break preservation in response cleaning
- Enhanced list formatting with proper spacing
- Improved markdown rendering for OpenAI responses

## Integration with useChat Hook

The assistant uses the `useChat` hook from `src/hooks/useChat.js` for all state management and message handling.

```javascript
const {
  messages,
  isTyping,
  isModalOpen,
  hasNewMessage,
  previewMessage,
  sendMessage,
  openChat,
  closeChat
} = useChat();
```

## Configuration

All settings in `src/constants/chat.js`:
- Welcome message
- Quick actions
- Emoji list
- Mock responses (temporary)
- Timing configurations

## OpenAI Integration

**Status: ✅ Fully Integrated**

The assistant is connected to OpenAI's Assistant API:
- Uses thread-based conversations for context retention
- Responses are cleaned and formatted via `response-cleaner.js`
- Markdown formatting is preserved and enhanced for display
- Thread ID stored in localStorage for conversation persistence

### Session Management

**Chat History Storage:**
- Thread ID saved in `localStorage` as `chatThreadId`
- Messages retrieved from OpenAI on page reload
- History persists across sessions

**Clearing Chat History:**
- Automatically cleared on logout (removes `chatThreadId` from localStorage)
- Can be manually cleared via `clearChat()` method in useChat hook
- New thread created after clearing

## Usage

Import and render in any layout:
```jsx
import VirtualAssistant from '@/components/assistant';

<VirtualAssistant />
```