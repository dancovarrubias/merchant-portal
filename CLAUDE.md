# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kueski Pay POS System - A point-of-sale (POS) application for order and transaction management with an integrated AI assistant named "Kike".

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router
- **UI**: React 19.1.0
- **Styling**: Tailwind CSS with custom design tokens
- **AI Integration**: OpenAI API for virtual assistant
- **Routing**: Next.js App Router with route groups

### Project Structure

The codebase uses a modular architecture with clear separation of concerns:

- **`app/`**: Next.js App Router pages and layouts
  - `(public)/`: Public routes (login, register, forgot-password)
  - `(dashboard)/`: Protected routes requiring authentication
  - `api/chat/`: Chat API endpoint for AI assistant

- **`src/components/`**: Reusable React components
  - `ui/`: Base UI components (30+ components including Button, Modal, Table, etc.)
  - `layout/`: Layout components (Sidebar, DashboardLayout, AuthLayout)
  - `dashboard/`: Dashboard-specific components (modals, drawers)
  - `assistant/`: Virtual assistant "Kike" components
  - `users/`: User management components

- **`src/hooks/`**: Custom React hooks
  - `useSemanticSearch`: Advanced semantic search with phonetic matching
  - `useChat`: Chat functionality for AI assistant
  - `useDebounce`: Debouncing utility
  - `useResizable`: Makes elements resizable and draggable

- **`src/lib/openai/`**: OpenAI integration
  - Assistant service, response cleaner, and configuration

### Key Features

1. **Semantic Search System**: Advanced search with Spanish phonetic support, fuzzy matching, and numeric approximation (±20% tolerance)

2. **Virtual Assistant (Kike)**: 
   - Fully integrated with OpenAI Assistant API
   - Resizable and draggable chat window (desktop)
   - No overlay - allows multitasking with background content
   - Markdown formatting with bullets, lists, and rich text
   - Conversation persistence via localStorage
   - Position/size persistence for chat window
   - Auto-clears conversation on logout

3. **Authentication**: Session-based auth using cookies (middleware.js handles route protection)

4. **Design System**: Centralized design tokens in `src/constants/designTokens.js`

### Path Aliases

The project uses path aliases configured in `jsconfig.json`:
- `@/` → `./src/`
- `@/components/` → `./src/components/`
- `@/hooks/` → `./src/hooks/`
- `@/utils/` → `./src/utils/`
- `@/constants/` → `./src/constants/`

### Middleware

Authentication middleware (`middleware.js`) protects dashboard routes and redirects:
- Public routes: `/`, `/register`, `/forgot-password`
- Protected routes: `/dashboard`, `/users`, `/faq`, `/contact`

### Component Patterns

- Components use functional React with hooks
- UI components are self-contained and reusable
- Layout components handle page structure and navigation
- Modal/Drawer components follow controlled component pattern

### State Management

- React hooks for local state
- No global state management library currently
- Session stored in cookies for authentication

### Styling Approach

- Tailwind CSS for utility-first styling
- Custom color palette and typography defined in `tailwind.config.js`
- Design tokens centralized for consistency
- Mobile-first responsive design

## Feature Documentation

Detailed documentation for each feature area is available in the following files:

- **Assistant (Kike)**: `src/components/assistant/ASSISTANT.md` - Virtual assistant implementation
- **Dashboard**: `src/components/dashboard/DASHBOARD.md` - Order management components
- **Layout System**: `src/components/layout/LAYOUT.md` - Application layout structure
- **UI Components**: `src/components/ui/UI.md` - Reusable UI component library
- **User Management**: `src/components/users/USERS.md` - User administration features
- **Custom Hooks**: `src/hooks/HOOKS.md` - Reusable React hooks including semantic search
- **OpenAI Integration**: `src/lib/openai/OPENAI.md` - AI assistant backend integration