import React from 'react';

const FormInput = ({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  optional = false,
  prefix,
  autoFocus = false,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-inter font-medium text-text-primary mb-2"
        >
          {label}
          {optional && (
            <span className="text-text-tertiary font-normal ml-1">(opcional)</span>
          )}
        </label>
      )}
      
      <div className={prefix ? 'relative' : ''}>
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
            {prefix}
          </span>
        )}
        
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          className={`
            w-full 
            ${prefix ? 'pl-9 pr-4' : 'px-4'} 
            py-3 
            border border-border-light 
            rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
            text-text-primary 
            placeholder-text-tertiary
            font-inter
          `}
          {...props}
        />
      </div>
    </div>
  );
};

export default FormInput;