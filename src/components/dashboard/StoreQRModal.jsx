import React from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

const StoreQRModal = ({ isOpen, onClose }) => {
  
  const handleDownload = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/qr.png';
    link.download = 'qr-tienda.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=" "
      size="default"
      showCloseButton={true}
      showBackButton={false}
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-dm-sans font-bold text-text-primary">
            Muestra el QR de tienda
          </h3>
          <p className="text-base font-inter text-text-secondary">
            Indica el monto total de la orden.
          </p>
        </div>

        {/* QR Code with ID */}
        <div className="flex flex-col items-center">
          {/* QR Code Image */}
          <img 
            src="/qr.png" 
            alt="QR de tienda" 
            className="w-64 h-64 object-contain"
          />
          
          {/* QR Code ID - Close to QR */}
          <p className="text-base font-inter text-text-tertiary mt-4">
            AX9238
          </p>
        </div>

        {/* Download Button - normal flow */}
        <div className="flex justify-center pt-8">
          <Button
            type="button"
            variant="ghost"
            onClick={handleDownload}
            className="flex items-center gap-2 text-primary"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
              />
            </svg>
            Descargar QR
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StoreQRModal;