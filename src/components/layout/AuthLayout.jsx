import React from 'react';

const AuthLayout = ({ children, illustration }) => {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white overflow-hidden">
      {/* Left side - Illustration section */}
      <div className="hidden lg:flex flex-1 bg-background-primary">
        <div className="flex flex-col p-8 lg:p-16 xl:p-24 w-full max-w-2xl mx-auto h-full">
          {/* Logo and text - Top section */}
          <div className="flex-shrink-0">
            <img 
              src="/logo-kueski-pay.svg" 
              alt="Kueski Pay" 
              className="h-6 sm:h-8 mb-4"
            />
            <p className="text-text-primary text-sm sm:text-body-md font-inter font-medium leading-relaxed">
              Intégrate a Kueski Pay para aumentar tus ventas hasta en un 40% y que más clientes conozcan tu marca.
            </p>
          </div>
          
          {/* Illustration - Centered in remaining space */}
          <div className="flex-1 flex items-center justify-center">
            {illustration && (
              <img 
                src={illustration} 
                alt="Ilustración" 
                className="w-full max-w-md h-auto object-contain"
                style={{ maxHeight: '400px' }}
              />
            )}
          </div>
          
          {/* Spacer - Fixed at bottom */}
          <div className="flex-shrink-0 h-8"></div>
        </div>
      </div>
      
      {/* Right side - Form section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12 overflow-y-auto">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg my-auto">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <img 
              src="/logo-kueski-pay.svg" 
              alt="Kueski Pay" 
              className="h-8 mx-auto mb-4"
            />
            <p className="text-text-secondary text-sm px-4">
              Intégrate a Kueski Pay para aumentar tus ventas
            </p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;