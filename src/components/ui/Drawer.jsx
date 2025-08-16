import React from 'react';

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Drawer - ALWAYS rendered for transition to work */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[560px] bg-white shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          overflow-y-auto
        `}
      >
        {/* All content scrolleable together */}
        <div className="min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-16 pt-8 sm:pt-12 pb-6 sm:pb-8">
            <div>{title}</div>
            <button onClick={onClose} className="p-2 -mr-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="px-6 sm:px-16 pb-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;