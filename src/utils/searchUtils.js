/**
 * Utilidades para búsqueda semántica avanzada
 */

/**
 * Mapa de errores ortográficos comunes en español
 */
const SPANISH_COMMON_MISTAKES = {
  // K por C/QU
  'k': ['c', 'qu'],
  'c': ['k', 's', 'z'],
  'qu': ['k', 'c'],
  
  // S/C/Z confusiones
  's': ['c', 'z'],
  'z': ['s', 'c'],
  
  // B/V confusiones
  'b': ['v'],
  'v': ['b'],
  
  // G/J confusiones
  'g': ['j'],
  'j': ['g'],
  
  // LL/Y confusiones
  'll': ['y'],
  'y': ['ll'],
  
  // H muda
  'h': [''],
  '': ['h'],
  
  // X confusiones
  'x': ['s', 'cc', 'cs'],
  'cc': ['x'],
  
  // RR/R
  'rr': ['r'],
  'r': ['rr'],
  
  // M/N antes de consonantes
  'mp': ['np'],
  'mb': ['nb'],
  'np': ['mp'],
  'nb': ['mb']
};

/**
 * Normaliza texto removiendo acentos y caracteres especiales
 */
export const normalizeText = (text) => {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remueve acentos
    .toLowerCase()
    .trim();
};

// Cache global para variaciones fonéticas con límite de tamaño
const phoneticVariationsCache = new Map();
const MAX_PHONETIC_CACHE_SIZE = 200; // Límite de entradas en el caché global

/**
 * Genera variaciones fonéticas de una palabra considerando errores comunes
 * OPTIMIZADO: Usa caché y limita variaciones, mejorado para búsquedas parciales
 */
export const generatePhoneticVariations = (word) => {
  // Verificar caché primero
  if (phoneticVariationsCache.has(word)) {
    return phoneticVariationsCache.get(word);
  }
  
  // Limpiar caché si excede el límite (FIFO)
  if (phoneticVariationsCache.size >= MAX_PHONETIC_CACHE_SIZE) {
    const firstKey = phoneticVariationsCache.keys().next().value;
    phoneticVariationsCache.delete(firstKey);
  }
  
  const normalized = normalizeText(word);
  const variations = new Set([normalized]);
  
  // Generar variaciones para palabras de cualquier longitud (ajustado para búsquedas parciales)
  if (word.length >= 2 && word.length <= 15) {
    // Mapeo extendido de errores comunes en español
    const commonMistakes = {
      'c': ['k', 's'],
      'k': ['c', 'qu'],
      'qu': ['k', 'c'],
      's': ['z', 'c'],
      'z': ['s'],
      'b': ['v'],
      'v': ['b'],
      'g': ['j'],
      'j': ['g'],
      'y': ['ll', 'i'],
      'll': ['y'],
      'h': [''],  // H muda
      'x': ['s']
    };
    
    // Generar variaciones para cada posible error
    Object.entries(commonMistakes).forEach(([mistake, corrections]) => {
      if (normalized.includes(mistake)) {
        corrections.forEach(correction => {
          // Generar variaciones para todas las ocurrencias
          let index = normalized.indexOf(mistake);
          while (index !== -1 && variations.size < 8) { // Aumentar límite para mejor cobertura
            const variant = normalized.substring(0, index) + 
                          correction + 
                          normalized.substring(index + mistake.length);
            variations.add(variant);
            
            // Buscar siguiente ocurrencia
            index = normalized.indexOf(mistake, index + 1);
          }
        });
      }
    });
    
    // Agregar variaciones especiales para patrones comunes
    // Por ejemplo: "codigo" -> "kod", "kodi", "kodig"
    if (normalized.startsWith('cod')) {
      variations.add('kod' + normalized.substring(3));
    }
    if (normalized.startsWith('kod')) {
      variations.add('cod' + normalized.substring(3));
    }
  }
  
  // Limitar a 8 variaciones y cachear
  const result = Array.from(variations).slice(0, 8);
  phoneticVariationsCache.set(word, result);
  return result;
};

/**
 * Compara dos palabras considerando variaciones fonéticas
 * Mejorado para manejar búsquedas parciales e incrementales
 */
export const phoneticMatch = (word1, word2, threshold = 0.8) => {
  const normalized1 = normalizeText(word1);
  const normalized2 = normalizeText(word2);
  
  // Verificación rápida de prefijo directo
  if (normalized2.startsWith(normalized1) || normalized1.startsWith(normalized2)) {
    return true;
  }
  
  const variations1 = generatePhoneticVariations(word1);
  const variations2 = generatePhoneticVariations(word2);
  
  // Verificar coincidencia exacta o de prefijo entre variaciones
  for (const v1 of variations1) {
    for (const v2 of variations2) {
      // Coincidencia exacta
      if (v1 === v2) return true;
      
      // Verificar si una es prefijo de la otra (para búsquedas incrementales)
      if (v2.startsWith(v1) || v1.startsWith(v2)) {
        // Si la diferencia de longitud es razonable, considerarlo coincidencia
        const lengthDiff = Math.abs(v1.length - v2.length);
        if (lengthDiff <= 3) return true;
      }
      
      // Verificar similitud fuzzy entre variaciones
      const similarity = stringSimilarity(v1, v2);
      if (similarity >= threshold) return true;
    }
  }
  
  return false;
};

