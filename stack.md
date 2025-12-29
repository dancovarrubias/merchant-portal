# Stack Tecnológico - Kueski Pay POS

## Framework Principal
- **Next.js** `v15.4.6`
  - App Router
  - Server Components
  - API Routes
  - Middleware para autenticación

## Frontend

### Librería UI
- **React** `v19.1.0`
- **React DOM** `v19.1.0`

### Routing
- **React Router DOM** `v7.8.1` (para navegación del lado del cliente adicional)

### Estilos
- **Tailwind CSS** `v3.4.17`
  - Configuración personalizada con design tokens
  - Paleta de colores customizada
  - Tipografía con Inter y DM Sans
  - Breakpoints responsivos (incluyendo xs: 475px)
- **PostCSS** `v8.5.6`
- **Autoprefixer** `v10.4.21`

## Integraciones

### Inteligencia Artificial
- **OpenAI** `v5.12.2`
  - Assistants API para el asistente virtual "Kike"
  - Chat completions

### Procesamiento de Markdown
- **React Markdown** `v10.1.0`
- **Remark GFM** `v4.0.1` (GitHub Flavored Markdown)

## Herramientas de Desarrollo

### Build & Development
- **Node.js** (requerido)
- **npm** (gestor de paquetes)

### Linting
- **ESLint** (configurado con Next.js)

### Scripts Disponibles
```bash
npm run dev    # Servidor de desarrollo en localhost:3000
npm run build  # Build de producción
npm start      # Servidor de producción
npm run lint   # Análisis de código
```

## Configuración del Proyecto

### Path Aliases
```json
{
  "@/": "./src/",
  "@/components/": "./src/components/",
  "@/hooks/": "./src/hooks/",
  "@/utils/": "./src/utils/",
  "@/constants/": "./src/constants/"
}
```

### Estructura de Directorios
```
/
├── app/                    # Next.js App Router
│   ├── (public)/          # Rutas públicas
│   ├── (dashboard)/       # Rutas protegidas
│   └── api/               # API routes
├── src/
│   ├── components/        # Componentes React
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Librerías e integraciones
│   ├── constants/        # Design tokens y constantes
│   └── utils/            # Funciones utilitarias
├── public/               # Archivos estáticos
└── middleware.js         # Middleware de autenticación
```

## Características Técnicas Clave

### Autenticación
- Basada en sesiones con cookies
- Middleware para protección de rutas
- Redirección automática para rutas protegidas

### Sistema de Búsqueda
- Búsqueda semántica avanzada
- Soporte fonético para español
- Fuzzy matching
- Tolerancia numérica (±20%)

### Asistente Virtual (Kike)
- Integración completa con OpenAI
- Ventana de chat redimensionable y arrastrable
- Persistencia de conversaciones en localStorage
- Formateo Markdown con soporte GFM
- Sin overlay - permite multitarea

### Optimizaciones
- Server-side rendering (SSR)
- Code splitting automático
- Optimización de imágenes con Next.js Image
- CSS utility-first con Tailwind

## Requisitos del Sistema

### Mínimos
- Node.js 18.17 o superior
- npm 9 o superior
- 4GB RAM
- Navegador moderno con soporte ES6+

### Recomendados
- Node.js 20+
- 8GB RAM
- SSD para desarrollo local

## Variables de Entorno

El proyecto requiere configuración de variables de entorno para:
- `OPENAI_API_KEY` - Clave API de OpenAI
- `OPENAI_ASSISTANT_ID` - ID del asistente de OpenAI (opcional)

## Versión del Proyecto
- **Versión actual**: `0.1.0`
- **Estado**: En desarrollo activo
- **Tipo**: Aplicación privada