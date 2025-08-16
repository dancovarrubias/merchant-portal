import React, { useState } from 'react';

/**
 * Componente Table genérico y reutilizable
 * Maneja automáticamente la visualización responsive (tabla en desktop, cards en mobile)
 * 
 * @param {Array} columns - Configuración de columnas
 * @param {Array} data - Datos a mostrar
 * @param {Function} onRowClick - Callback al hacer click en una fila
 * @param {Function} renderMobileCard - Función personalizada para renderizar cards en mobile
 * @param {String} className - Clases CSS adicionales
 */
const Table = ({ 
  columns, 
  data, 
  onRowClick,
  renderMobileCard,
  className = ''
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  // Función genérica de ordenamiento
  const handleSort = (column) => {
    if (!column.sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === column.key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key: column.key, direction });
    
    // Si la columna tiene su propia función de ordenamiento, usarla
    if (column.onSort) {
      column.onSort(direction);
    }
  };
  
  // Vista de card móvil por defecto (puede ser sobrescrita con renderMobileCard)
  const DefaultMobileCard = ({ row }) => {
    // Encontrar las columnas más importantes para mostrar en móvil
    const primaryColumns = columns.filter(col => col.mobileDisplay !== false).slice(0, 4);
    
    return (
      <div 
        onClick={() => onRowClick && onRowClick(row)}
        className="bg-white p-4 border-b border-border-light hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="space-y-2">
          {primaryColumns.map((column, index) => {
            const value = row[column.key];
            const renderedValue = column.render ? column.render(value, row) : value;
            
            // Primera columna como título principal
            if (index === 0) {
              return (
                <div key={column.key} className="font-medium text-text-primary">
                  {renderedValue}
                </div>
              );
            }
            
            // Otras columnas como información secundaria
            return (
              <div key={column.key} className="flex justify-between items-center">
                <span className="text-xs text-text-secondary">{column.label}:</span>
                <span className="text-sm text-text-primary">
                  {renderedValue}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const MobileCard = renderMobileCard || DefaultMobileCard;
  
  // Icono de ordenamiento
  const SortIcon = ({ column }) => {
    if (!column.sortable) return null;
    
    const isActive = sortConfig.key === column.key;
    const direction = isActive ? sortConfig.direction : null;
    
    return (
      <svg 
        className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-text-tertiary'}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={direction === 'desc' 
            ? "M19 9l-7 7-7-7" 
            : "M5 15l7-7 7 7"
          }
        />
      </svg>
    );
  };
  
  return (
    <>
      {/* Desktop Table - Hidden on mobile */}
      <div className={`hidden md:block overflow-x-auto ${className}`}>
        <table className="w-full min-w-full table-fixed">
          <thead className="bg-gray-50">
            <tr className="border-b border-border-light">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-4 py-3 text-left font-inter font-medium text-xs 
                    text-text-primary tracking-wider
                    ${column.width ? '' : 'w-auto'}
                    ${column.className || ''}
                    ${column.align === 'center' ? 'text-center' : ''}
                    ${column.align === 'right' ? 'text-right' : ''}
                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}
                  `}
                  style={column.width ? { width: column.width } : {}}
                  onClick={() => handleSort(column)}
                >
                  <div className={`flex items-center gap-2 ${
                    column.align === 'center' ? 'justify-center' : 
                    column.align === 'right' ? 'justify-end' : ''
                  }`}>
                    {column.label}
                    <SortIcon column={column} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light bg-white">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`
                    ${onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
                    transition-colors
                  `}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`
                        px-4 py-4 text-sm font-inter
                        ${column.cellClassName || ''}
                        ${column.align === 'center' ? 'text-center' : ''}
                        ${column.align === 'right' ? 'text-right' : ''}
                      `}
                      style={column.width ? { width: column.width } : {}}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-4 py-8 text-center text-text-secondary"
                >
                  No hay datos para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Cards - Visible only on mobile */}
      <div className="md:hidden">
        {data.length > 0 ? (
          data.map((row, index) => (
            <MobileCard key={row.id || index} row={row} />
          ))
        ) : (
          <div className="p-8 text-center text-text-secondary">
            No hay datos para mostrar
          </div>
        )}
      </div>
    </>
  );
};

export default Table;