'use client';
import React, { useState, useRef, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import ChatMessage from '@/components/assistant/ChatMessage';
import { CHAT_CONFIG, EMOJI_LIST, QUICK_ACTIONS } from '@/constants/chat';

const ChatModal = ({ isOpen, onClose, messages, onSendMessage, isTyping, isInitializing, error, onRetry }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleQuickAction = (action) => {
    onSendMessage(action.text);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={CHAT_CONFIG.MODAL_TITLE}
      variant="chat"
      showCloseButton={true}
      resizable={!isMobile}
      resizableOptions={{
        initialWidth: 700,
        initialHeight: 600,
        minWidth: 400,
        minHeight: 400,
        maxWidthPercent: 90,
        maxHeightPercent: 90,
        persistKey: 'chatModalDimensions',
        centered: true
      }}
    >
      {/* Main container - must expand to fill parent */}
      <div className="flex flex-col flex-1 min-h-0 relative">
        {/* Loading or Error State */}
        {isInitializing && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Inicializando chat...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mx-4 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Reintentar
              </button>
            )}
          </div>
        )}
        
        {/* Messages Area - takes all available space with padding for fixed input */}
        <div className="flex-1 overflow-y-auto min-h-0 pb-36 pt-4">
          <div className="max-w-3xl mx-auto px-6">
            {!isInitializing && messages.length === 0 ? (
              <div className="flex flex-col items-center w-full text-center pt-20">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {CHAT_CONFIG.WELCOME_MESSAGE}
                </h2>
              </div>
            ) : (
              <div className="w-full py-3">
                <div className="space-y-4">
                {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.text}
                  isUser={msg.isUser}
                />
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%]">
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Input Area at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-4 rounded-b-none sm:rounded-b-2xl">
          <div className="max-w-3xl mx-auto px-6">
            {/* Quick Actions */}
            {messages.length === 0 && (
              <div className="pb-3">
                <div className="flex flex-wrap gap-1.5">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action)}
                    className={action.className}
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="relative">
            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                <div className="grid grid-cols-8 gap-1">
                  {EMOJI_LIST.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className="flex-1 relative flex items-center">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={CHAT_CONFIG.INPUT_PLACEHOLDER}
                  className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                  rows="1"
                  style={{ minHeight: '42px', maxHeight: '120px' }}
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim() || isInitializing || isTyping}
                className={`p-2.5 rounded-full transition-all flex-shrink-0 ${
                  inputMessage.trim() 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;