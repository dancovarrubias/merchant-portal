import React from 'react';
import useResizable from '@/hooks/useResizable';

/**
 * ResizableWrapper Component
 * Wraps children with resize handles for making them resizable
 */
const ResizableWrapper = ({
  children,
  enabled = true,
  className = '',
  onResize,
  showHandles = true,
  handleClassName = '',
  ...resizableOptions
}) => {
  const {
    dimensions,
    isResizing,
    isDragging,
    activeHandle,
    handlers
  } = useResizable({
    enabled,
    ...resizableOptions
  });

  // Notify parent of resize if callback provided
  React.useEffect(() => {
    if (onResize) {
      onResize(dimensions);
    }
  }, [dimensions, onResize]);

  // Define resize handles
  const handles = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

  // Get position classes for each handle
  const getHandleClasses = (handle) => {
    const baseClasses = 'absolute z-50 group';
    const hoverClasses = 'hover:bg-blue-500 hover:opacity-20';
    
    const positions = {
      n: 'top-0 left-8 right-8 h-1 cursor-ns-resize rounded-t-2xl',
      s: 'bottom-0 left-8 right-8 h-1 cursor-ns-resize rounded-b-2xl',
      e: 'right-0 top-8 bottom-8 w-1 cursor-ew-resize rounded-r-2xl',
      w: 'left-0 top-8 bottom-8 w-1 cursor-ew-resize rounded-l-2xl',
      ne: 'top-0 right-0 w-4 h-4 cursor-nesw-resize rounded-tr-2xl',
      nw: 'top-0 left-0 w-4 h-4 cursor-nwse-resize rounded-tl-2xl',
      se: 'bottom-0 right-0 w-4 h-4 cursor-nwse-resize rounded-br-2xl',
      sw: 'bottom-0 left-0 w-4 h-4 cursor-nesw-resize rounded-bl-2xl'
    };

    return `${baseClasses} ${positions[handle]} ${hoverClasses} ${handleClassName}`;
  };

  // Get visual indicator classes for corners
  const getCornerIndicator = (handle) => {
    if (!['ne', 'nw', 'se', 'sw'].includes(handle)) return null;
    
    const positions = {
      ne: 'top-0.5 right-0.5',
      nw: 'top-0.5 left-0.5',
      se: 'bottom-0.5 right-0.5',
      sw: 'bottom-0.5 left-0.5'
    };

    return (
      <div 
        className={`absolute ${positions[handle]} w-2 h-2 bg-gray-400 rounded-full opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none`}
      />
    );
  };

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div
      className={`absolute rounded-2xl ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        transform: `translate(${dimensions.x}px, ${dimensions.y}px)`,
        transition: isResizing || isDragging ? 'none' : 'box-shadow 0.2s',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.12), 0 0 60px rgba(0, 0, 0, 0.08)',
        zIndex: isResizing || isDragging ? 9999 : 'auto'
      }}
    >
      {/* Resize handles */}
      {showHandles && handles.map(handle => (
        <div
          key={handle}
          className={getHandleClasses(handle)}
          onMouseDown={(e) => handlers.onResizeStart(e, handle)}
          data-resize-handle={handle}
        >
          {getCornerIndicator(handle)}
        </div>
      ))}

      {/* Content with drag handle in header */}
      <div 
        className="w-full h-full"
        onMouseDown={handlers.onDragStart}
      >
        {children}
      </div>

      {/* Visual feedback during resize */}
      {isResizing && (
        <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none rounded-2xl opacity-50" />
      )}
    </div>
  );
};

export default ResizableWrapper;