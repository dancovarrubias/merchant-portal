// Chat UI Configuration
export const CHAT_CONFIG = {
  WELCOME_MESSAGE: '¿En qué puedo ayudarte hoy?',
  ASSISTANT_NAME: 'Kike',
  ASSISTANT_IMAGE: '/kike.jpg',
  ASSISTANT_STATUS: 'Activo ahora',
  INPUT_PLACEHOLDER: 'Escribe tu mensaje...',
  MODAL_TITLE: 'Chat con Kike',
  PREVIEW_DURATION: 5000, // 5 seconds
  TYPING_DELAY: {
    MIN: 1000,
    MAX: 2000
  }
};

// Quick Actions
export const QUICK_ACTIONS = [
  {
    id: 'why-kueski',
    text: '¿Por qué ofrecer Kueski Pay?',
    className: 'px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors'
  },
  {
    id: 'payment-rejected',
    text: '¿Qué pasa si no acepta el código?',
    className: 'px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors'
  },
  {
    id: 'pre-approved',
    text: 'Mi cliente tiene monto PRE-APROBADO',
    className: 'px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors'
  }
];

// Emojis for the picker
export const EMOJI_LIST = ['😊', '😂', '❤️', '👍', '👏', '🎉', '🙏', '😍', '🤔', '👋', '💪', '🚀', '✨', '🔥', '💯', '😎'];

// Mock responses - This will be replaced with OpenAI integration
export const MOCK_RESPONSES = {
  default: [
    '¡Hola! 👋 Soy **Kike**, tu asistente virtual de Kueski Pay.\n\n¿En qué puedo ayudarte hoy?',
    'Estoy aquí para ayudarte con cualquier pregunta sobre **Kueski Pay**.\n\nPuedo asistirte con:\n• Pagos y cobros\n• Transacciones\n• Configuración de cuenta\n• Soporte técnico',
    '**¡Bienvenido a Kueski Pay!** 🎉\n\nPuedo ayudarte con:\n• Generar códigos de pago\n• Revisar transacciones\n• Administrar usuarios\n• Y mucho más\n\n¿Por dónde empezamos?'
  ],
  payment: [
    '**Para generar un código de pago:**\n\n1. Ve al **Dashboard**\n2. Haz clic en **"Crear orden"**\n3. Ingresa el **monto** a cobrar\n4. Selecciona **"Código de pago"**\n5. Comparte el código de **6 dígitos** con tu cliente\n\n✅ El código se generará automáticamente y podrás copiarlo con un clic.',
    '**Información importante sobre códigos de pago:**\n\n• ⏱️ Los códigos son válidos por **5 minutos**\n• 🔄 Si expira, puedes generar uno nuevo fácilmente\n• 📊 Todos los códigos quedan registrados en tu historial\n• 🔒 Cada código es único y seguro\n\n¿Necesitas generar un código ahora?',
    '**Tipos de cobro disponibles:**\n\n• **Código QR de orden** - Para una transacción específica\n• **Código QR de tienda** - Para múltiples transacciones\n• **Código de 6 dígitos** - Para compartir por mensaje o teléfono\n\nCada método tiene sus ventajas. ¿Cuál prefieres usar?'
  ],
  transactions: [
    '**Para ver tus transacciones:**\n\n1. Ve al **Dashboard**\n2. Encontrarás la tabla de **"Órdenes recientes"**\n3. Puedes:\n   • **Filtrar** por estado (Aprobado, Pendiente, etc.)\n   • **Buscar** por nombre de cliente o ID\n   • **Ordenar** por fecha o monto\n\n💡 **Tip:** Haz clic en cualquier transacción para ver todos los detalles.',
    '**Información de cada transacción:**\n\n• **Cliente** - Nombre y datos de contacto\n• **Monto** - Cantidad cobrada\n• **Método** - QR o código de pago\n• **Estado** - Aprobado, Pendiente o Rechazado\n• **Fecha y hora** - Registro completo\n\n📥 Pronto podrás **exportar** tu historial a Excel.',
    '**Estados de las transacciones:**\n\n• ✅ **Aprobado** - Pago completado exitosamente\n• ⏳ **Pendiente** - Esperando confirmación\n• ❌ **Rechazado** - Pago no procesado\n• 🚫 **Cancelado** - Transacción cancelada\n• ⏰ **Expirado** - Código de pago vencido\n\nCada estado tiene un color distintivo para identificarlo rápidamente.'
  ],
  help: [
    '**¿En qué puedo ayudarte?** 🤝\n\nPuedo asistirte con:\n\n• **Pagos y cobros**\n  - Generar códigos QR\n  - Crear códigos de 6 dígitos\n  - Procesar transacciones\n\n• **Gestión**\n  - Ver historial de transacciones\n  - Administrar usuarios\n  - Configurar tu cuenta\n\n• **Soporte técnico**\n  - Resolver problemas\n  - Guiarte paso a paso\n\n¿Qué necesitas hacer?',
    '**Contacto de soporte** 📞\n\nSi necesitas ayuda adicional, puedes contactarnos:\n\n📧 **Email:** soporte@kueskipay.com\n📱 **WhatsApp:** +52 55 1234 5678\n☎️ **Teléfono:** +52 55 1234 5678\n\n⏰ **Horario de atención:**\nLunes a Viernes: 9:00 - 18:00\nSábados: 9:00 - 14:00\n\nTambién puedes consultar las **Preguntas Frecuentes** en el menú lateral.',
    '**Enlaces rápidos** 🔗\n\n• [Dashboard](/dashboard) - Panel principal\n• [Usuarios](/users) - Gestión de usuarios\n• [FAQ](/faq) - Preguntas frecuentes\n• [Contacto](/contact) - Información de contacto\n\n¿Hay algo específico con lo que necesites ayuda?'
  ],
  greeting: [
    '¡Hola! 👋 **Me da gusto verte por aquí.**\n\n¿Cómo te puedo ayudar hoy?',
    '¡Buen día! ☀️ Soy **Kike**, tu asistente virtual.\n\n¿Qué necesitas hacer hoy?',
    '¡Hola! 🎯 Estoy listo para ayudarte con lo que necesites sobre **Kueski Pay**.\n\n¿Por dónde empezamos?'
  ]
};