/**
 * Calcula la distancia de Levenshtein entre dos strings
 * Útil para búsqueda difusa
 * Optimizado para strings cortos
 */
export const levenshteinDistance = (str1, str2) => {
  const a = str1.toLowerCase();
  const b = str2.toLowerCase();
  
  // Optimización para casos triviales
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  // Limitar longitud para evitar cálculos costosos
  if (a.length > 50 || b.length > 50) {
    return Math.max(a.length, b.length);
  }
  
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitución
          matrix[i][j - 1] + 1,     // inserción
          matrix[i - 1][j] + 1      // eliminación
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

/**
 * Calcula similitud entre dos strings (0-1)
 */
export const stringSimilarity = (str1, str2) => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
};

/**
 * Extrae números de un string
 */
export const extractNumbers = (text) => {
  if (!text) return [];
  const matches = text.match(/[\d,]+\.?\d*/g);
  if (!matches) return [];
  
  return matches.map(match => {
    // Remueve comas y convierte a número
    const num = parseFloat(match.replace(/,/g, ''));
    return isNaN(num) ? null : num;
  }).filter(num => num !== null);
};

/**
 * Busca coincidencias numéricas aproximadas
 * Retorna true si el número buscado está dentro del rango de tolerancia
 */
export const fuzzyNumberMatch = (searchNum, targetNum, tolerance = 0.1) => {
  const diff = Math.abs(searchNum - targetNum);
  const percentDiff = diff / searchNum;
  return percentDiff <= tolerance;
};

/**
 * Tokeniza texto en palabras significativas
 */
export const tokenize = (text) => {
  const normalized = normalizeText(text);
  return normalized
    .split(/[\s,.\-_/]+/)
    .filter(word => word.length > 1);
};

/**
 * Verifica si un texto contiene una búsqueda parcial
 * considerando errores tipográficos y fonéticos
 */
export const fuzzyContains = (text, search, threshold = 0.8) => {
  const normalizedText = normalizeText(text);
  const normalizedSearch = normalizeText(search);
  
  // Primero intenta coincidencia exacta
  if (normalizedText.includes(normalizedSearch)) {
    return true;
  }
  
  // Luego intenta con cada palabra del texto
  const textWords = tokenize(text);
  const searchWords = tokenize(search);
  
  for (const searchWord of searchWords) {
    let found = false;
    
    for (const textWord of textWords) {
      // Si la palabra es muy corta, requiere coincidencia exacta o fonética
      if (searchWord.length <= 3) {
        if (textWord === searchWord || phoneticMatch(textWord, searchWord, 0.9)) {
          found = true;
          break;
        }
      } else {
        // Para palabras más largas, permite errores tipográficos y fonéticos
        const similarity = stringSimilarity(textWord, searchWord);
        if (similarity >= threshold || phoneticMatch(textWord, searchWord, threshold)) {
          found = true;
          break;
        }
      }
    }
    
    if (!found) return false;
  }
  
  return true;
};

/**
 * Busca coincidencias fonéticas en un texto completo
 * Mejorado para manejar búsquedas parciales e incrementales
 * Optimizado para evitar búsquedas excesivas
 */
export const findPhoneticMatches = (text, searchTerm) => {
  const textWords = tokenize(text);
  const searchWords = tokenize(searchTerm);
  const matches = [];
  const MAX_MATCHES = 20; // Límite de coincidencias
  
  searchWords.forEach(searchWord => {
    // Solo buscar si la palabra tiene longitud mínima
    if (searchWord.length >= 2 && matches.length < MAX_MATCHES) {
      textWords.forEach(textWord => {
        if (matches.length >= MAX_MATCHES) return; // Detener si alcanzamos el límite
        
        // Usar umbral más permisivo para palabras parciales
        const threshold = searchWord.length <= 4 ? 0.65 : 0.75;
        if (phoneticMatch(searchWord, textWord, threshold)) {
          matches.push({ searchWord, textWord, match: true });
        }
      });
    }
  });
  
  return matches;
};

/**
 * Expande el mapa semántico para incluir variaciones sin acentos
 * Optimizado para evitar duplicados y expansión excesiva
 */
export const expandSemanticMap = (semanticMap) => {
  const expanded = {};
  const MAX_EXPANSIONS = 50; // Límite de expansiones por término
  
  Object.entries(semanticMap).forEach(([key, values]) => {
    // Agrega la clave original y su versión normalizada
    const normalizedKey = normalizeText(key);
    
    // Combina valores para ambas versiones de la clave
    const allValues = new Set([
      ...values,
      ...values.map(v => normalizeText(v))
    ]);
    
    expanded[key] = Array.from(allValues);
    if (normalizedKey !== key) {
      expanded[normalizedKey] = Array.from(allValues);
    }
    
    // También agrega cada valor como clave (con límite)
    values.slice(0, MAX_EXPANSIONS).forEach(value => {
      const normalizedValue = normalizeText(value);
      if (!expanded[value]) {
        expanded[value] = [key, normalizedKey, ...values.slice(0, 10)]; // Limitar valores relacionados
      }
      if (normalizedValue !== value && !expanded[normalizedValue]) {
        expanded[normalizedValue] = [key, normalizedKey, ...values.slice(0, 10)];
      }
    });
  });
  
  return expanded;
};