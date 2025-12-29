import React from 'react';
// import VirtualAssistant from '@/components/assistant/VirtualAssistant';

const DashboardLayout = ({ children }) => {
  // Check if AI assistant is enabled
  const isAIEnabled = process.env.NEXT_PUBLIC_DISABLE_AI_ASSISTANT !== 'true';

  return (
    <div className="flex h-screen bg-white">
      {children}
      {/* AI Assistant (disabled - uncomment and configure OpenAI keys to enable) */}
      {/* {isAIEnabled && <VirtualAssistant />} */}
    </div>
  );
};

export default DashboardLayout;