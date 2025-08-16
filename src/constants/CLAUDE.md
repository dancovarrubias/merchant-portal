# Constants - Application Constants

## Files

### index.js
Central location for all application constants, magic numbers, and configuration values.

### chat.js
Configuration and constants for the virtual assistant Kike.

### FAQ_DATA

Frequently asked questions data structure for the FAQ page.

```javascript
export const FAQ_DATA = [
  {
    id: 1,
    question: "¿Cómo realizar un cobro con código QR?",
    answer: "Para realizar un cobro con código QR...",
    category: "payments"
  },
  // ... 15 total questions
];
```

**Categories:**
- `payments` - Payment related questions
- `security` - Security and safety questions
- `account` - Account management questions
- `technical` - Technical support questions

**Question IDs:** 1-15

**Structure:**
```javascript
{
  id: number,          // Unique identifier
  question: string,    // Question text in Spanish
  answer: string,      // Detailed answer in Spanish
  category: string     // Category identifier
}
```

### Complete FAQ Questions

1. **¿Cómo realizar un cobro con código QR?**
   - Category: payments
   - Explains QR payment process

2. **¿Qué hacer si el pago no se procesa?**
   - Category: payments
   - Troubleshooting payment issues

3. **¿Cómo generar un código de pago de 6 dígitos?**
   - Category: payments
   - 6-digit code generation process

4. **¿Cuánto tiempo es válido un código de pago?**
   - Category: payments
   - Payment code expiration (5 minutes)

5. **¿Puedo cancelar una transacción?**
   - Category: payments
   - Transaction cancellation policy

6. **¿Cómo cambiar mi contraseña?**
   - Category: account
   - Password change process

7. **¿Cómo agregar usuarios a mi cuenta?**
   - Category: account
   - User management instructions

8. **¿Qué permisos puedo asignar a los usuarios?**
   - Category: account
   - Permission types and assignment

9. **¿Es seguro el sistema de pagos?**
   - Category: security
   - Security measures and encryption

10. **¿Qué hacer si detecto una transacción sospechosa?**
    - Category: security
    - Fraud reporting process

11. **¿Cómo proteger mi cuenta?**
    - Category: security
    - Account security best practices

12. **¿Qué navegadores son compatibles?**
    - Category: technical
    - Browser compatibility list

13. **¿Puedo usar el sistema en mi celular?**
    - Category: technical
    - Mobile compatibility

14. **¿Cómo exportar mis transacciones?**
    - Category: payments
    - Export functionality

15. **¿Dónde puedo ver el historial de pagos?**
    - Category: payments
    - Payment history location

## chat.js

Configuration and constants for the Kike virtual assistant.

### CHAT_CONFIG
```javascript
export const CHAT_CONFIG = {
  WELCOME_MESSAGE: '¿En qué puedo ayudarte hoy?',
  ASSISTANT_NAME: 'Kike',
  ASSISTANT_IMAGE: '/kike.jpg',
  ASSISTANT_STATUS: 'Activo ahora',
  INPUT_PLACEHOLDER: 'Escribe tu mensaje...',
  MODAL_TITLE: 'Chat con Kike',
  PREVIEW_DURATION: 5000, // 5 seconds
  TYPING_DELAY: {
    MIN: 1000,  // 1 second
    MAX: 2000   // 2 seconds
  }
};
```

### QUICK_ACTIONS
Pre-defined quick action buttons for common questions:
```javascript
export const QUICK_ACTIONS = [
  {
    id: 'payment-code',
    text: '¿Cómo genero un código de pago?',
    className: 'px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors'
  },
  {
    id: 'transactions',
    text: 'Ver mis transacciones',
    className: '...'
  },
  {
    id: 'help',
    text: 'Necesito ayuda',
    className: '...'
  }
];
```

### EMOJI_LIST
Available emojis in the chat emoji picker:
```javascript
export const EMOJI_LIST = ['😊', '😂', '❤️', '👍', '👏', '🎉', '🙏', '😍', '🤔', '👋', '💪', '🚀', '✨', '🔥', '💯', '😎'];
```

### MOCK_RESPONSES
Categorized mock responses for different types of user queries:
```javascript
export const MOCK_RESPONSES = {
  default: [...],      // Default responses
  payment: [...],      // Payment-related responses
  transactions: [...], // Transaction queries
  help: [...],        // Help and support
  greeting: [...]     // Greeting messages
};
```

## Potential Constants to Add

### API Endpoints
```javascript
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  ORDERS: '/api/orders',
  USERS: '/api/users',
  // ... more endpoints
};
```

### Status Types
```javascript
export const ORDER_STATUS = {
  APPROVED: 'Aprobado',
  PENDING: 'Pendiente',
  REJECTED: 'Rechazado',
  CANCELLED: 'Cancelado',
  EXPIRED: 'Expirado'
};

export const USER_STATUS = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  SUSPENDED: 'Suspendido'
};
```

