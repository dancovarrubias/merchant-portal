import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for making elements resizable
 * @param {Object} options - Configuration options
 * @returns {Object} - Dimensions, resize state, and handlers
 */
const useResizable = ({
  initialWidth = 600,
  initialHeight = 500,
  minWidth = 400,
  minHeight = 300,
  maxWidthPercent = 90,
  maxHeightPercent = 90,
  persistKey = null,
  enabled = true,
  centered = true
} = {}) => {
  // Initialize dimensions from localStorage or defaults
  const [dimensions, setDimensions] = useState(() => {
    if (persistKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(persistKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Validate saved dimensions
          if (parsed.width && parsed.height) {
            return parsed;
          }
        } catch (e) {
          console.warn('Failed to parse saved dimensions:', e);
        }
      }
    }
    
    // Calculate centered position
    const calculateCenter = () => {
      if (typeof window === 'undefined') return { x: 0, y: 0 };
      return {
        x: (window.innerWidth - initialWidth) / 2,
        y: (window.innerHeight - initialHeight) / 2
      };
    };
    
    const center = centered ? calculateCenter() : { x: 100, y: 100 };
    
    return {
      width: initialWidth,
      height: initialHeight,
      x: center.x,
      y: center.y
    };
  });

  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState(null);
  
  const resizeStartRef = useRef(null);
  const dragStartRef = useRef(null);
  const frameRef = useRef(null);

  // Calculate max dimensions based on viewport
  const getMaxDimensions = useCallback(() => {
    if (typeof window === 'undefined') {
      return { maxWidth: 1200, maxHeight: 800 };
    }
    return {
      maxWidth: Math.floor(window.innerWidth * (maxWidthPercent / 100)),
      maxHeight: Math.floor(window.innerHeight * (maxHeightPercent / 100))
    };
  }, [maxWidthPercent, maxHeightPercent]);

  // Handle resize start
  const handleResizeStart = useCallback((e, handle) => {
    if (!enabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setActiveHandle(handle);
    
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    
    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: dimensions.width,
      startHeight: dimensions.height,
      startLeft: dimensions.x,
      startTop: dimensions.y,
      handle
    };
    
    document.body.style.cursor = getCursorForHandle(handle);
    document.body.style.userSelect = 'none';
  }, [dimensions, enabled]);

  // Handle drag start (for moving the modal)
  const handleDragStart = useCallback((e) => {
    if (!enabled || isResizing) return;
    
    // Only allow dragging from the header
    if (!e.target.closest('[data-modal-header]')) return;
    
    e.preventDefault();
    setIsDragging(true);
    
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: dimensions.x,
      startTop: dimensions.y
    };
    
    document.body.style.cursor = 'move';
    document.body.style.userSelect = 'none';
  }, [dimensions, enabled, isResizing]);

  // Handle mouse move for both resize and drag
  const handleMouseMove = useCallback((e) => {
    if (!isResizing && !isDragging) return;
    
    // Use requestAnimationFrame for smooth performance
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    frameRef.current = requestAnimationFrame(() => {
      if (isResizing && resizeStartRef.current) {
        const { maxWidth, maxHeight } = getMaxDimensions();
        const deltaX = e.clientX - resizeStartRef.current.startX;
        const deltaY = e.clientY - resizeStartRef.current.startY;
        const handle = resizeStartRef.current.handle;
        
        let newWidth = resizeStartRef.current.startWidth;
        let newHeight = resizeStartRef.current.startHeight;
        let newX = resizeStartRef.current.startLeft;
        let newY = resizeStartRef.current.startTop;
        
        // Calculate new dimensions based on handle
        if (handle.includes('e')) {
          newWidth = Math.min(Math.max(resizeStartRef.current.startWidth + deltaX, minWidth), maxWidth);
        }
        if (handle.includes('w')) {
          newWidth = Math.min(Math.max(resizeStartRef.current.startWidth - deltaX, minWidth), maxWidth);
          newX = resizeStartRef.current.startLeft + (resizeStartRef.current.startWidth - newWidth);
        }
        if (handle.includes('s')) {
          newHeight = Math.min(Math.max(resizeStartRef.current.startHeight + deltaY, minHeight), maxHeight);
        }
        if (handle.includes('n')) {
          newHeight = Math.min(Math.max(resizeStartRef.current.startHeight - deltaY, minHeight), maxHeight);
          newY = resizeStartRef.current.startTop + (resizeStartRef.current.startHeight - newHeight);
        }
        
        // Ensure modal stays within viewport bounds
        newX = Math.max(0, Math.min(newX, window.innerWidth - newWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - newHeight));
        
        setDimensions({
          width: newWidth,
          height: newHeight,
          x: newX,
          y: newY
        });
      } else if (isDragging && dragStartRef.current) {
        const deltaX = e.clientX - dragStartRef.current.startX;
        const deltaY = e.clientY - dragStartRef.current.startY;
        
        let newX = dragStartRef.current.startLeft + deltaX;
        let newY = dragStartRef.current.startTop + deltaY;
        
        // Keep modal within viewport
        newX = Math.max(0, Math.min(newX, window.innerWidth - dimensions.width));
        newY = Math.max(0, Math.min(newY, window.innerHeight - dimensions.height));
        
        setDimensions(prev => ({
          ...prev,
          x: newX,
          y: newY
        }));
      }
    });
  }, [isResizing, isDragging, dimensions.width, minWidth, minHeight, getMaxDimensions]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (isResizing || isDragging) {
      setIsResizing(false);
      setIsDragging(false);
      setActiveHandle(null);
      resizeStartRef.current = null;
      dragStartRef.current = null;
      
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Save to localStorage if persistKey is provided
      if (persistKey) {
        localStorage.setItem(persistKey, JSON.stringify(dimensions));
      }
    }
  }, [isResizing, isDragging, dimensions, persistKey]);

  // Add event listeners
  useEffect(() => {
    if (enabled) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    }
  }, [enabled, handleMouseMove, handleMouseUp]);

  // Handle window resize
  useEffect(() => {
    const handleWindowResize = () => {
      const { maxWidth, maxHeight } = getMaxDimensions();
      
      setDimensions(prev => ({
        ...prev,
        width: Math.min(prev.width, maxWidth),
        height: Math.min(prev.height, maxHeight),
        x: Math.min(prev.x, window.innerWidth - prev.width),
        y: Math.min(prev.y, window.innerHeight - prev.height)
      }));
    };

    if (enabled) {
      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    }
  }, [enabled, getMaxDimensions]);

  return {
    dimensions,
    isResizing,
    isDragging,
    activeHandle,
    handlers: {
      onResizeStart: handleResizeStart,
      onDragStart: handleDragStart
    }
  };
};

// Helper function to get cursor style for each handle
const getCursorForHandle = (handle) => {
  const cursors = {
    n: 'ns-resize',
    s: 'ns-resize',
    e: 'ew-resize',
    w: 'ew-resize',
    ne: 'nesw-resize',
    nw: 'nwse-resize',
    se: 'nwse-resize',
    sw: 'nesw-resize'
  };
  return cursors[handle] || 'default';
};

export default useResizable;