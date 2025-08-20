# Users Components

## Overview
Components for user management functionality in the Kueski Pay POS system.

## Components

### UserDetailsDrawer.jsx
Drawer component for displaying detailed user information.

#### Features
- **User Information Display**: Name, email, phone, role
- **Status Management**: Active, Inactive, Suspended states with color-coded badges
- **Role Badges**: Administrator, Supervisor, Seller with distinct colors
- **Activity History**: Login times, recent actions
- **Actions**: Edit user, reset password, suspend/activate

#### Status Variants
```javascript
- Activo → success (green)
- Inactivo → expired (gray)
- Suspendido → error (red)
```

#### Role Variants
```javascript
- Administrador → primary (blue)
- Supervisor → secondary (purple)
- Vendedor → default (gray)
```

## Integration

### With Users Page
Used in `/app/(dashboard)/users/page.jsx` for user management:
```jsx
<UserDetailsDrawer
  isOpen={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  user={selectedUser}
/>
```

### With UI Components
- Uses Drawer for slide-out panel
- Uses Badge for status/role indicators
- Uses DrawerSection for content organization
- Uses Button for actions

## Data Structure

Expected user object format:
```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "+52 555 123 4567",
  role: "Administrador",
  status: "Activo",
  lastLogin: "2024-01-15 10:30",
  createdAt: "2023-12-01",
  permissions: ["orders", "users", "reports"],
  activity: [
    { action: "Login", timestamp: "2024-01-15 10:30" },
    { action: "Created order", timestamp: "2024-01-15 10:45" }
  ]
}
```

## State Management

Components use local state for:
- Drawer open/close state
- Selected user data
- Edit mode toggle
- Loading states

## Permissions System

Role-based access control:
- **Administrador**: Full access to all features
- **Supervisor**: View and manage orders, limited user access
- **Vendedor**: Create and view own orders only

## Future Enhancements

- Bulk user operations
- User import/export (CSV, Excel)
- Advanced permission customization
- Activity audit logs
- Two-factor authentication setup
- Profile picture upload
- User groups and teams