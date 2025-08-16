# Hooks - Custom React Hooks

## Available Hooks

### useChat

Manages the virtual assistant chat functionality. Handles messages, typing indicators, and modal state.

```javascript
import useChat from './hooks/useChat';

const MyComponent = () => {
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
  
  return (
    <>
      <button onClick={openChat}>Open Chat</button>
      {messages.map(msg => (
        <div key={msg.id}>{msg.text}</div>
      ))}
    </>
  );
};
```

**State Properties:**
- `messages`: Array of message objects with id, text, isUser, timestamp
- `isTyping`: Boolean indicating if assistant is "typing"
- `isModalOpen`: Boolean for modal visibility
- `hasNewMessage`: Boolean for new message indicator
- `previewMessage`: String with preview text

**Methods:**
- `sendMessage(text)`: Send a message and get response
- `openChat()`: Open the chat modal
- `closeChat()`: Close the chat modal
- `clearChat()`: Clear all messages
- `setHasNewMessage(boolean)`: Control new message indicator
- `setPreviewMessage(string)`: Set preview text

**Mock Response Logic:**
- Keyword-based response selection
- Random delay between 1-2 seconds
- Categories: greeting, payment, transactions, help, default

**Future OpenAI Integration:**
```javascript
// Replace getAssistantResponse with:
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [/* ... */]
});
```

---

### useDebounce

Debounces a value with a specified delay. Useful for optimizing search inputs and preventing excessive API calls.

```javascript
import useDebounce from './hooks/useDebounce';

const MyComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  
  useEffect(() => {
    // This will only run 200ms after user stops typing
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
};
```

**Parameters:**
- `value`: Any value to debounce
- `delay`: Delay in milliseconds (default: 500ms)

**Returns:** Debounced value

**Use Cases:**
- Search inputs
- Auto-save features
- Resize event handlers
- Scroll event handlers

---

### useSemanticSearch

Advanced search hook with phonetic matching, fuzzy search, and semantic mapping capabilities. Optimized for Spanish language.

```javascript
import useSemanticSearch from './hooks/useSemanticSearch';

const MyComponent = () => {
  const semanticMap = {
    'aprobado': ['aprobada', 'exitoso', 'completado', 'pagado'],
    'pendiente': ['esperando', 'procesando', 'en proceso'],
    'codigo': ['code', 'clave', 'pin']
  };
  
  const {
    searchTerm,
    setSearchTerm,
    filteredItems,
    resultsCount,
    isSearching,
    isProcessing
  } = useSemanticSearch(
    items,
    searchFields,
    semanticMap,
    options
  );
};
```

**Parameters:**
1. `items` (Array): Array of objects to search through
2. `searchFields` (Array): Fields to search in each object
3. `semanticMap` (Object): Word mappings for semantic search
4. `options` (Object): Configuration options

**Options:**
```javascript
{
  scoreWeights: {
    'field1': 3,    // Higher weight = more important
    'field2': 2,
    'field3': 1
  },
  minScore: 0,                    // Minimum score to include result
  fuzzyThreshold: 0.7,            // Fuzzy match threshold (0-1)
  numberTolerance: 0.2,           // ±20% for numeric searches
  enableFuzzy: true,              // Enable fuzzy matching
  enableNumericSearch: true,      // Enable numeric approximation
  enablePartialPhonetic: true,    // Enable partial phonetic matching
  minPhoneticLength: 3,           // Min length for phonetic search
  debounceDelay: 200             // Debounce delay in ms
}
```

**Returns:**
```javascript
{
  searchTerm: string,           // Current search term
  setSearchTerm: function,      // Update search term
  filteredItems: array,         // Filtered results
  resultsCount: number,         // Number of results
  isSearching: boolean,         // True when search is active
  isProcessing: boolean        // True during processing
}
```

## Features

### Phonetic Matching
- Handles Spanish phonetics
- "kodi" finds "código"
- "jerman" finds "Germán"
- Partial word matching

