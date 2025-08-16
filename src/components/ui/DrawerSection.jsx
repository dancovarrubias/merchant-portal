import React from 'react';

/**
 * Componente reutilizable para secciones dentro de un Drawer
 * Provee un estilo consistente con fondo gris y bordes redondeados
 */
const DrawerSection = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-50 rounded-lg p-4 space-y-3 ${className}`}>
      {title && (
        <h4 className="text-sm font-semibold text-text-primary mb-3">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
};

export default DrawerSection;