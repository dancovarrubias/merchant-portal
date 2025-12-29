'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export function SidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(null); // null = loading

  useEffect(() => {
    // Read from localStorage once on mount
    const saved = localStorage.getItem('sidebarCollapsed');
    setIsSidebarCollapsed(saved === 'true');
  }, []);

  useEffect(() => {
    // Save to localStorage when state changes (but not on initial load)
    if (isSidebarCollapsed !== null) {
      localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
    }
  }, [isSidebarCollapsed]);

  // Don't render until we know the collapsed state
  if (isSidebarCollapsed === null) {
    return null;
  }

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}