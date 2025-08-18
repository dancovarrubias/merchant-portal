import React from 'react';
import ChatFloatingButton from './ChatFloatingButton';
import ChatModal from './ChatModal';
import useChat from '@/hooks/useChat';

/**
 * Virtual Assistant main component
 * Integrates the floating button and chat modal
 */
const VirtualAssistant = () => {
  const {
    messages,
    isTyping,
    isModalOpen,
    hasNewMessage,
    previewMessage,
    isInitializing,
    error,
    sendMessage,
    openChat,
    closeChat,
    retryInitialization
  } = useChat();

  return (
    <>
      <ChatFloatingButton
        onClick={openChat}
        hasNewMessage={hasNewMessage}
        previewMessage={previewMessage}
      />
      
      <ChatModal
        isOpen={isModalOpen}
        onClose={closeChat}
        messages={messages}
        onSendMessage={sendMessage}
        isTyping={isTyping}
        isInitializing={isInitializing}
        error={error}
        onRetry={retryInitialization}
      />
    </>
  );
};

export default VirtualAssistant;