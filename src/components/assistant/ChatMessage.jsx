import React from 'react';
import MessageRenderer from './MessageRenderer';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%]`}>
        <div 
          className={`px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          <MessageRenderer content={message} isUser={isUser} />
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;