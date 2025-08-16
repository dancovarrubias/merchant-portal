import React from 'react';
import Drawer from '@/components/ui/Drawer';
import Badge from '@/components/ui/Badge';
import DrawerSection from '@/components/ui/DrawerSection';
import Button from '@/components/ui/Button';

const OrderDetailsDrawer = ({ isOpen, onClose, order }) => {

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Aprobado':
        return 'success';
      case 'Pendiente':
        return 'warning';
      case 'Rechazado':
        return 'error';
      case 'Cancelado':
        return 'neutral';
      case 'Expirado':
        return 'info';
      default:
        return 'neutral';
    }
  };

  const handleStartCancellation = () => {
    // Implementación pendiente de lógica de cancelación
    // Esta función será conectada con el backend cuando esté disponible
    if (onClose) {
      onClose();
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        order ? (
          <div className="flex items-center gap-3">
            <span className="text-lg font-dm-sans font-bold text-text-primary">
              Orden {order.id}
            </span>
            <Badge variant={getStatusVariant(order.status)}>
              {order.status}
            </Badge>
          </div>
        ) : null
      }
    >
      {order ? (
        <div className="space-y-6">
          {/* Cliente Section */}
          <DrawerSection title="Cliente">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-inter font-medium text-text-secondary">Nombre:</span>
                <span className="text-sm font-inter text-text-primary text-right">
                  Jazmín Grissel Solis López
                </span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm font-inter font-medium text-text-secondary">Correo:</span>
                <span className="text-sm font-inter text-text-primary text-right">
                  jazmin.solis@kueski.com
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-inter font-medium text-text-secondary">Teléfono:</span>
                <span className="text-sm font-inter text-text-primary flex items-center gap-1">
                  <span className="text-text-tertiary">•• •••• ••</span>
                  <span>56</span>
                </span>
              </div>
            </div>
          </DrawerSection>

          {/* Datos de la orden Section */}
          <DrawerSection title="Datos de la orden">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-inter font-medium text-text-secondary">Fecha y hora:</span>
                <span className="text-sm font-inter text-text-primary text-right">
                  {order.date || '18 jun 2025, 10:17 h'}
                </span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm font-inter font-medium text-text-secondary">Folio:</span>
                <span className="text-sm font-inter text-text-primary text-right">
                  1403-5215-8997-9308-138
                </span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm font-inter font-medium text-text-secondary">Referencia:</span>
                <span className="text-sm font-inter text-text-primary text-right">
                  18-JUN-2025 10:17
                </span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm font-inter font-medium text-text-secondary">Cantidad de productos:</span>
                <span className="text-sm font-inter text-text-primary text-right">
                  1
                </span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm font-inter font-medium text-text-secondary">Monto total:</span>
                <span className="text-sm font-inter font-semibold text-text-primary text-right">
                  {order.amount || '$474'}
                </span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm font-inter font-medium text-text-secondary">Método de cobro:</span>
                <span className="text-sm font-inter text-text-primary text-right">
                  {order.paymentMethod || 'Código de pago'}
                </span>
              </div>
            </div>
          </DrawerSection>
          
          {/* Acciones */}
          {order.status === 'Aprobado' && (
            <div className="mt-8 flex justify-end">
              <Button
                variant="ghost"
                size="small"
                onClick={handleStartCancellation}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Iniciar cancelación
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </Drawer>
  );
};

export default OrderDetailsDrawer;