### Fuzzy Search
- Levenshtein distance algorithm
- Configurable threshold
- Handles typos and misspellings
- "ordne" finds "orden"

### Numeric Search
- Approximate number matching
- Configurable tolerance (default ±20%)
- "$500" finds "$450" to "$550"
- Works with currency symbols

### Semantic Mapping
- Map related words
- "pagar" finds "pago", "cobro", "payment"
- Context-aware searching
- Customizable per use case

### Performance Optimizations
- Debounced search (200ms default)
- Memoized computations
- FIFO cache (100 entries max)
- Automatic cleanup on unmount
- Prevents memory leaks

## Cache Management

Both hooks implement intelligent caching:

### useSemanticSearch Cache
- **Size Limit**: 100 entries
- **Strategy**: FIFO (First In, First Out)
- **Phonetic Cache**: 200 entries
- **Cleanup**: Automatic on unmount

```javascript
// Cache structure
searchCache = {
  'search_term': [results],
  // ...up to 100 entries
}

phoneticCache = {
  'word': 'phonetic_representation',
  // ...up to 200 entries
}
```

## Common Patterns

### Search with Loading State
```javascript
const SearchComponent = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredItems, 
    isProcessing 
  } = useSemanticSearch(data, fields, map);
  
  return (
    <>
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        loading={isProcessing}
      />
      {filteredItems.map(item => (
        <ItemCard key={item.id} {...item} />
      ))}
    </>
  );
};
```

### Custom Debounce for API Calls
```javascript
const ApiSearchComponent = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (debouncedQuery) {
      fetch(`/api/search?q=${debouncedQuery}`)
        .then(res => res.json())
        .then(setResults);
    }
  }, [debouncedQuery]);
  
  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
};
```

### Multi-Field Search with Weights
```javascript
const ProductSearch = () => {
  const products = [
    { name: 'iPhone', brand: 'Apple', price: 999 },
    { name: 'Galaxy', brand: 'Samsung', price: 899 }
  ];
  
  const { filteredItems } = useSemanticSearch(
    products,
    ['name', 'brand'],
    {},
    {
      scoreWeights: {
        'name': 3,      // Name is most important
        'brand': 1      // Brand is less important
      }
    }
  );
};
```

## Performance Considerations

### useDebounce
- Cleans up timeout on value change
- Cleans up on unmount
- Minimal re-renders

### useSemanticSearch
- Debounces search internally
- Caches results to avoid recomputation
- Uses `useMemo` for expensive operations
- Implements early returns for empty searches
- Cleans up all resources on unmount

## Testing Strategies

### Unit Tests
```javascript
describe('useDebounce', () => {
  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 'initial' } }
    );
    
    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');
    
    await waitFor(() => {
      expect(result.current).toBe('updated');
    });
  });
});
```

### Integration Tests
```javascript
describe('useSemanticSearch', () => {
  it('should find phonetic matches', () => {
    const items = [{ name: 'código' }];
    const { result } = renderHook(() => 
      useSemanticSearch(items, ['name'], {})
    );
    
    act(() => {
      result.current.setSearchTerm('kodi');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
  });
});
```

## Troubleshooting

### Common Issues

1. **Search not finding results**
   - Check `fuzzyThreshold` (lower = more permissive)
   - Verify `searchFields` are correct
   - Check `minScore` setting

2. **Performance issues**
   - Increase `debounceDelay`
   - Reduce number of `searchFields`
   - Limit dataset size

3. **Memory leaks**
   - Ensure component unmounts properly
   - Check cache size limits
   - Verify cleanup functions run

## Future Enhancements

- [ ] Add support for regex patterns
- [ ] Implement search history
- [ ] Add more language support
- [ ] Create useInfiniteScroll hook
- [ ] Add usePersistentState hook
- [ ] Implement useMediaQuery hook
- [ ] Add useClickOutside hook
- [ ] Enhance useChat with conversation history
- [ ] Add useVoiceInput for voice commands
- [ ] Create useNotification hook for system alerts