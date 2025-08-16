# Kueski Pay POS System

Sistema de punto de venta (POS) para gestión de órdenes y transacciones.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 15.4.6 (App Router)
- **UI**: React 19.1.1
- **Estilos**: Tailwind CSS 3.x
- **Routing**: Next.js App Router
- **Estado**: React Hooks

## 📁 Estructura del Proyecto

```
mi-app-next/
├── app/                      # App Router de Next.js
│   ├── (public)/            # Rutas públicas (sin autenticación)
│   │   ├── register/        # Página de registro
│   │   └── forgot-password/ # Recuperación de contraseña
│   ├── (dashboard)/         # Rutas protegidas (requieren auth)
│   │   ├── dashboard/       # Panel principal de órdenes
│   │   ├── users/          # Gestión de usuarios
│   │   ├── faq/            # Preguntas frecuentes
│   │   └── contact/        # Página de contacto
│   ├── layout.jsx          # Layout raíz
│   ├── page.jsx            # Página de login (/)
│   └── globals.css         # Estilos globales
│
├── src/
│   ├── components/
│   │   ├── ui/            # Componentes base (Button, Input, Modal, etc.)
│   │   ├── layout/        # Layouts (Sidebar, PageLayout, AuthLayout, etc.)
│   │   ├── navigation/    # Componentes de navegación (NavLink)
│   │   ├── dashboard/     # Componentes del dashboard (Modals, Drawers)
│   │   ├── users/         # Componentes de usuarios (UserDetailsDrawer)
│   │   └── assistant/     # Asistente virtual Kike (Chat components)
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useSemanticSearch.js # Búsqueda semántica
│   │   ├── useDebounce.js      # Debouncing
│   │   └── useChat.js          # Chat del asistente
│   │
│   ├── utils/              # Funciones utilitarias
│   │   └── searchUtils.js  # Utilidades de búsqueda
│   │
│   └── constants/          # Constantes de la app
│       ├── chat.js         # Configuración del chat
│       ├── modalStates.js  # Estados de modales
│       └── designTokens.js # Design tokens (colores, espaciados, etc.)
│
├── public/                 # Assets estáticos
│   └── *.svg              # Iconos e imágenes
│
└── middleware.js          # Middleware de autenticación
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 🎨 Sistema de Diseño

El proyecto incluye un sistema de diseño completo con:

- **30+ componentes UI** reutilizables
- **Design tokens** centralizados
- **Layouts consistentes** para diferentes secciones
- **Componentes responsive** mobile-first

## 🔍 Características Principales

### Búsqueda Semántica Avanzada
- Búsqueda fonética en español
- Fuzzy search con tolerancia a errores
- Búsqueda numérica aproximada (±20%)
- Sistema de caché optimizado

### Asistente Virtual (Kike)
- Chat flotante draggable
- Respuestas contextuales
- Interfaz intuitiva

### Gestión de Órdenes
- Tabla con paginación
- Filtros y ordenamiento
- Vista detallada en drawer
- Creación de nuevas órdenes

### Gestión de Usuarios
- CRUD completo de usuarios
- Roles y permisos
- Estados de usuario
- Búsqueda avanzada

## 🔐 Autenticación

El proyecto usa un sistema de autenticación simple basado en cookies para desarrollo. En producción, esto debe ser reemplazado con JWT o un sistema de sesiones real.

## 📝 Documentación Adicional

Cada módulo principal tiene su propia documentación:

- [Design System](./src/components/design-system/CLAUDE.md)
- [Hooks](./src/hooks/CLAUDE.md)
- [Utils](./src/utils/CLAUDE.md)
- [Constants](./src/constants/CLAUDE.md)

## 🚦 Scripts Disponibles

```json
{
  "dev": "next dev",        // Desarrollo en http://localhost:3000
  "build": "next build",    // Build de producción
  "start": "next start",    // Servidor de producción
  "lint": "next lint"       // Linting del código
}
```

## 📄 Licencia

Proyecto privado - Todos los derechos reservados
