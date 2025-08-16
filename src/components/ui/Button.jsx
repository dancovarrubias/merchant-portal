import React from 'react';

const Button = ({ 
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'default',
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-dm-sans font-bold rounded-full transition-all duration-200 flex items-center justify-center touch-manipulation';
  
  const variantClasses = {
    primary: disabled 
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
      : 'bg-primary text-white hover:bg-blue-600 active:bg-blue-700 shadow-button',
    secondary: 'bg-background-primary text-text-primary hover:bg-gray-200 active:bg-gray-300',
    ghost: 'bg-transparent text-primary hover:bg-background-primary active:bg-gray-100',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-blue-700',
  };
  
  const sizeClasses = {
    small: 'px-4 sm:px-6 py-2 text-sm',
    default: 'px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;