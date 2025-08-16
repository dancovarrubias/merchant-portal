import React, { useState } from 'react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  helperText,
  showPasswordToggle = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  const baseInputClasses = `
    w-full px-3 sm:px-3.5 py-2.5 sm:py-3 
    bg-white rounded-lg 
    border transition-all duration-200
    font-inter font-medium text-sm sm:text-body-sm
    placeholder:text-text-tertiary
    touch-manipulation
  `;
  
  const getBorderClasses = () => {
    if (error) return 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500';
    if (isFocused) return 'border-primary focus:border-primary focus:ring-1 focus:ring-primary';
    return 'border-border hover:border-gray-400';
  };
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block mb-1.5 sm:mb-2 font-inter font-medium text-sm sm:text-body-sm text-text-primary">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${baseInputClasses} ${getBorderClasses()} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} focus:outline-none`}
          {...props}
        />
        
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 sm:right-3.5 top-1/2 transform -translate-y-1/2 p-1 touch-manipulation"
            tabIndex={-1}
          >
            <img 
              src={showPassword ? '/eye-line.svg' : '/eye-off-line.svg'} 
              alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </button>
        )}
      </div>
      
      {helperText && !error && (
        <p className="mt-1 text-xs sm:text-label-sm text-text-tertiary">{helperText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-xs sm:text-label-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;