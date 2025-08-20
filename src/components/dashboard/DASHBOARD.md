# Dashboard Components

## Overview
Dashboard-specific components for order management, transactions, and business operations in the Kueski Pay POS system.

## Components

### OrderDetailsDrawer.jsx
Drawer component for displaying detailed order information.
- **Status Badges**: Color-coded status indicators (Aprobado, Pendiente, Rechazado, etc.)
- **Order Sections**: Customer info, payment details, timeline
- **Actions**: Cancel order, view transaction details
- **Uses**: Drawer and DrawerSection UI components

### CreateOrderModal.jsx
Modal for creating new orders.
- **Form Fields**: Customer data, payment amount, description
- **Validation**: Required field checking
- **Integration**: Ready for backend API connection
- **Uses**: Modal and FormInput UI components

### StoreQRModal.jsx
Modal for displaying store QR code.
- **QR Display**: Shows store-specific QR code for payments
- **Store Info**: Store name and ID
- **Download Option**: Save QR code image
- **Uses**: Modal UI component

## State Management

Components use local React state with hooks:
- `useState` for form data and UI state
- `useEffect` for side effects
- Props for data passing from parent components

## Integration Points

### With UI Components
- Uses Drawer, Modal, Badge, Button from `src/components/ui/`
- Follows consistent design system

### With Parent Pages
Dashboard components are used in:
- `/app/(dashboard)/dashboard/page.jsx` - Main orders table
- `/app/(dashboard)/users/page.jsx` - User management

## Data Flow

```
Parent Page (dashboard/page.jsx)
    ↓ props (order data, callbacks)
Dashboard Component (OrderDetailsDrawer)
    ↓ uses
UI Components (Drawer, Badge, Button)
```

## Styling

- Uses Tailwind CSS classes
- Follows design tokens from `src/constants/designTokens.js`
- Responsive design with mobile-first approach

## Future Enhancements

- Real-time order updates via WebSocket
- Batch order processing
- Export functionality (PDF, Excel)
- Advanced filtering and search
- Order templates for recurring transactions