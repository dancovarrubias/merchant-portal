import React from 'react';
import NextLink from 'next/link';

const Link = ({ 
  children,
  to,
  external = false,
  className = '',
  variant = 'primary',
  ...props 
}) => {
  const variantClasses = {
    primary: 'text-primary hover:text-blue-700 transition-colors duration-200',
    secondary: 'text-text-secondary hover:text-text-primary transition-colors duration-200',
    tertiary: 'text-text-tertiary hover:text-text-secondary transition-colors duration-200',
  };
  
  const baseClasses = 'font-inter font-medium cursor-pointer';
  
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  return (
    <NextLink
      href={to}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;