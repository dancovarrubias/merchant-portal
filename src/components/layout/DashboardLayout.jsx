import React from 'react';
import VirtualAssistant from '@/components/assistant/VirtualAssistant';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      {children}
      <VirtualAssistant />
    </div>
  );
};

export default DashboardLayout;