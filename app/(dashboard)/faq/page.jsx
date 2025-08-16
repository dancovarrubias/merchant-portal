'use client';
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import Accordion from '@/components/ui/Accordion';
import SearchInput from '@/components/ui/SearchInput';
import EmptyState from '@/components/ui/EmptyState';
import useSemanticSearch from '@/hooks/useSemanticSearch';

export default function FAQPage() {
  const faqItems = [
    {
      title: '¿Qué es el código QR estático?',
      content: 'Es un código único e impreso que puedes colocar en el mostrador de tu tienda para simplificar los cobros. Este QR no cambia y permite que tus clientes lo escaneen sin necesidad de que generes un nuevo código en cada transacción.'
    },
    {
      title: '¿Cómo cobrar con el QR estático?',
      content: 'Una vez que sepas la cantidad que debes cobrar a tu cliente, sigue estos pasos: Muestra al cliente el QR estático para que lo escanee desde la app de Kueski Pay. Indícale el monto exacto a ingresar y espera su confirmación. Revisa en Ventas desde el portal, que el monto coincida y tenga el estatus de Autorizada. ¡Listo! Ya puedes entregar los productos.'
    },
    {
      title: '¿El monto de la venta es incorrecto?',
      content: 'Si al revisar desde la sección de Ventas notas que el monto de la transacción es incorrecto o quieres cancelar la venta, sigue estos pasos: Presiona Cancelar dentro de la misma fila de la venta. Confirma la cancelación seleccionando Cancelar venta. Toma en cuenta que tu cliente deberá escanear el QR estático para intentar hacer la compra de nuevo.'
    },
    {
      title: '¿Cuál es la diferencia entre el QR estático y el QR que se genera para cada transacción?',
      content: 'A diferencia del QR dinámico, que se genera para cada transacción, donde el vendedor debe ingresar el monto de cada venta, el QR estático es único para cada sucursal. Permite a tus clientes escanearlo (impreso o digital) y completar la compra desde la app de Kueski Pay, agilizando el proceso sin que el vendedor deba crear una nueva orden.'
    },
    {
      title: '¿Dejarán de funcionar los otros métodos de cobro?',
      content: 'No, tanto el Código QR dinámico como el Código de pago seguirán funcionando. El código QR estático es una alternativa de cobro que te ayudará a completar las ventas en menor tiempo y con mayor comodidad.'
    },
    {
      title: '¿El QR estático funcionará cuando mi cliente no tenga conexión a internet?',
      content: 'No, en caso de que tu cliente no tenga conexión a internet te recomendamos usar el Código QR dinámico en modo "sin conexión".'
    },
    {
      title: '¿Qué es Kueski Pay?',
      content: 'Kueski Pay es la solución que le permite a tus clientes financiar las compras que quieran hacer en tu tienda. Cuando elijan Kueski Pay como opción de pago, tendrán acceso a una tasa de interés y duración de crédito que más se acomode a ellos.'
    },
    {
      title: '¿Cuántas quincenas le ofrece Kueski Pay a tus clientes para pagar?',
      content: 'Actualmente ofrecemos 1, 2, 4, 6 y hasta 8 quincenas a tus clientes, con la opción de tener hasta 4 quincenas. ¡Así es, nosotros le prestamos a tus clientes!'
    },
    {
      title: '¿Qué tasa de interés cobra Kueski Pay a tus clientes?',
      content: 'Puede variar dependiendo el número de quincenas elegidas por tu cliente, así como por las promociones del momento. No tenemos costo de anualidad ni comisiones por apertura de cuenta. Tus clientes sabrán desde el principio cuándo y cuánto van a pagar.'
    },
    {
      title: '¿Cuáles son los requisitos para que obtengan el financiamiento?',
      content: 'Tu cliente deberá llenar nuestra solicitud de crédito teniendo solamente su INE a la mano y, en cuestión de segundos, le responderemos si su solicitud fue aprobada o rechazada. Todas las solicitudes están sujetas a aprobación y los resultados pueden variar sin previo aviso.*'
    },
    {
      title: '¿Qué pasa si rechazan la solicitud de tu cliente?',
      content: 'Si tu cliente no pasa nuestros filtros, puedes sugerirle que utilice otro método de pago para completar la compra. Considera que todas las solicitudes están sujetas a aprobación y los resultados pueden variar sin previo aviso.'
    },
    {
      title: '¿Kueski Pay se puede combinar con otros métodos de pago?',
      content: 'No, nuestro producto es independiente a otras entidades bancarias o métodos de pago. Tus clientes deberán financiar el total de sus compras utilizando Kueski Pay como método de pago en tu tienda física.'
    },
    {
      title: '¿Cuál es el monto que podemos financiar a tus clientes?',
      content: 'Ofrecemos créditos a compras desde $300.00 MXN hasta $9,000.00 MXN. Estos montos están sujetos a aprobación y aplican restricciones de acuerdo al tipo de usuario que solicite el crédito. Todos tus clientes deberán consultar previamente nuestros términos y condiciones. Todas las solicitudes están sujetas a aprobación y los resultados pueden variar sin previo aviso.*'
    },
    {
      title: '¿Quién se hace cargo de la cobranza?',
      content: 'Nosotros asumimos toda la operación y cobranza del financiamiento, así tú solo te preocuparás por vender más y brindarle la mejor experiencia a tus clientes en cada visita.'
    }
  ];

  // Mapa semántico para FAQs
  const faqSemanticMap = {
    'pagar': ['pago', 'cobro', 'transacción', 'dinero', 'monto', 'método'],
    'pago': ['pagar', 'cobro', 'transacción', 'dinero', 'monto', 'método'],
    'crear': ['generar', 'hacer', 'nueva', 'agregar', 'añadir'],
    'cancelar': ['anular', 'eliminar', 'borrar', 'rechazar', 'revertir'],
    'orden': ['pedido', 'transacción', 'compra', 'venta'],
    'qr': ['código', 'escanear', 'scanner', 'cámara', 'estatico', 'dinamico'],
    'codigo': ['qr', 'código', 'clave', 'número'],
    'tiempo': ['duración', 'plazo', 'límite', 'expirar', 'segundos'],
    'error': ['problema', 'fallo', 'rechazado', 'no funciona', 'no se procesa'],
    'ver': ['mostrar', 'visualizar', 'consultar', 'revisar', 'historial'],
    'actualizar': ['modificar', 'cambiar', 'editar', 'perfil'],
    'descargar': ['guardar', 'obtener', 'exportar'],
    'estado': ['status', 'situación', 'aprobado', 'pendiente', 'rechazado'],
    'kueski': ['kueski pay', 'financiamiento', 'crédito'],
    'cliente': ['comprador', 'usuario', 'consumidor'],
    'tienda': ['negocio', 'establecimiento', 'comercio']
  };

  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredFAQs,
    resultsCount,
    isSearching
  } = useSemanticSearch(
    faqItems,
    ['title', 'content'],
    faqSemanticMap,
    {
      scoreWeights: {
        'title': 2,  // Dar más peso a coincidencias en el título
        'content': 1
      },
      minScore: 0,
      fuzzyThreshold: 0.70,      // 70% similitud para FAQs
      numberTolerance: 0.15,     // 15% tolerancia numérica
      enableFuzzy: true,         // Activa búsqueda difusa y FONÉTICA
      enableNumericSearch: true,  // Activa búsqueda numérica
      enablePartialPhonetic: true,  // Activa búsqueda fonética para palabras parciales
      minPhoneticLength: 3        // Longitud mínima para búsqueda fonética
    }
  );

  return (
    <>
      <PageLayout
        title="Preguntas frecuentes"
        subtitle="Encuentra respuestas a las preguntas más comunes sobre el uso de la plataforma"
        showActions={false}
      >
        {/* Buscador */}
        <div className="mb-6">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Buscar en preguntas frecuentes..."
            className="w-full sm:w-96"
            showResults={isSearching}
            resultsCount={resultsCount}
          />
        </div>

        {/* FAQ Accordion */}
        {filteredFAQs.length > 0 ? (
          <Accordion items={filteredFAQs} allowMultiple={false} />
        ) : searchTerm ? (
          <EmptyState
            icon={
              <svg
                className="w-full h-full"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h-.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="No encontramos lo que buscas"
            description="Intenta con otros términos o contacta a soporte"
          />
        ) : (
          <Accordion items={filteredFAQs} allowMultiple={false} />
        )}
      </PageLayout>
    </>
  );
}