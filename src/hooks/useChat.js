import { useState, useCallback, useEffect, useRef } from 'react';
import chatService from '@/services/chat.service';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [previewMessage, setPreviewMessage] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState(null);
  
  const initializingRef = useRef(false);
  const threadIdRef = useRef(null);

  useEffect(() => {
    const initializeThread = async () => {
      if (initializingRef.current) return;
      
      try {
        initializingRef.current = true;
        setIsInitializing(true);
        setError(null);
        
        let storedThreadId = chatService.getStoredThreadId();
        
        if (storedThreadId) {
          try {
            const { messages: existingMessages } = await chatService.getMessages(storedThreadId);
            if (existingMessages && existingMessages.length > 0) {
              const formattedMessages = existingMessages.map(msg => ({
                id: msg.id,
                text: msg.content,
                isUser: msg.role === 'user',
                timestamp: new Date(msg.createdAt * 1000)
              }));
              setMessages(formattedMessages);
              setThreadId(storedThreadId);
              threadIdRef.current = storedThreadId;
            } else {
              chatService.clearStoredThreadId();
              storedThreadId = null;
            }
          } catch (error) {
            console.warn('Failed to restore thread, creating new one:', error);
            chatService.clearStoredThreadId();
            storedThreadId = null;
          }
        }
        
        if (!storedThreadId) {
          const { threadId: newThreadId } = await chatService.createThread();
          setThreadId(newThreadId);
          threadIdRef.current = newThreadId;
          chatService.storeThreadId(newThreadId);
        }
      } catch (error) {
        console.error('Failed to initialize chat thread:', error);
        setError('No se pudo inicializar el chat. Por favor, recarga la página.');
      } finally {
        setIsInitializing(false);
        initializingRef.current = false;
      }
    };

    initializeThread();
  }, []);

  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim() || !threadIdRef.current || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);
    
    try {
      const response = await chatService.sendMessage(threadIdRef.current, messageText);
      
      if (response.success) {
        const assistantMessage = {
          id: response.messageId || `assistant-${Date.now()}`,
          text: response.message,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        if (!isModalOpen) {
          const preview = response.message.substring(0, 100) + 
                        (response.message.length > 100 ? '...' : '');
          setPreviewMessage(preview);
          setHasNewMessage(true);
        }
      } else {
        throw new Error(response.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('No se pudo enviar el mensaje. Por favor, intenta de nuevo.');
      
      const errorMessage = {
        id: `error-${Date.now()}`,
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        isUser: false,
        isError: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [isModalOpen, isTyping]);

  const openChat = useCallback(() => {
    setIsModalOpen(true);
    setHasNewMessage(false);
    setPreviewMessage('');
  }, []);

  const closeChat = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const clearChat = useCallback(async () => {
    try {
      setMessages([]);
      setIsTyping(false);
      setHasNewMessage(false);
      setPreviewMessage('');
      setError(null);
      
      if (threadIdRef.current) {
        await chatService.deleteThread(threadIdRef.current);
        chatService.clearStoredThreadId();
      }
      
      const { threadId: newThreadId } = await chatService.createThread();
      setThreadId(newThreadId);
      threadIdRef.current = newThreadId;
      chatService.storeThreadId(newThreadId);
    } catch (error) {
      console.error('Error clearing chat:', error);
      setError('No se pudo limpiar el chat. Por favor, recarga la página.');
    }
  }, []);

  const retryInitialization = useCallback(async () => {
    if (initializingRef.current) return;
    
    try {
      initializingRef.current = true;
      setIsInitializing(true);
      setError(null);
      
      const { threadId: newThreadId } = await chatService.createThread();
      setThreadId(newThreadId);
      threadIdRef.current = newThreadId;
      chatService.storeThreadId(newThreadId);
    } catch (error) {
      console.error('Failed to retry initialization:', error);
      setError('No se pudo inicializar el chat. Por favor, recarga la página.');
    } finally {
      setIsInitializing(false);
      initializingRef.current = false;
    }
  }, []);

  return {
    messages,
    isTyping,
    isModalOpen,
    hasNewMessage,
    previewMessage,
    isInitializing,
    error,
    threadId,
    
    sendMessage,
    openChat,
    closeChat,
    clearChat,
    retryInitialization,
    
    setHasNewMessage,
    setPreviewMessage
  };
};

export default useChat;