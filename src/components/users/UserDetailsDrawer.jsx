import React from 'react';
import Drawer from '@/components/ui/Drawer';
import Badge from '@/components/ui/Badge';
import DrawerSection from '@/components/ui/DrawerSection';
import Button from '@/components/ui/Button';

const UserDetailsDrawer = ({ isOpen, onClose, user }) => {
  
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Activo': return 'success';
      case 'Inactivo': return 'expired';
      case 'Suspendido': return 'error';
      default: return 'default';
    }
  };
  
  const getRoleVariant = (role) => {
    switch (role) {
      case 'Administrador': return 'primary';
      case 'Supervisor': return 'secondary';
      case 'Vendedor': return 'default';
      default: return 'default';
    }
  };
  
  const handleEditUser = () => {
    // Implementación pendiente de edición de usuario
    // Esta función será conectada con el backend cuando esté disponible
    if (onClose) {
      onClose();
    }
  };
  
  const handleToggleStatus = () => {
    // Implementación pendiente de cambio de estado
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
        user ? (
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {user.name}
            </h3>
            <p className="text-sm text-text-secondary">{user.email}</p>
          </div>
        ) : null
      }
    >
      {user ? (
        <div className="space-y-6">
          {/* Información básica */}
          <DrawerSection title="Información del Usuario">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-secondary mb-1">Rol</p>
                <Badge variant={getRoleVariant(user.role)}>
                  {user.role}
                </Badge>
              </div>
              
              <div>
                <p className="text-xs text-text-secondary mb-1">Estado</p>
                <Badge variant={getStatusVariant(user.status)}>
                  {user.status}
                </Badge>
              </div>
              
              <div>
                <p className="text-xs text-text-secondary mb-1">Sucursal</p>
                <p className="text-sm font-medium text-text-primary">
                  {user.branch}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-text-secondary mb-1">ID de Usuario</p>
                <p className="text-sm font-medium text-text-primary">
                  USR{String(user.id).padStart(4, '0')}
                </p>
              </div>
            </div>
          </DrawerSection>
          
          {/* Información de contacto */}
          <DrawerSection title="Información de Contacto">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-text-secondary mb-1">Correo electrónico</p>
                <p className="text-sm font-medium text-text-primary">
                  {user.email}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-text-secondary mb-1">Teléfono</p>
                <p className="text-sm font-medium text-text-primary">
                  +52 55 {Math.floor(Math.random() * 9000 + 1000)} {Math.floor(Math.random() * 9000 + 1000)}
                </p>
              </div>
            </div>
          </DrawerSection>
          
          {/* Actividad reciente */}
          <DrawerSection title="Actividad Reciente">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-xs text-text-secondary">Último acceso</p>
                <p className="text-sm font-medium text-text-primary">
                  Hace 2 horas
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-xs text-text-secondary">Fecha de registro</p>
                <p className="text-sm font-medium text-text-primary">
                  15 ene 2024
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-xs text-text-secondary">Órdenes procesadas (mes)</p>
                <p className="text-sm font-medium text-text-primary">
                  {Math.floor(Math.random() * 50 + 10)}
                </p>
              </div>
            </div>
          </DrawerSection>
          
          {/* Permisos */}
          <DrawerSection title="Permisos Asignados">
            <div className="space-y-2">
              {user.role === 'Administrador' && (
                <>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-text-primary">Gestión de usuarios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-text-primary">Ver reportes completos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-text-primary">Configuración del sistema</span>
                  </div>
                </>
              )}
              {user.role === 'Supervisor' && (
                <>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-text-primary">Ver reportes de sucursal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-text-primary">Cancelar órdenes</span>
                  </div>
                </>
              )}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-text-primary">Crear órdenes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-text-primary">Ver historial de órdenes</span>
              </div>
            </div>
          </DrawerSection>
          
          {/* Acciones */}
          <div className="mt-8 flex justify-between">
            <Button
              variant="ghost"
              size="small"
              onClick={handleEditUser}
              className="text-primary hover:text-blue-700 hover:bg-blue-50"
            >
              Editar usuario
            </Button>
            
            <Button
              variant="ghost"
              size="small"
              onClick={handleToggleStatus}
              className={
                user.status === 'Activo' 
                  ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                  : 'text-green-600 hover:text-green-700 hover:bg-green-50'
              }
            >
              {user.status === 'Activo' ? 'Desactivar usuario' : 'Activar usuario'}
            </Button>
          </div>
        </div>
      ) : null}
    </Drawer>
  );
};

export default UserDetailsDrawer;