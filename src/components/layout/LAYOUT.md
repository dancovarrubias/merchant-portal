# Layout Components

## Overview
Layout components provide the structural foundation for different sections of the Kueski Pay POS application.

## Components

### DashboardLayout.jsx
Main layout wrapper for all dashboard pages.
- **Structure**: Flexbox container with sidebar support
- **Virtual Assistant**: Automatically includes Kike assistant
- **Props**: `children`, `isSidebarOpen`, `setIsSidebarOpen`
- **Background**: White background with full height

### Sidebar.jsx
Navigation sidebar for dashboard sections.
- **Navigation Items**: Dashboard, Users, FAQ, Contact
- **User Profile**: Shows current user info and logout
- **Responsive**: Collapsible on mobile devices
- **Active State**: Highlights current page
- **Icons**: Uses Icon component for visual indicators
- **Logout Functionality**: 
  - Clears session cookie
  - Removes chat history (localStorage `chatThreadId`)
  - Redirects to login page

### PageLayout.jsx
Generic page wrapper with consistent spacing and structure.
- **Header Section**: Title and optional actions
- **Content Area**: Main page content
- **Responsive Padding**: Adjusts for different screen sizes
- **Breadcrumbs Support**: Optional navigation trail

### AuthLayout.jsx
Layout for authentication pages (login, register, forgot password).
- **Split Design**: Left side branding, right side form
- **Kueski Branding**: Logo and tagline
- **Responsive**: Stacks vertically on mobile
- **Clean Background**: Gradient or solid color options

## Layout Hierarchy

```
App Layout (app/layout.jsx)
    ├── AuthLayout (public routes)
    │   ├── Login Page
    │   ├── Register Page
    │   └── Forgot Password Page
    └── DashboardLayout (protected routes)
        ├── Sidebar
        ├── PageLayout
        │   ├── Dashboard Page
        │   ├── Users Page
        │   ├── FAQ Page
        │   └── Contact Page
        └── VirtualAssistant (Kike)
```

## Usage Examples

### Dashboard Pages
```jsx
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageLayout from '@/components/layout/PageLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageLayout title="Dashboard">
        {/* Page content */}
      </PageLayout>
    </DashboardLayout>
  );
}
```

### Auth Pages
```jsx
import AuthLayout from '@/components/layout/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout>
      {/* Login form */}
    </AuthLayout>
  );
}
```

## Responsive Behavior

### Mobile (< 768px)
- Sidebar: Overlay/drawer style
- Content: Full width with padding
- Navigation: Hamburger menu

### Tablet (768px - 1024px)
- Sidebar: Collapsible
- Content: Adjusted margins
- Navigation: Icon-only option

### Desktop (> 1024px)
- Sidebar: Fixed, full width
- Content: Maximum width container
- Navigation: Full labels and icons

## State Management

Layouts use React state for:
- Sidebar open/closed state
- Active navigation item
- User session data
- Responsive adjustments

## Integration with Middleware

Protected layouts work with `middleware.js` for authentication:
- Checks for session cookie
- Redirects to login if not authenticated
- Passes user data to layout components