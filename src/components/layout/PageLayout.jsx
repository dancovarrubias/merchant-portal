'use client';
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Button from '@/components/ui/Button';
import { useSidebar } from '@/contexts/SidebarContext';

const PageLayout = ({
  children,
  title,
  subtitle,
  showActions = false,
  showQRButton = false,
  qrButtonText = "Ver QR de tienda",
  primaryActionText = "Crear orden",
  onQRClick,
  onPrimaryClick
}) => {
  const { isSidebarOpen, setIsSidebarOpen, isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar();
  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-border-light sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <h1 className="text-xl font-dm-sans font-bold text-text-primary">
                {title}
              </h1>
            </div>
            
            {showActions && (
              <div className="flex items-center gap-2">
                {showQRButton && (
                  <Button 
                    variant="ghost" 
                    size="small"
                    className="text-primary text-xs sm:text-sm"
                    onClick={onQRClick}
                  >
                    {qrButtonText}
                  </Button>
                )}
                
                <Button 
                  size="small" 
                  className="text-xs sm:text-sm"
                  onClick={onPrimaryClick}
                >
                  {primaryActionText}
                </Button>
              </div>
            )}
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-white px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-14">
          <div className="space-y-8">
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-dm-sans font-bold text-text-primary">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-base font-inter text-text-secondary mt-2">
                    {subtitle}
                  </p>
                )}
              </div>
              
              {showActions && (
                <div className="flex items-center gap-3">
                  {showQRButton && (
                    <Button 
                      variant="ghost" 
                      size="small"
                      className="text-primary"
                      onClick={onQRClick}
                    >
                      {qrButtonText}
                    </Button>
                  )}
                  
                  <Button 
                    size="small"
                    onClick={onPrimaryClick}
                  >
                    {primaryActionText}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Page Content */}
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default PageLayout;