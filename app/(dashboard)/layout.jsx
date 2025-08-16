'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <DashboardLayout 
      isSidebarOpen={isSidebarOpen} 
      setIsSidebarOpen={setIsSidebarOpen}
    >
      {children}
    </DashboardLayout>
  );
}