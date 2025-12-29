'use client';
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import UserDetailsDrawer from '@/components/users/UserDetailsDrawer';
import useSemanticSearch from '@/hooks/useSemanticSearch';

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  
  // Datos de usuarios de ejemplo
  const [usersData, setUsersData] = useState([
    { id: 1, name: 'Juan Carlos Rodríguez', email: 'juan.rodriguez@empresa.com', role: 'Administrador', branch: 'Sucursal Centro', status: 'Activo' },
    { id: 2, name: 'María García López', email: 'maria.garcia@empresa.com', role: 'Vendedor', branch: 'Sucursal Norte', status: 'Activo' },
    { id: 3, name: 'Carlos Martínez Pérez', email: 'carlos.martinez@empresa.com', role: 'Supervisor', branch: 'Sucursal Sur', status: 'Activo' },
    { id: 4, name: 'Ana Fernández Ruiz', email: 'ana.fernandez@empresa.com', role: 'Vendedor', branch: 'Sucursal Centro', status: 'Inactivo' },
    { id: 5, name: 'Luis Miguel Sánchez', email: 'luis.sanchez@empresa.com', role: 'Vendedor', branch: 'Sucursal Este', status: 'Activo' },
    { id: 6, name: 'Patricia Hernández Díaz', email: 'patricia.hernandez@empresa.com', role: 'Administrador', branch: 'Sucursal Oeste', status: 'Activo' },
    { id: 7, name: 'Roberto González Torres', email: 'roberto.gonzalez@empresa.com', role: 'Supervisor', branch: 'Sucursal Norte', status: 'Suspendido' },
    { id: 8, name: 'Carmen Jiménez Morales', email: 'carmen.jimenez@empresa.com', role: 'Vendedor', branch: 'Sucursal Sur', status: 'Activo' },
    { id: 9, name: 'Javier Díaz Flores', email: 'javier.diaz@empresa.com', role: 'Vendedor', branch: 'Sucursal Centro', status: 'Activo' },
    { id: 10, name: 'Elena Moreno Silva', email: 'elena.moreno@empresa.com', role: 'Supervisor', branch: 'Sucursal Este', status: 'Activo' },
    { id: 11, name: 'Miguel Ángel Vargas', email: 'miguel.vargas@empresa.com', role: 'Vendedor', branch: 'Sucursal Oeste', status: 'Inactivo' },
    { id: 12, name: 'Sofia Castro Reyes', email: 'sofia.castro@empresa.com', role: 'Administrador', branch: 'Sucursal Norte', status: 'Activo' },
    { id: 13, name: 'Diego Ramírez Luna', email: 'diego.ramirez@empresa.com', role: 'Vendedor', branch: 'Sucursal Sur', status: 'Activo' },
    { id: 14, name: 'Laura Gutiérrez Peña', email: 'laura.gutierrez@empresa.com', role: 'Supervisor', branch: 'Sucursal Centro', status: 'Activo' },
    { id: 15, name: 'Fernando López Cruz', email: 'fernando.lopez@empresa.com', role: 'Vendedor', branch: 'Sucursal Este', status: 'Suspendido' },
  ]);
  
  // Mapa semántico para búsqueda de usuarios
  const userSemanticMap = {
    'administrador': ['admin', 'gerente', 'manager', 'jefe'],
    'vendedor': ['ventas', 'comercial', 'asesor', 'ejecutivo'],
    'supervisor': ['coordinador', 'líder', 'encargado', 'responsable'],
    'activo': ['habilitado', 'vigente', 'operativo', 'trabajando'],
    'inactivo': ['deshabilitado', 'baja', 'no activo', 'pausado'],
    'suspendido': ['bloqueado', 'sancionado', 'restringido', 'penalizado'],
    'centro': ['central', 'principal', 'matriz'],
    'norte': ['norteño', 'septentrional'],
    'sur': ['sureño', 'meridional'],
    'este': ['oriente', 'oriental', 'levante'],
    'oeste': ['occidente', 'occidental', 'poniente'],
    'sucursal': ['tienda', 'local', 'sede', 'oficina', 'filial']
  };
  
  // Hook de búsqueda semántica
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: searchedUsers,
    resultsCount,
    isSearching
  } = useSemanticSearch(
    usersData,
    ['name', 'email', 'role', 'branch', 'status'],
    userSemanticMap,
    {
      scoreWeights: {
        'name': 3,        // Más peso al nombre
        'email': 2,       // Peso alto al email
        'role': 2,        // Peso alto al rol
        'branch': 1.5,    // Peso medio a la sucursal
        'status': 1.5     // Peso medio al estado
      },
      minScore: 0,
      fuzzyThreshold: 0.70,
      numberTolerance: 0.20,
      enableFuzzy: true,
      enableNumericSearch: false,  // No hay números en usuarios
      enablePartialPhonetic: true,
      minPhoneticLength: 3
    }
  );
  
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };
  
  const [sortDirection, setSortDirection] = useState(null);
  
  const handleAddUser = () => {
    // Implementación pendiente de modal de agregar usuario
    setIsAddUserModalOpen(true);
  };
  
  const handleSortByStatus = (direction) => {
    setSortDirection(direction);
  };
  
  // Aplicar ordenamiento después de la búsqueda
  const sortedUsers = React.useMemo(() => {
    if (!sortDirection) return searchedUsers;
    
    const statusOrder = ['Activo', 'Inactivo', 'Suspendido'];
    return [...searchedUsers].sort((a, b) => {
      const indexA = statusOrder.indexOf(a.status);
      const indexB = statusOrder.indexOf(b.status);
      
      if (sortDirection === 'asc') {
        return indexA - indexB;
      } else {
        return indexB - indexA;
      }
    });
  }, [searchedUsers, sortDirection]);
  
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
  
  const columns = [
    {
      key: 'name',
      label: 'Nombre',
      width: '25%',
      mobileDisplay: true,
      render: (value) => <span className="font-medium text-text-primary">{value}</span>
    },
    {
      key: 'email',
      label: 'Correo electrónico',
      width: '30%',
      mobileDisplay: true,
      render: (value) => <span className="text-text-secondary text-sm">{value}</span>
    },
    {
      key: 'role',
      label: 'Rol',
      width: '15%',
      mobileDisplay: true,
      render: (value) => (
        <Badge variant={getRoleVariant(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'branch',
      label: 'Sucursal',
      width: '18%',
      mobileDisplay: true,
      render: (value) => <span className="text-text-secondary">{value}</span>
    },
    {
      key: 'status',
      label: 'Estatus',
      width: '12%',
      sortable: true,
      onSort: handleSortByStatus,
      mobileDisplay: true,
      render: (value) => (
        <Badge variant={getStatusVariant(value)}>
          {value}
        </Badge>
      )
    }
  ];
  
  // Calcular paginación
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  
  // Resetear a página 1 cuando cambia la búsqueda
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  return (
    <>
      <PageLayout
        title="Usuarios"
        showActions={true}
        showQRButton={false}
        primaryActionText="Agregar usuario"
        onPrimaryClick={handleAddUser}
      >
        {/* Users Section */}
        <div className="space-y-6">
          {/* Search */}
          <div>
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
              placeholder="Buscar por nombre, correo, rol..."
              className="w-full sm:w-96"
              showResults={isSearching}
              resultsCount={resultsCount}
            />
          </div>
          
          {/* Users Table */}
          <div className="bg-white overflow-hidden rounded-lg">
          <Table
            columns={columns}
            data={paginatedUsers}
            onRowClick={handleUserClick}
            renderMobileCard={({ row }) => (
              <div 
                onClick={() => handleUserClick(row)}
                className="bg-white p-4 border-b border-border-light hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="mb-3">
                  <div className="font-medium text-text-primary">{row.name}</div>
                  <div className="text-xs text-text-secondary mt-1">{row.email}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-secondary">Rol:</span>
                    <Badge variant={getRoleVariant(row.role)}>
                      {row.role}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-secondary">Sucursal:</span>
                    <span className="text-sm text-text-primary">{row.branch}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-secondary">Estado:</span>
                    <Badge variant={getStatusVariant(row.status)}>
                      {row.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          />
          </div>
          
          {/* Pagination */}
          {sortedUsers.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sortedUsers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </PageLayout>
      
      {/* User Details Drawer */}
      <UserDetailsDrawer
        isOpen={isUserDetailsOpen}
        onClose={() => {
          setIsUserDetailsOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </>
  );
}