import React, { useState, useEffect, useRef } from 'react';

const ChatFloatingButton = ({ onClick, hasNewMessage, previewMessage }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ bottom: 24, right: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    if (previewMessage && hasNewMessage) {
      setShowPreview(true);
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        setShowPreview(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [previewMessage, hasNewMessage]);

  const handleClick = () => {
    if (!hasMoved) {
      setShowPreview(false);
      onClick();
    }
  };

  const handleClosePreview = (e) => {
    e.stopPropagation();
    setShowPreview(false);
  };

  const handleMouseEnter = () => {
    if (!showPreview && !isDragging) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Drag functionality
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      initialBottom: position.bottom,
      initialRight: position.right
    });
    setIsDragging(true);
    setHasMoved(false);
    setShowTooltip(false);
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX,
      y: touch.clientY,
      initialBottom: position.bottom,
      initialRight: position.right
    });
    setIsDragging(true);
    setHasMoved(false);
    setShowTooltip(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const deltaX = dragStart.x - e.clientX;
      const deltaY = e.clientY - dragStart.y;
      
      // Only consider it a drag if moved more than 5 pixels
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setHasMoved(true);
        
        const newRight = Math.max(10, Math.min(window.innerWidth - 80, dragStart.initialRight + deltaX));
        const newBottom = Math.max(10, Math.min(window.innerHeight - 80, dragStart.initialBottom - deltaY));
        
        setPosition({
          right: newRight,
          bottom: newBottom
        });
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const deltaX = dragStart.x - touch.clientX;
      const deltaY = touch.clientY - dragStart.y;
      
      // Only consider it a drag if moved more than 5 pixels
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setHasMoved(true);
        
        const newRight = Math.max(10, Math.min(window.innerWidth - 80, dragStart.initialRight + deltaX));
        const newBottom = Math.max(10, Math.min(window.innerHeight - 80, dragStart.initialBottom - deltaY));
        
        setPosition({
          right: newRight,
          bottom: newBottom
        });
      }
    };

    const handleMouseUp = () => {
      setTimeout(() => {
        setIsDragging(false);
        setTimeout(() => {
          setHasMoved(false);
        }, 50);
      }, 10);
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        setIsDragging(false);
        setTimeout(() => {
          setHasMoved(false);
        }, 50);
      }, 10);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div 
      className="fixed z-40 flex items-end gap-3"
      style={{ 
        bottom: `${position.bottom}px`, 
        right: `${position.right}px`,
        transition: isDragging ? 'none' : 'all 0.3s ease'
      }}>
      {/* Message Preview Bubble */}
      {showPreview && previewMessage && (
        <div 
          className={`bg-white shadow-lg rounded-2xl p-4 max-w-xs border border-gray-100 cursor-pointer transform transition-all duration-300 ${
            isAnimating ? 'animate-slideIn' : ''
          }`}
          onClick={handleClick}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <img 
                src="/kike.jpg" 
                alt="Kike" 
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900 mb-1">Kike</p>
                <p className="text-sm text-gray-700 line-clamp-2">{previewMessage}</p>
              </div>
            </div>
            <button
              onClick={handleClosePreview}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button with Kike's Image */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative bg-blue-600 hover:bg-blue-700 rounded-full p-1 shadow-lg hover:shadow-xl transform transition-all duration-200 group overflow-hidden ${
          isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab hover:scale-105'
        }`}
        style={{ userSelect: 'none', touchAction: 'none' }}
      >
        {/* Notification Dot */}
        {hasNewMessage && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse z-10"></span>
        )}

        {/* Kike's Image as Button Content */}
        <img 
          src="/kike.jpg" 
          alt="Chat con Kike" 
          className="w-14 h-14 rounded-full object-cover"
        />

        {/* Blue overlay on hover */}
        <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-full"></div>

        {/* Tooltip */}
        {showTooltip && !showPreview && (
          <div className="absolute bottom-full right-0 mb-2 animate-fadeIn pointer-events-none">
            <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Chat con Kike
            </div>
          </div>
        )}
      </button>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ChatFloatingButton;