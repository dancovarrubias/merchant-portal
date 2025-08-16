import React from 'react';

const Card = ({ 
  children, 
  className = '',
  variant = 'default',
  padding = 'md',
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-background-secondary',
    primary: 'bg-background-primary',
    outlined: 'bg-background-secondary border border-border-light',
  };
  
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };
  
  return (
    <div
      className={`rounded-xl sm:rounded-2xl ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;