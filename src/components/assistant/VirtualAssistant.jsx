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
    sendMessage,
    openChat,
    closeChat
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
      />
    </>
  );
};

export default VirtualAssistant;