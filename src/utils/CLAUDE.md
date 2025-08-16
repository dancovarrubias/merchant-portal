# Utils - Utility Functions

## searchUtils.js

Advanced search utilities for Spanish language with phonetic matching, fuzzy search, and numeric approximation.

### Core Functions

#### normalizeText(text)
Normalizes text for searching by removing accents and converting to lowercase.

```javascript
normalizeText('Código') // returns 'codigo'
normalizeText('María García') // returns 'maria garcia'
```

**Process:**
1. Converts to lowercase
2. Removes accents using NFD normalization
3. Removes non-alphanumeric characters (keeps spaces)

---

#### phoneticTransform(text)
Converts Spanish text to phonetic representation for matching similar-sounding words.

```javascript
phoneticTransform('código') // returns 'kodigo'
phoneticTransform('germán') // returns 'herman'
phoneticTransform('lluvia') // returns 'yuvia'
```

**Spanish Phonetic Rules:**
- 'v' → 'b' (v/b confusion)
- 'y' → 'll' (yeísmo)
- 'll' → 'y'
- 'c' → 'k' (before e, i)
- 'qu' → 'k'
- 'g' → 'j' (before e, i)
- 'h' → '' (silent h)
- 'z' → 's' (seseo)
- 'x' → 's' (simplified)
- 'ñ' → 'n' (simplified)

**Cache Management:**
- Max cache size: 200 entries
- FIFO eviction policy
- Persistent across searches

---

#### phoneticMatch(word1, word2)
Determines if two words match phonetically with partial matching support.

```javascript
phoneticMatch('kodi', 'codigo') // returns true
phoneticMatch('jerman', 'germán') // returns true
phoneticMatch('baca', 'vaca') // returns true
```

**Matching Rules:**
1. Exact phonetic match
2. Prefix matching (one starts with the other)
3. Length difference ≤ 3 characters for prefixes
4. Handles partial word matching

---

#### levenshteinDistance(str1, str2)
Calculates edit distance between two strings for fuzzy matching.

```javascript
levenshteinDistance('orden', 'ordne') // returns 2
levenshteinDistance('codigo', 'codig') // returns 1
```

**Algorithm:**
- Dynamic programming approach
- O(n*m) time complexity
- Case-insensitive comparison
- Used for typo tolerance

---

#### fuzzyMatch(str1, str2, threshold = 0.7)
Determines if two strings are similar enough based on edit distance.

```javascript
fuzzyMatch('orden', 'ordne', 0.7) // returns true
fuzzyMatch('codigo', 'xyz', 0.7) // returns false
```

**Threshold:**
- 1.0 = Exact match required
- 0.7 = 70% similarity (default)
- 0.5 = Very permissive

**Formula:**
```javascript
similarity = 1 - (distance / maxLength)
return similarity >= threshold
```

---

#### searchInText(searchTerm, text, options)
Main search function that combines all matching strategies.

```javascript
searchInText('kodi', 'El código de acceso', {
  fuzzyThreshold: 0.7,
  enableFuzzy: true,
  enablePartialPhonetic: true,
  minPhoneticLength: 3
})
// returns true
```

**Options:**
```javascript
{
  fuzzyThreshold: 0.7,         // Fuzzy match threshold
  enableFuzzy: true,           // Enable fuzzy matching
  enablePartialPhonetic: true, // Enable phonetic for partial words
  minPhoneticLength: 3         // Min length for phonetic matching
}
```

**Search Strategy:**
1. Exact match (normalized)
2. Contains match (substring)
3. Phonetic match (if ≥ minPhoneticLength)
4. Fuzzy match (if enabled)

---

#### numericApproximateMatch(searchNum, targetNum, tolerance = 0.2)
Matches numbers within a percentage tolerance.

```javascript
numericApproximateMatch(500, 520, 0.2) // returns true (within 20%)
numericApproximateMatch(100, 200, 0.2) // returns false (100% difference)
```

**Use Cases:**
- Price searches ("$500" finds $450-$550)
- ID searches with typos
- Quantity approximations

---

#### semanticSearch(searchTerm, text, semanticMap)
Expands search to include semantic variations.

```javascript
const map = {
  'pago': ['payment', 'cobro', 'abono'],
  'orden': ['pedido', 'order', 'compra']
};

semanticSearch('pago', 'Realizar payment', map) // returns true
```

**Features:**
- Bidirectional mapping
- Multiple synonyms support
- Context-aware searching

---

## Performance Characteristics

### Time Complexity
- `normalizeText`: O(n)
- `phoneticTransform`: O(n) with caching
- `levenshteinDistance`: O(n*m)
- `fuzzyMatch`: O(n*m)
- `searchInText`: O(n*m) worst case

