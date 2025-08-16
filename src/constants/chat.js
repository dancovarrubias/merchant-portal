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
    id: 'payment-code',
    text: '¿Cómo genero un código de pago?',
    className: 'px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors'
  },
  {
    id: 'transactions',
    text: 'Ver mis transacciones',
    className: 'px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors'
  },
  {
    id: 'help',
    text: 'Necesito ayuda',
    className: 'px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors'
  }
];

// Emojis for the picker
export const EMOJI_LIST = ['😊', '😂', '❤️', '👍', '👏', '🎉', '🙏', '😍', '🤔', '👋', '💪', '🚀', '✨', '🔥', '💯', '😎'];

// Mock responses - This will be replaced with OpenAI integration
export const MOCK_RESPONSES = {
  default: [
    '¡Hola! Soy Kike, tu asistente virtual de Kueski Pay. ¿En qué puedo ayudarte hoy?',
    'Estoy aquí para ayudarte con cualquier pregunta sobre Kueski Pay.',
    'Puedo ayudarte con pagos, transacciones, configuración de tu cuenta y mucho más.'
  ],
  payment: [
    'Para generar un código de pago:\n1. Ve al Dashboard\n2. Haz clic en "Crear orden"\n3. Ingresa el monto\n4. Selecciona "Código de pago"\n5. Comparte el código de 6 dígitos con tu cliente',
    'Los códigos de pago son válidos por 5 minutos. Si expira, puedes generar uno nuevo fácilmente.',
    'Puedes ver todos tus códigos generados en el historial de transacciones.'
  ],
  transactions: [
    'Para ver tus transacciones:\n1. Ve al Dashboard\n2. Ahí encontrarás todas tus órdenes\n3. Puedes filtrar por estado, fecha o buscar por cliente',
    'Cada transacción muestra: cliente, monto, método de pago y estado actual.',
    'Puedes hacer clic en cualquier transacción para ver más detalles.'
  ],
  help: [
    'Puedo ayudarte con:\n• Generar códigos de pago\n• Ver transacciones\n• Administrar usuarios\n• Configurar tu cuenta\n• Resolver problemas técnicos\n\n¿Qué necesitas?',
    'Si necesitas ayuda adicional, puedes contactar a soporte:\n📧 soporte@kueskipay.com\n📞 +52 55 1234 5678\n⏰ Lunes a Viernes, 9:00 - 18:00',
    'También puedes revisar nuestra sección de Preguntas Frecuentes para respuestas rápidas.'
  ],
  greeting: [
    '¡Hola! 👋 Me da gusto verte por aquí. ¿Cómo te puedo ayudar hoy?',
    '¡Buen día! Soy Kike, tu asistente virtual. ¿Qué necesitas?',
    '¡Hola! Estoy listo para ayudarte con lo que necesites sobre Kueski Pay.'
  ]
};