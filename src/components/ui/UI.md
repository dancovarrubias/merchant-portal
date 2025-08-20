# UI Components Library

## Overview
A comprehensive set of 30+ reusable UI components following the Kueski Pay design system.

## Core Components

### Button.jsx
Versatile button component with multiple variants.
- **Variants**: primary, secondary, ghost, danger
- **Sizes**: sm, md, lg
- **States**: loading, disabled
- **Icons**: Leading and trailing icon support

### Modal.jsx
Flexible modal dialog component.
- **Variants**: default, chat, fullscreen
- **Animations**: Smooth fade-in/out
- **Accessibility**: Focus trap, ESC key support
- **Sizes**: sm, md, lg, xl, full

### Table.jsx
Data table with sorting and pagination.
- **Features**: Sortable columns, row selection
- **Responsive**: Horizontal scroll on mobile
- **Custom Cells**: Support for custom renderers
- **Empty State**: Configurable empty message

### Input.jsx / FormInput.jsx
Form input components with validation.
- **Types**: text, email, password, number, textarea
- **Validation**: Error states and messages
- **Icons**: Leading icons support
- **FormInput**: Includes label and error handling

### Drawer.jsx
Slide-out panel from the right.
- **Animation**: Smooth slide transition
- **Backdrop**: Click outside to close
- **Sizes**: sm, md, lg, full
- **Sections**: Use with DrawerSection for organization

### Badge.jsx
Status indicators and labels.
- **Variants**: success, warning, error, info, neutral
- **Sizes**: sm, md
- **Icons**: Optional icon support

### SearchInput.jsx
Specialized search input with icon.
- **Features**: Search icon, clear button
- **Debouncing**: Built-in debounce support
- **Placeholder**: Customizable

### Tabs.jsx
Tab navigation component.
- **Styles**: Underline, pills, bordered
- **Icons**: Tab icons support
- **Disabled**: Individual tab disable

### Pagination.jsx
Page navigation controls.
- **Features**: Previous/next, page numbers
- **Sizes**: Configurable page size
- **Info**: Shows current range

### Card.jsx
Container component with consistent styling.
- **Variants**: default, bordered, elevated
- **Sections**: Header, body, footer
- **Interactive**: Hover states available

## Specialized Components

### PinInput.jsx
Multi-digit PIN entry field.
- **Length**: Configurable digit count
- **Auto-advance**: Moves to next field
- **Masking**: Optional password mode

### Accordion.jsx / Collapsible.jsx
Expandable content sections.
- **Animation**: Smooth expand/collapse
- **Icons**: Chevron indicators
- **Multiple**: Allow multiple open sections

### EmptyState.jsx
Placeholder for empty content.
- **Icon**: Large centered icon
- **Message**: Primary and secondary text
- **Action**: Optional CTA button

### Icon.jsx
Icon wrapper component.
- **Library**: SVG icon support
- **Sizes**: xs, sm, md, lg, xl
- **Colors**: Inherit or custom

### Link.jsx
Navigation link component.
- **Integration**: Next.js Link wrapper
- **Styles**: Default, underline, button-like
- **External**: Target="_blank" support

## Design Tokens

All components use centralized design tokens from `src/constants/designTokens.js`:

```javascript
{
  colors: {
    primary: '#0075FF',
    background: {
      primary: '#F5F6FB',
      secondary: '#FFFFFF'
    },
    text: {
      primary: '#18223D',
      secondary: '#656B7C',
      tertiary: '#888EA0'
    },
    border: {
      default: '#B4BACA',
      light: '#EBEEF7'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  }
}
```

## Usage Examples

### Button
```jsx
<Button 
  variant="primary" 
  size="md"
  loading={isLoading}
  onClick={handleClick}
>
  Save Changes
</Button>
```

### Modal
```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure?</p>
  <Button onClick={confirm}>Confirm</Button>
</Modal>
```

### Table
```jsx
<Table
  data={orders}
  columns={[
    { key: 'id', label: 'Order ID', sortable: true },
    { key: 'status', label: 'Status', render: (val) => <Badge>{val}</Badge> }
  ]}
  onSort={handleSort}
/>
```

## Component Composition

Components are designed to work together:

```jsx
<Card>
  <div className="p-4">
    <h3>Order Details</h3>
    <Table data={items} columns={columns} />
    <div className="flex gap-2 mt-4">
      <Button variant="primary">Approve</Button>
      <Button variant="secondary">Cancel</Button>
    </div>
  </div>
</Card>
```

## Accessibility

All components follow WCAG 2.1 guidelines:
- Proper ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

## Performance

Components are optimized for performance:
- React.memo where appropriate
- Lazy loading for heavy components
- CSS-in-JS avoided for better performance
- Minimal re-renders through proper state management