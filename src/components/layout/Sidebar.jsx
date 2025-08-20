import React from 'react';
import NavLink from '@/components/navigation/NavLink';

const Sidebar = ({ isOpen, onClose }) => {
  const storeMenuItems = [
    {
      id: 'ordenes',
      label: 'Órdenes',
      icon: '/cobrar.svg',
      path: '/dashboard'
    },
    {
      id: 'usuarios',
      label: 'Usuarios',
      icon: '/usuarios.svg',
      path: '/users'
    }
  ];
  
  const supportMenuItems = [
    {
      id: 'preguntas',
      label: 'Preguntas',
      icon: '/preguntas-frecuentes.svg',
      path: '/faq'
    },
    {
      id: 'contacto',
      label: 'Contacto',
      icon: '/contacto.svg',
      path: '/contact'
    }
  ];

  const getLinkClasses = (isActive) => {
    return `flex items-center gap-3 px-4 py-4 rounded-2xl font-dm-sans font-bold text-base transition-all ${
      isActive 
        ? 'bg-[#EBEEF7] text-[#0075FF]' 
        : 'text-text-primary hover:bg-gray-50'
    }`;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen
        w-full sm:w-80 lg:w-64 bg-background-primary
        transform transition-transform duration-300 ease-in-out
        z-50 lg:z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="flex flex-col min-h-full p-6">
          {/* Logo section with close button */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <img 
                  src="/logo-kueski-pay.svg" 
                  alt="Kueski Pay" 
                  className="h-7"
                />
                <p className="text-text-primary font-dm-sans font-bold text-lg mt-4">
                  Timberland
                </p>
              </div>
              
              {/* Close button - visible only on mobile */}
              <button
                onClick={onClose}
                className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* User info */}
          <div className="mb-8 pb-6 border-b border-border-light">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                L
              </div>
              <p className="text-text-primary font-inter font-medium text-sm">
                Lourdes Gudiño León...
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 space-y-8">
            {/* Store section */}
            <div>
              <p className="text-text-tertiary text-xs font-inter font-medium mb-4 uppercase tracking-wider">
                Tienda física
              </p>
              
              <div className="space-y-2">
                {storeMenuItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) => getLinkClasses(isActive)}
                  >
                    {({ isActive }) => (
                      <>
                        {item.icon && (
                          <img 
                            src={item.icon} 
                            alt="" 
                            className="w-6 h-6"
                            style={
                              isActive 
                                ? { filter: 'brightness(0) saturate(100%) invert(31%) sepia(98%) saturate(2238%) hue-rotate(205deg) brightness(103%) contrast(107%)' }
                                : { filter: 'brightness(0) saturate(100%) invert(50%) sepia(8%) saturate(389%) hue-rotate(202deg) brightness(93%) contrast(87%)' }
                            }
                          />
                        )}
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
            
            {/* Support section */}
            <div>
              <p className="text-text-tertiary text-xs font-inter font-medium mb-4 uppercase tracking-wider">
                Soporte
              </p>
              
              <div className="space-y-2">
                {supportMenuItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) => getLinkClasses(isActive)}
                  >
                    {({ isActive }) => (
                      <>
                        {item.icon && (
                          <img 
                            src={item.icon} 
                            alt="" 
                            className="w-6 h-6"
                            style={
                              isActive 
                                ? { filter: 'brightness(0) saturate(100%) invert(31%) sepia(98%) saturate(2238%) hue-rotate(205deg) brightness(103%) contrast(107%)' }
                                : { filter: 'brightness(0) saturate(100%) invert(50%) sepia(8%) saturate(389%) hue-rotate(202deg) brightness(93%) contrast(87%)' }
                            }
                          />
                        )}
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
          
          {/* Footer section with better spacing */}
          <div className="mt-auto pt-6 pb-2 border-t border-border-light">
            <button
              onClick={() => {
                // Limpiar sesión
                document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
                // Limpiar el historial del chat
                localStorage.removeItem('chatThreadId');
                // Redirigir al login
                window.location.href = '/';
              }}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-inter font-medium text-sm text-text-primary hover:bg-gray-50 transition-all"
            >
              <img 
                src="/cerrar-sesion.svg" 
                alt="" 
                className="w-5 h-5"
              />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;