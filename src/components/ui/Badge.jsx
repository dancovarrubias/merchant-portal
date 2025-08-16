import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'default',
  className = '' 
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-text-primary',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-yellow-50 text-yellow-700',
    error: 'bg-red-50 text-red-700',
    info: 'bg-blue-50 text-primary',
    pending: 'bg-yellow-50 text-yellow-700',
    cancelled: 'bg-red-50 text-red-700',
    expired: 'bg-gray-100 text-text-tertiary',
  };
  
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-1 text-xs',
    large: 'px-3 py-1.5 text-sm',
  };
  
  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-inter font-medium rounded-md
        min-w-[4.5rem] whitespace-nowrap
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;