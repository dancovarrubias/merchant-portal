import React, { useEffect } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  onBack,
  title, 
  children,
  size = 'default', // default, small, large
  variant = 'default', // default, chat
  showBackButton = false,
  showCloseButton = true
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-sm',
    default: '',
    large: 'max-w-7xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-0 sm:p-3">
        <div className={`relative bg-white sm:rounded-2xl shadow-xl w-full h-full min-h-screen sm:min-h-[calc(100vh-24px)] flex flex-col ${sizeClasses[size]} transform transition-all`}>
          {/* Header with buttons */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-6 z-10">
            {/* Back Button */}
            {showBackButton && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {/* Spacer when no back button */}
            {!showBackButton && <div className="w-10" />}
            
            {/* Title */}
            <h2 className="text-xl font-dm-sans font-bold text-text-primary text-center flex-1">
              {title}
            </h2>
            
            {/* Close Button */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {/* Spacer when no close button */}
            {!showCloseButton && <div className="w-10" />}
          </div>
          
          {/* Content */}
          {variant === 'chat' ? (
            // Chat variant: full height layout
            <div className="flex-1 flex flex-col pt-20 pb-6 px-4 sm:px-8 min-h-0">
              <div className="max-w-lg w-full mx-auto flex-1 flex flex-col min-h-0">
                {children}
              </div>
            </div>
          ) : (
            // Default variant: centered content
            <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-20 sm:py-24">
              <div className="max-w-lg w-full">
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;