### Space Complexity
- Phonetic cache: 200 entries max
- Search cache: 100 entries max (in hook)
- Memory cleaned on unmount

## Usage Examples

### Basic Search
```javascript
import { searchInText } from './utils/searchUtils';

const results = items.filter(item => 
  searchInText(searchTerm, item.name)
);
```

### Advanced Search with Options
```javascript
const options = {
  fuzzyThreshold: 0.65,
  enableFuzzy: true,
  enablePartialPhonetic: true,
  minPhoneticLength: 3
};

const results = items.filter(item => 
  searchInText(searchTerm, item.description, options)
);
```

### Numeric Search
```javascript
import { numericApproximateMatch } from './utils/searchUtils';

const searchAmount = 500;
const tolerance = 0.2; // 20%

const results = orders.filter(order => {
  const orderAmount = parseFloat(order.amount.replace('$', ''));
  return numericApproximateMatch(searchAmount, orderAmount, tolerance);
});
```

### Semantic Search
```javascript
import { semanticSearch } from './utils/searchUtils';

const semanticMap = {
  'aprobado': ['approved', 'exitoso', 'completado'],
  'rechazado': ['rejected', 'fallido', 'denegado']
};

const results = items.filter(item =>
  semanticSearch(searchTerm, item.status, semanticMap)
);
```

## Spanish Language Optimizations

### Handled Cases
1. **Accent Variations**: café/cafe, código/codigo
2. **Common Misspellings**: v/b, y/ll, c/s/z
3. **Phonetic Similarities**: germán/jerman, hacer/aser
4. **Regional Variations**: seseo, yeísmo
5. **Silent Letters**: h (hola/ola)

### Example Matches
```javascript
// These all return true
phoneticMatch('baca', 'vaca')      // b/v confusion
phoneticMatch('caza', 'casa')      // z/s confusion
phoneticMatch('ayer', 'aller')     // y/ll confusion
phoneticMatch('jente', 'gente')    // g/j confusion
phoneticMatch('ola', 'hola')       // silent h
```

## Cache Strategy

### Phonetic Cache
```javascript
const phoneticCache = new Map();
const MAX_PHONETIC_CACHE_SIZE = 200;

// FIFO eviction when limit reached
if (phoneticCache.size >= MAX_PHONETIC_CACHE_SIZE) {
  const firstKey = phoneticCache.keys().next().value;
  phoneticCache.delete(firstKey);
}
```

### Benefits
- Avoid recomputing phonetic transforms
- Faster subsequent searches
- Memory bounded (200 entries)
- Automatic cleanup

## Error Handling

### Null/Undefined Safety
```javascript
// All functions handle null/undefined gracefully
searchInText(null, 'text') // returns false
searchInText('term', null) // returns false
normalizeText(undefined) // returns ''
```

### Type Coercion
```javascript
// Numbers converted to strings
searchInText('123', 123) // works correctly
numericApproximateMatch('500', 500) // works correctly
```

## Testing

### Unit Test Examples
```javascript
describe('searchUtils', () => {
  test('phonetic matching', () => {
    expect(phoneticMatch('kodi', 'codigo')).toBe(true);
    expect(phoneticMatch('baca', 'vaca')).toBe(true);
  });
  
  test('fuzzy matching', () => {
    expect(fuzzyMatch('order', 'ordet', 0.7)).toBe(true);
    expect(fuzzyMatch('abc', 'xyz', 0.7)).toBe(false);
  });
  
  test('numeric approximation', () => {
    expect(numericApproximateMatch(100, 110, 0.2)).toBe(true);
    expect(numericApproximateMatch(100, 150, 0.2)).toBe(false);
  });
});
```

## Best Practices

### Configuration Guidelines
```javascript
// For general search
const generalOptions = {
  fuzzyThreshold: 0.7,
  enableFuzzy: true,
  enablePartialPhonetic: true,
  minPhoneticLength: 3
};

// For strict search (IDs, codes)
const strictOptions = {
  fuzzyThreshold: 0.9,
  enableFuzzy: false,
  enablePartialPhonetic: false
};

// For names/descriptions
const textOptions = {
  fuzzyThreshold: 0.65,
  enableFuzzy: true,
  enablePartialPhonetic: true,
  minPhoneticLength: 4
};
```

## Future Improvements

- [ ] Add n-gram matching for better partial matches
- [ ] Implement Soundex algorithm for English
- [ ] Add language detection
- [ ] Create custom Spanish stemmer
- [ ] Add search analytics
- [ ] Implement search suggestions
- [ ] Add regular expression support
- [ ] Create search query parser