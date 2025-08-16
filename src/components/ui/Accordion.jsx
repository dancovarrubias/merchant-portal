import React, { useState, useEffect, useRef } from 'react';

const AccordionItem = ({ title, children, isOpen, onToggle, isFirst, isAnimating }) => {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');
  
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, children]);
  return (
    <div className={`${isFirst ? 'border-t' : ''} border-b border-border-light ${isOpen ? 'bg-gray-50' : 'bg-white'} transition-all duration-500 ease-in-out`}>
      <button
        onClick={onToggle}
        disabled={isAnimating}
        className={`w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-500 ease-in-out ${
          isOpen ? 'bg-gray-50' : 'hover:bg-gray-50'
        } ${isAnimating ? 'cursor-wait' : 'cursor-pointer'}`}
      >
        <h3 className="text-base font-dm-sans font-medium text-text-primary pr-4">
          {title}
        </h3>
        <svg
          className={`w-5 h-5 text-text-secondary transition-transform duration-500 ease-in-out flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="px-6 pb-6 pt-0">
          <div className="text-sm font-inter text-text-secondary leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);

  const handleToggle = (index) => {
    if (isAnimating) return;
    
    setOpenItems(prev => {
      const newSet = new Set(prev);
      const wasOpen = newSet.has(index);
      
      if (wasOpen) {
        // Si está abierto, simplemente lo cerramos
        newSet.delete(index);
      } else {
        // Si está cerrado y no permitimos múltiples
        if (!allowMultiple && newSet.size > 0) {
          // Primero cerramos el actual
          setIsAnimating(true);
          newSet.clear();
          
          // Luego abrimos el nuevo después de un pequeño delay
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
          }
          
          animationTimeoutRef.current = setTimeout(() => {
            setOpenItems(new Set([index]));
            setIsAnimating(false);
          }, 200); // Delay para coordinar animaciones
          
          return newSet;
        } else {
          newSet.add(index);
        }
      }
      
      return newSet;
    });
  };
  
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openItems.has(index)}
          onToggle={() => handleToggle(index)}
          isFirst={index === 0}
          isAnimating={isAnimating}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;