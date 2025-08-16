import React, { useState, useRef, useEffect } from 'react';

const PinInput = ({ 
  length = 6, 
  onChange, 
  value = '',
  size = 'default', // 'small', 'default', 'large'
  className = ''
}) => {
  const [pins, setPins] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (value) {
      const valueArray = value.split('').slice(0, length);
      const newPins = [...Array(length).fill('')];
      valueArray.forEach((v, i) => {
        newPins[i] = v;
      });
      setPins(newPins);
    }
  }, [value, length]);

  const handleChange = (index, newValue) => {
    // Only allow numbers
    if (newValue && !/^\d$/.test(newValue)) return;

    const newPins = [...pins];
    newPins[index] = newValue;
    setPins(newPins);

    // Call onChange with the complete pin
    if (onChange) {
      onChange(newPins.join(''));
    }

    // Auto-focus next input
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pins[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    const numbers = pastedData.replace(/\D/g, '');
    
    if (numbers) {
      const newPins = [...pins];
      numbers.split('').forEach((num, i) => {
        if (i < length) {
          newPins[i] = num;
        }
      });
      setPins(newPins);
      
      if (onChange) {
        onChange(newPins.join(''));
      }
      
      // Focus the next empty input or the last one
      const nextEmptyIndex = newPins.findIndex(pin => !pin);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[length - 1]?.focus();
      }
    }
  };

  // Size configurations with better mobile support
  const sizeConfig = {
    small: {
      container: 'max-w-[280px] xs:max-w-xs',
      input: 'w-9 h-10 xs:w-10 xs:h-10 sm:w-11 sm:h-11 text-base sm:text-lg',
      gap: 'gap-0.5 xs:gap-1 sm:gap-1.5'
    },
    default: {
      container: 'max-w-[320px] xs:max-w-sm',
      input: 'w-10 h-11 xs:w-11 xs:h-12 sm:w-12 sm:h-14 text-base xs:text-lg sm:text-xl',
      gap: 'gap-1 xs:gap-1.5 sm:gap-2 md:gap-2.5'
    },
    large: {
      container: 'max-w-[360px] xs:max-w-md',
      input: 'w-11 h-12 xs:w-12 xs:h-14 sm:w-14 sm:h-16 text-lg xs:text-xl sm:text-2xl',
      gap: 'gap-1.5 xs:gap-2 sm:gap-3 md:gap-4'
    }
  };

  const config = sizeConfig[size] || sizeConfig.default;

  return (
    <div className={`flex justify-center w-full px-2 ${config.container} mx-auto ${className}`}>
      <div className={`flex ${config.gap} w-full justify-center`}>
        {pins.map((pin, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={pin}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={`
              ${config.input}
              flex-shrink-0
              text-center 
              font-inter font-semibold
              border-2 border-border-light 
              rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
              transition-all duration-200
              hover:border-border
              bg-white
              touch-manipulation
              appearance-none
            `}
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'textfield'
            }}
            aria-label={`PIN digit ${index + 1}`}
            autoComplete="off"
          />
        ))}
      </div>
    </div>
  );
};

export default PinInput;