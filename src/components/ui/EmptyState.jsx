import React from 'react';

const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-2xl p-12 text-center ${className}`}>
      {icon && (
        <div className="w-16 h-16 mx-auto mb-4 text-text-tertiary">
          {icon}
        </div>
      )}
      
      {title && (
        <h3 className="text-lg font-dm-sans font-medium text-text-primary mb-2">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-sm text-text-tertiary font-inter">
          {description}
        </p>
      )}
      
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;