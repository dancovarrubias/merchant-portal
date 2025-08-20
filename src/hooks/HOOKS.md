# Custom React Hooks

## Overview
Custom hooks that encapsulate reusable logic for the Kueski Pay POS system.

## Available Hooks

### useSemanticSearch
Advanced search hook with phonetic matching, fuzzy search, and semantic mapping for Spanish language.

#### Features
- **Phonetic Matching**: Handles Spanish phonetics (e.g., "kodi" finds "código")
- **Fuzzy Search**: Tolerates typos using Levenshtein distance
- **Numeric Search**: Approximate matching with ±20% tolerance
- **Semantic Mapping**: Maps related words and synonyms
- **Performance**: Debounced search, memoization, FIFO cache

#### Usage
```javascript
const {
  searchTerm,
  setSearchTerm,
  filteredItems,
  resultsCount,
  isSearching,
  isProcessing
} = useSemanticSearch(items, searchFields, semanticMap, options);
```

#### Options
```javascript
{
  scoreWeights: { field1: 3, field2: 1 },  // Field importance
  minScore: 0,                             // Minimum score threshold
  fuzzyThreshold: 0.8,                     // Fuzzy match sensitivity
  numberTolerance: 0.15,                   // ±15% for numbers
  enableFuzzy: true,                       // Enable fuzzy matching
  enableNumericSearch: true,               // Enable numeric approximation
  enablePartialPhonetic: true,             // Partial phonetic matching
  minPhoneticLength: 3                     // Min length for phonetics
}
```

### useChat
Manages virtual assistant chat functionality with message handling and UI state.

#### Features
- **Message Management**: Send, receive, store messages
- **Typing Indicators**: Simulated typing delays
- **Modal Control**: Open/close chat interface
- **Message Preview**: Show assistant responses when closed
- **Mock Responses**: Keyword-based responses (ready for OpenAI)

#### Usage
```javascript
const {
  messages,
  isTyping,
  isModalOpen,
  hasNewMessage,
  previewMessage,
  sendMessage,
  openChat,
  closeChat,
  clearChat
} = useChat();
```

#### Message Structure
```javascript
{
  id: number,
  text: string,
  isUser: boolean,
  timestamp: Date
}
```

### useDebounce
Debounces a value with configurable delay to optimize performance.

#### Features
- **Configurable Delay**: Default 500ms
- **Cleanup**: Proper timeout cleanup
- **Type-safe**: Works with any value type

#### Usage
```javascript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 200);

useEffect(() => {
  if (debouncedSearchTerm) {
    performSearch(debouncedSearchTerm);
  }
}, [debouncedSearchTerm]);
```

## Integration with Components

### Search Components
```javascript
// In OrdersTable
const { filteredItems, setSearchTerm } = useSemanticSearch(
  orders,
  ['id', 'customerName', 'status'],
  { 'aprobado': ['exitoso', 'completado'] }
);
```

### Chat Components
```javascript
// In VirtualAssistant
const chat = useChat();
return <ChatModal {...chat} />;
```

### Form Inputs
```javascript
// In SearchInput
const debouncedValue = useDebounce(inputValue, 300);
```

## Performance Considerations

### Cache Management
- **Search Cache**: 100 entries max, FIFO strategy
- **Phonetic Cache**: 200 entries max
- **Automatic Cleanup**: On component unmount

### Optimization Techniques
- Debounced inputs
- Memoized computations
- Early returns for empty searches
- Lazy evaluation where possible

## Testing Strategies

### Unit Tests
```javascript
describe('useSemanticSearch', () => {
  it('finds phonetic matches', () => {
    const items = [{ name: 'código' }];
    const { result } = renderHook(() => 
      useSemanticSearch(items, ['name'])
    );
    act(() => result.current.setSearchTerm('kodi'));
    expect(result.current.filteredItems).toHaveLength(1);
  });
});
```

### Integration Tests
```javascript
it('integrates with Table component', () => {
  render(<OrdersTable />);
  const searchInput = screen.getByPlaceholderText('Buscar...');
  fireEvent.change(searchInput, { target: { value: 'pendiente' } });
  expect(screen.getByText('Pendiente')).toBeInTheDocument();
});
```

## Future Enhancements

- useInfiniteScroll for pagination
- usePersistentState for localStorage
- useMediaQuery for responsive design
- useClickOutside for dropdowns
- useNotification for alerts
- useFormValidation for complex forms
- useWebSocket for real-time updates