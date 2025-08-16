import React from 'react';

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  onClear,
  className = '',
  showResults = false,
  resultsCount = 0,
  resultsText = '',
  ...props
}) => {
  return (
    <div className={className}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 pl-12 pr-12 text-sm font-inter text-text-primary bg-white border border-border-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all hover:border-border"
          {...props}
        />
        
        {/* Search Icon */}
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        
        {/* Clear Button */}
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-text-tertiary hover:text-text-secondary transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      
      {/* Results Counter */}
      {showResults && value && (
        <p className="mt-2 text-sm text-text-tertiary font-inter">
          {resultsText || (
            resultsCount === 0
              ? 'No se encontraron resultados'
              : `${resultsCount} ${resultsCount === 1 ? 'resultado' : 'resultados'} encontrado${resultsCount === 1 ? '' : 's'}`
          )}
        </p>
      )}
    </div>
  );
};

export default SearchInput;