### User Roles
```javascript
export const USER_ROLES = {
  ADMIN: 'Administrador',
  SUPERVISOR: 'Supervisor',
  VENDOR: 'Vendedor'
};
```

### Payment Methods
```javascript
export const PAYMENT_METHODS = {
  QR_ORDER: 'QR de orden',
  QR_STORE: 'QR de tienda',
  PAYMENT_CODE: 'Código de pago'
};
```

### Pagination
```javascript
export const PAGINATION = {
  ORDERS_PER_PAGE: 15,
  USERS_PER_PAGE: 10,
  DEFAULT_PAGE: 1
};
```

### Time Constants
```javascript
export const TIME_CONSTANTS = {
  DEBOUNCE_DELAY: 200,        // ms
  SEARCH_DEBOUNCE: 200,       // ms
  MODAL_TRANSITION: 300,      // ms
  DRAWER_TRANSITION: 300,     // ms
  ACCORDION_DURATION: 500,    // ms
  PAYMENT_CODE_EXPIRY: 300,   // seconds (5 minutes)
  SESSION_TIMEOUT: 1800       // seconds (30 minutes)
};
```

### Validation Rules
```javascript
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 50,
  PIN_LENGTH: 6,
  RFC_PATTERN: /^[A-Z]{3,4}[0-9]{6}[A-Z0-9]{3}$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^[0-9]{10}$/
};
```

### Search Configuration
```javascript
export const SEARCH_CONFIG = {
  FUZZY_THRESHOLD: 0.7,
  NUMBER_TOLERANCE: 0.2,
  MIN_PHONETIC_LENGTH: 3,
  MAX_CACHE_SIZE: 100,
  MAX_PHONETIC_CACHE: 200
};
```

### Error Messages
```javascript
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es requerido',
  INVALID_EMAIL: 'Correo electrónico inválido',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden',
  NETWORK_ERROR: 'Error de conexión. Intenta de nuevo',
  SESSION_EXPIRED: 'Tu sesión ha expirado',
  INVALID_CREDENTIALS: 'Credenciales inválidas'
};
```

### Success Messages
```javascript
export const SUCCESS_MESSAGES = {
  ORDER_CREATED: 'Orden creada exitosamente',
  USER_ADDED: 'Usuario agregado exitosamente',
  PASSWORD_RESET: 'Se ha enviado un enlace a tu correo',
  PROFILE_UPDATED: 'Perfil actualizado correctamente'
};
```

### Routes
```javascript
export const ROUTES = {
  HOME: '/',
  LOGIN: '/',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  FAQ: '/faq',
  CONTACT: '/contact'
};
```

### Breakpoints
```javascript
export const BREAKPOINTS = {
  XS: 480,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
};
```

### Colors (if not using tokens.js)
```javascript
export const COLORS = {
  PRIMARY: '#0075FF',
  PRIMARY_LIGHT: '#E6F0FF',
  SECONDARY: '#FFB800',
  SUCCESS: '#16A34A',
  WARNING: '#FFC107',
  ERROR: '#DC2626',
  // ... more colors
};
```

## Usage Examples

### Importing Constants
```javascript
import { FAQ_DATA, ORDER_STATUS, PAGINATION } from '../constants';

// Use in component
const itemsPerPage = PAGINATION.ORDERS_PER_PAGE;
const pendingStatus = ORDER_STATUS.PENDING;
```

### Type Safety (Future)
```javascript
// With TypeScript
export enum OrderStatus {
  APPROVED = 'Aprobado',
  PENDING = 'Pendiente',
  REJECTED = 'Rechazado'
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'payments' | 'security' | 'account' | 'technical';
}
```

## Best Practices

### Naming Conventions
- Use UPPER_SNAKE_CASE for constants
- Group related constants in objects
- Use descriptive names

### Organization
- Group by feature or domain
- Keep related constants together
- Add JSDoc comments for complex values

### Maintenance
- Document all constants
- Update when requirements change
- Remove unused constants
- Keep values DRY (Don't Repeat Yourself)

## Benefits of Centralized Constants

1. **Single Source of Truth**: All values in one place
2. **Easy Updates**: Change once, apply everywhere
3. **Better Testing**: Mock constants easily
4. **Type Safety**: Can add TypeScript types
5. **Documentation**: Self-documenting code
6. **Consistency**: Ensures uniform values
7. **Maintainability**: Easier to find and update

## Migration Guide

### Moving Magic Numbers to Constants
```javascript
// Before
if (password.length < 8) { /* ... */ }

// After
import { VALIDATION } from '../constants';
if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) { /* ... */ }
```

### Extracting Repeated Strings
```javascript
// Before
const status = 'Aprobado';

// After
import { ORDER_STATUS } from '../constants';
const status = ORDER_STATUS.APPROVED;
```

## Future Enhancements

- [ ] Add TypeScript definitions
- [ ] Create environment-specific constants
- [ ] Add feature flags
- [ ] Implement A/B testing constants
- [ ] Add localization keys
- [ ] Create theme constants
- [ ] Add animation timing constants
- [ ] Define API response codes