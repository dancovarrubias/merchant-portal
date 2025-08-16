import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  className = ''
}) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      <div className="text-sm text-text-secondary font-inter order-2 sm:order-1">
        {startItem}-{endItem} de {totalItems} resultados
      </div>
      
      <div className="flex items-center gap-2 order-1 sm:order-2">
        {/* Anterior button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`
            flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-inter transition-all
            ${currentPage === 1 
              ? 'text-text-tertiary cursor-not-allowed' 
              : 'text-text-primary hover:bg-gray-100'
            }
          `}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Anterior</span>
        </button>
        
        {/* Page numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="px-3 py-1 rounded-lg text-sm font-inter text-text-primary hover:bg-gray-100 transition-all"
              >
                1
              </button>
              {startPage > 2 && <span className="px-2 text-text-tertiary">...</span>}
            </>
          )}
          
          {pages.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                px-3 py-1 rounded-lg text-sm font-inter transition-all
                ${currentPage === page
                  ? 'bg-primary text-white'
                  : 'text-text-primary hover:bg-gray-100'
                }
              `}
            >
              {page}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2 text-text-tertiary">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-1 rounded-lg text-sm font-inter text-text-primary hover:bg-gray-100 transition-all"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
        
        {/* Mobile page indicator */}
        <div className="flex sm:hidden items-center gap-2 px-2">
          <span className="text-sm font-inter text-text-primary">
            {currentPage} / {totalPages}
          </span>
        </div>
        
        {/* Siguiente button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`
            flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-inter transition-all
            ${currentPage === totalPages 
              ? 'text-text-tertiary cursor-not-allowed' 
              : 'text-text-primary hover:bg-gray-100'
            }
          `}
        >
          <span className="hidden sm:inline">Siguiente</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;