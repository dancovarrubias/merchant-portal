import { useState, useCallback } from 'react';
import { MOCK_RESPONSES, CHAT_CONFIG } from '@/constants/chat';

/**
 * Custom hook to manage chat functionality
 * This will be the integration point for OpenAI API in the future
 */
const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [previewMessage, setPreviewMessage] = useState('');

  /**
   * Get appropriate response based on user input
   * TODO: Replace with OpenAI API call
   */
  const getAssistantResponse = useCallback((userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('buenos')) {
      return MOCK_RESPONSES.greeting[Math.floor(Math.random() * MOCK_RESPONSES.greeting.length)];
    } else if (lowerMessage.includes('código') || lowerMessage.includes('pago') || lowerMessage.includes('generar')) {
      return MOCK_RESPONSES.payment[Math.floor(Math.random() * MOCK_RESPONSES.payment.length)];
    } else if (lowerMessage.includes('transaccion') || lowerMessage.includes('orden') || lowerMessage.includes('historial')) {
      return MOCK_RESPONSES.transactions[Math.floor(Math.random() * MOCK_RESPONSES.transactions.length)];
    } else if (lowerMessage.includes('ayuda') || lowerMessage.includes('help') || lowerMessage.includes('necesito')) {
      return MOCK_RESPONSES.help[Math.floor(Math.random() * MOCK_RESPONSES.help.length)];
    } else {
      return MOCK_RESPONSES.default[Math.floor(Math.random() * MOCK_RESPONSES.default.length)];
    }
  }, []);

  /**
   * Send a message and get response
   */
  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate response delay
    // TODO: Replace with actual API call
    const delay = CHAT_CONFIG.TYPING_DELAY.MIN + 
                  Math.random() * (CHAT_CONFIG.TYPING_DELAY.MAX - CHAT_CONFIG.TYPING_DELAY.MIN);
    
    setTimeout(() => {
      const assistantResponse = {
        id: Date.now() + 1,
        text: getAssistantResponse(messageText),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);
      
      // Show preview if modal is closed
      if (!isModalOpen) {
        const preview = assistantResponse.text.substring(0, 100) + 
                       (assistantResponse.text.length > 100 ? '...' : '');
        setPreviewMessage(preview);
        setHasNewMessage(true);
      }
    }, delay);
  }, [isModalOpen, getAssistantResponse]);

  /**
   * Open chat modal
   */
  const openChat = useCallback(() => {
    setIsModalOpen(true);
    setHasNewMessage(false);
    setPreviewMessage('');
  }, []);

  /**
   * Close chat modal
   */
  const closeChat = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  /**
   * Clear chat history
   */
  const clearChat = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
    setHasNewMessage(false);
    setPreviewMessage('');
  }, []);

  return {
    // State
    messages,
    isTyping,
    isModalOpen,
    hasNewMessage,
    previewMessage,
    
    // Actions
    sendMessage,
    openChat,
    closeChat,
    clearChat,
    
    // Setters (for components that need direct control)
    setHasNewMessage,
    setPreviewMessage
  };
};

export default useChat;