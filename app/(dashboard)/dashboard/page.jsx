'use client';
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageLayout from '@/components/layout/PageLayout';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import CreateOrderModal from '@/components/dashboard/CreateOrderModal';
import StoreQRModal from '@/components/dashboard/StoreQRModal';
import OrderDetailsDrawer from '@/components/dashboard/OrderDetailsDrawer';
import useSemanticSearch from '@/hooks/useSemanticSearch';

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [isStoreQRModalOpen, setIsStoreQRModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [ordersData, setOrdersData] = useState([
    { id: '#1006', client: 'Magdiel Joab Pech Menéndez', date: '18 jun 2025, 10:17 h', amount: '$563', paymentMethod: 'Código de pago', status: 'Aprobado' },
    { id: '#1005', client: 'María García López', date: '18 jun 2025, 10:17 h', amount: '$1,250', paymentMethod: 'QR de orden', status: 'Aprobado' },
    { id: '#1004', client: 'Carlos Rodríguez Sánchez', date: '18 jun 2025, 10:17 h', amount: '$890', paymentMethod: 'Código de pago', status: 'Pendiente' },
    { id: '#1003', client: 'Ana Martínez Pérez', date: '18 jun 2025, 10:17 h', amount: '$2,100', paymentMethod: 'QR de orden', status: 'Aprobado' },
    { id: '#1002', client: 'Magdiel Joab Pech Menéndez', date: '18 jun 2025, 10:17 h', amount: '$563', paymentMethod: 'Código de pago', status: 'Aprobado' },
    { id: '#1001', client: 'Luis Fernando González', date: '18 jun 2025, 10:17 h', amount: '$750', paymentMethod: 'QR de orden', status: 'Rechazado' },
    { id: '#1000', client: 'Patricia Hernández Ramírez', date: '18 jun 2025, 10:17 h', amount: '$425', paymentMethod: 'QR de orden', status: 'Cancelado' },
    { id: '#999', client: 'Roberto Jiménez Torres', date: '18 jun 2025, 10:17 h', amount: '$1,800', paymentMethod: 'QR de orden', status: 'Aprobado' },
    { id: '#998', client: 'Elena Morales Cruz', date: '18 jun 2025, 10:17 h', amount: '$990', paymentMethod: 'Código de pago', status: 'Aprobado' },
    { id: '#997', client: 'Javier Díaz Flores', date: '18 jun 2025, 10:17 h', amount: '$340', paymentMethod: 'Código de pago', status: 'Aprobado' },
    { id: '#996', client: 'Carmen Ruiz Mendoza', date: '18 jun 2025, 10:17 h', amount: '$1,500', paymentMethod: 'QR de tienda', status: 'Expirado' },
    { id: '#995', client: 'Miguel Ángel Vargas', date: '18 jun 2025, 10:17 h', amount: '$675', paymentMethod: 'QR de orden', status: 'Expirado' },
    { id: '#994', client: 'Sofia Castro Reyes', date: '18 jun 2025, 10:17 h', amount: '$2,300', paymentMethod: 'QR de orden', status: 'Aprobado' },
    { id: '#993', client: 'Diego Moreno Silva', date: '18 jun 2025, 10:17 h', amount: '$420', paymentMethod: 'QR de orden', status: 'Aprobado' },
    { id: '#992', client: 'Laura Gutiérrez Peña', date: '18 jun 2025, 10:17 h', amount: '$880', paymentMethod: 'QR de orden', status: 'Aprobado' },
  ]);
  
  // Mapa semántico para búsqueda de órdenes
  const orderSemanticMap = {
    'aprobado': ['aprobada', 'exitoso', 'completado', 'pagado', 'confirmado'],
    'pendiente': ['esperando', 'procesando', 'en proceso', 'por confirmar'],
    'rechazado': ['rechazada', 'denegado', 'fallido', 'error', 'no aprobado'],
    'cancelado': ['cancelada', 'anulado', 'revertido', 'devuelto'],
    'expirado': ['expirada', 'vencido', 'timeout', 'tiempo agotado'],
    'qr': ['codigo qr', 'código', 'escanear'],
    'orden': ['pedido', 'compra', 'transacción', 'venta'],
    'tienda': ['negocio', 'establecimiento', 'comercio', 'sucursal'],
    'pago': ['cobro', 'pagar', 'payment', 'abono'],
    'cliente': ['comprador', 'usuario', 'consumidor'],
    'hoy': ['hoy', 'actual', 'reciente'],
    'ayer': ['ayer', 'anterior', 'pasado']
  };
  
  // Hook de búsqueda semántica con capacidades mejoradas
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: searchedOrders,
    resultsCount,
    isSearching
  } = useSemanticSearch(
    ordersData,
    ['id', 'client', 'date', 'amount', 'paymentMethod', 'status'],
    orderSemanticMap,
    {
      scoreWeights: {
        'id': 3,          // Más peso al ID de orden
        'client': 2,      // Peso alto al nombre del cliente
        'status': 2,      // Peso alto al estado
        'paymentMethod': 1.5,
        'amount': 1.5,    // Aumentado para búsquedas de montos
        'date': 1
      },
      minScore: 0,
      fuzzyThreshold: 0.65,      // Umbral más permisivo para errores tipográficos
      numberTolerance: 0.20,     // 20% tolerancia en búsquedas numéricas
      enableFuzzy: true,         // Activa búsqueda difusa y FONÉTICA
      enableNumericSearch: true,  // Activa búsqueda numérica aproximada
      enablePartialPhonetic: true,  // Activa búsqueda fonética para palabras parciales
      minPhoneticLength: 3        // Longitud mínima para búsqueda fonética
    }
  );
  
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const [sortDirection, setSortDirection] = useState(null);
  
  const handleSortByStatus = (direction) => {
    setSortDirection(direction);
  };
  
  // Aplicar ordenamiento después de la búsqueda
  const sortedOrders = React.useMemo(() => {
    if (!sortDirection) return searchedOrders;
    
    const statusOrder = ['Aprobado', 'Pendiente', 'Rechazado', 'Cancelado', 'Expirado'];
    return [...searchedOrders].sort((a, b) => {
      const indexA = statusOrder.indexOf(a.status);
      const indexB = statusOrder.indexOf(b.status);
      
      if (sortDirection === 'asc') {
        return indexA - indexB;
      } else {
        return indexB - indexA;
      }
    });
  }, [searchedOrders, sortDirection]);
  
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Aprobado': return 'success';
      case 'Pendiente': return 'pending';
      case 'Rechazado': return 'error';
      case 'Cancelado': return 'cancelled';
      case 'Expirado': return 'expired';
      default: return 'default';
    }
  };
  
  const columns = [
    {
      key: 'id',
      label: 'Orden',
      width: '10%',
      mobileDisplay: true,
      render: (value) => <span className="font-medium text-text-primary">{value}</span>
    },
    {
      key: 'client',
      label: 'Cliente',
      width: '25%',
      mobileDisplay: true,
      render: (value) => <span className="text-text-primary">{value}</span>
    },
    {
      key: 'date',
      label: 'Fecha',
      width: '20%',
      mobileDisplay: true,
      render: (value) => <span className="text-text-secondary">{value}</span>
    },
    {
      key: 'amount',
      label: 'Monto',
      width: '10%',
      mobileDisplay: true,
      render: (value) => <span className="font-medium text-text-primary">{value}</span>
    },
    {
      key: 'paymentMethod',
      label: 'Método de cobro',
      width: '20%',
      mobileDisplay: true,
      render: (value) => <span className="text-text-secondary">{value}</span>
    },
    {
      key: 'status',
      label: 'Estatus',
      width: '15%',
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
  
  return (
    <>
      <PageLayout
        title="Órdenes"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        showActions={true}
        showQRButton={true}
        onQRClick={() => setIsStoreQRModalOpen(true)}
        onPrimaryClick={() => setIsCreateOrderModalOpen(true)}
      >
        
        {/* Orders Section */}
        <div className="space-y-6">
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Search Input */}
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
              placeholder="Buscar por cliente, ID, estado..."
              className="w-full sm:w-80"
              showResults={isSearching}
              resultsCount={resultsCount}
            />
            {/* Refresh Button */}
            <button className="flex items-center justify-center gap-2 text-primary font-inter font-medium text-sm hover:text-blue-700 transition-colors px-4 py-2 sm:py-0">
              <img src="/actualizar.svg" alt="" className="w-4 h-4" />
              <span>Actualizar</span>
            </button>
          </div>
          
          {/* Orders Table */}
          <div className="bg-white overflow-hidden rounded-lg">
            <Table
              columns={columns}
              data={sortedOrders}
              onRowClick={handleOrderClick}
              renderMobileCard={({ row }) => (
                <div 
                  onClick={() => handleOrderClick(row)}
                  className="bg-white p-4 border-b border-border-light hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-text-primary text-sm">{row.id}</div>
                      <div className="text-xs text-text-secondary mt-1">{row.client}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-text-primary text-sm">{row.amount}</div>
                      <div className="text-xs text-text-secondary mt-1">{row.date}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-xs text-text-secondary">{row.paymentMethod}</div>
                    <Badge variant={getStatusVariant(row.status)}>
                      {row.status}
                    </Badge>
                  </div>
                </div>
              )}
            />
          </div>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(sortedOrders.length / 15)}
            totalItems={sortedOrders.length}
            itemsPerPage={15}
            onPageChange={setCurrentPage}
          />
        </div>
      </PageLayout>
      
      {/* Create Order Modal */}
      <CreateOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={() => setIsCreateOrderModalOpen(false)}
      />
      
      {/* Store QR Modal */}
      <StoreQRModal
        isOpen={isStoreQRModalOpen}
        onClose={() => setIsStoreQRModalOpen(false)}
      />
      
      {/* Order Details Drawer */}
      <OrderDetailsDrawer
        isOpen={isOrderDetailsOpen}
        onClose={() => {
          setIsOrderDetailsOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </>
  );
}