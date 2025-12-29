'use client';
import React from 'react';
import NavLink from '@/components/navigation/NavLink';

const Sidebar = ({ isOpen, onClose, isCollapsed, setIsCollapsed }) => {
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const menuItems = [
    {
      id: 'cobrar',
      label: 'Cobrar',
      icon: '/cobrar.svg',
      path: '/cobrar'
    },
    {
      id: 'historial',
      label: 'Historial',
      icon: '/file.svg',
      path: '/dashboard'
    },
    {
      id: 'ayuda',
      label: 'Ayuda',
      icon: '/preguntas-frecuentes.svg',
      path: '/faq'
    }
  ];

  const getLinkClasses = (isActive) => {
    const baseClasses = 'flex items-center w-full font-dm-sans font-bold text-base transition-all relative group';

    if (isCollapsed) {
      return `${baseClasses} justify-center lg:w-12 lg:h-12 lg:rounded-full lg:mx-auto ${
        isActive
          ? 'bg-[#EBEEF7] text-[#0075FF]'
          : 'text-text-primary hover:bg-gray-50'
      }`;
    }

    return `${baseClasses} justify-start gap-3 px-4 py-3 rounded-lg ${
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
        bg-background-primary
        transform transition-all duration-300 ease-in-out
        z-50 lg:z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-20' : 'w-full sm:w-80 lg:w-64'}
        overflow-y-auto
      `}>
        <div className={`flex flex-col min-h-full py-6 ${isCollapsed ? 'lg:px-0 px-6' : 'px-6'}`}>
          {/* Logo section */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div className={`${isCollapsed ? 'lg:hidden' : ''}`}>
                <img
                  src="/logo-kueski-pay.svg"
                  alt="Kueski Pay"
                  className="h-7"
                />
                <p className="text-text-primary font-dm-sans font-bold text-lg mt-4">
                  Timberland
                </p>
              </div>

              {/* Collapsed logo for desktop */}
              {isCollapsed && (
                <div className="hidden lg:flex w-full justify-center">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">K</span>
                  </div>
                </div>
              )}

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
            <div className={`flex items-center ${isCollapsed ? 'lg:justify-center lg:px-0' : 'gap-3'}`}>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                L
              </div>
              <p className={`text-text-primary font-inter font-medium text-sm ${isCollapsed ? 'lg:hidden' : ''}`}>
                Lourdes Gudiño León...
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1">
            <div className="space-y-2">
              {menuItems.map((item) => (
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
                          className="w-6 h-6 flex-shrink-0"
                          style={
                            isActive
                              ? { filter: 'brightness(0) saturate(100%) invert(31%) sepia(98%) saturate(2238%) hue-rotate(205deg) brightness(103%) contrast(107%)' }
                              : { filter: 'brightness(0) saturate(100%) invert(50%) sepia(8%) saturate(389%) hue-rotate(202deg) brightness(93%) contrast(87%)' }
                          }
                        />
                      )}
                      <span className={isCollapsed ? 'lg:hidden' : ''}>{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer section with better spacing */}
          <div className="mt-auto pt-6 pb-2 border-t border-border-light space-y-2">
            {/* Toggle button for desktop - hamburger menu */}
            <button
              onClick={toggleCollapse}
              className={`hidden lg:flex items-center w-full font-inter font-medium text-sm text-text-primary hover:bg-gray-50 transition-all ${
                isCollapsed
                  ? 'justify-center lg:w-12 lg:h-12 lg:rounded-full lg:mx-auto'
                  : 'justify-start gap-3 px-4 py-3 rounded-lg'
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className={isCollapsed ? 'lg:hidden' : ''}>Ocultar</span>
            </button>

            {/* Logout button */}
            <button
              onClick={() => {
                // Limpiar sesión
                document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
                // Limpiar el historial del chat
                localStorage.removeItem('chatThreadId');
                // Redirigir al login
                window.location.href = '/';
              }}
              className={`flex items-center w-full font-inter font-medium text-sm text-text-primary hover:bg-gray-50 transition-all ${
                isCollapsed
                  ? 'lg:justify-center lg:w-12 lg:h-12 lg:rounded-full lg:mx-auto'
                  : 'justify-start gap-3 px-4 py-3 rounded-lg'
              }`}
            >
              <img
                src="/cerrar-sesion.svg"
                alt=""
                className="w-5 h-5 flex-shrink-0"
              />
              <span className={isCollapsed ? 'lg:hidden' : ''}>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;