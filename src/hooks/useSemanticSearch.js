import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import useDebounce from './useDebounce';
import {
  normalizeText,
  extractNumbers,
  fuzzyNumberMatch,
  tokenize,
  fuzzyContains,
  expandSemanticMap,
  stringSimilarity,
  phoneticMatch,
  findPhoneticMatches,
  generatePhoneticVariations
} from '../utils/searchUtils';

/**
 * Hook para búsqueda semántica inteligente y reutilizable
 * @param {Array} items - Array de objetos a buscar
 * @param {Array} searchFields - Campos del objeto donde buscar
 * @param {Object} semanticMap - Mapa de sinónimos y términos relacionados
 * @param {Object} options - Opciones adicionales de búsqueda
 */
const useSemanticSearch = (
  items = [],
  searchFields = [],
  semanticMap = {},
  options = {}
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Debounce del término de búsqueda para mejorar rendimiento
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  
  // Cache de variaciones fonéticas con límite de tamaño para evitar memory leaks
  const phoneticCacheRef = useRef(new Map());
  const MAX_CACHE_SIZE = 100; // Límite de entradas en caché
  
  const {
    scoreWeights = {},
    minScore = 0,
    fuzzyThreshold = 0.8,
    numberTolerance = 0.15, // 15% de tolerancia para números
    enableFuzzy = true,
    enableNumericSearch = true,
    enablePartialPhonetic = true,  // Nueva opción para búsqueda fonética parcial
    minPhoneticLength = 3           // Longitud mínima para activar búsqueda fonética
  } = options;

  // Expande el mapa semántico para incluir variaciones sin acentos
  const expandedSemanticMap = useMemo(
    () => expandSemanticMap(semanticMap),
    [semanticMap]
  );

  // Función para obtener variaciones fonéticas con caché y límite de tamaño
  const getCachedPhoneticVariations = useCallback((word) => {
    const cache = phoneticCacheRef.current;
    
    if (cache.has(word)) {
      return cache.get(word);
    }
    
    // Limpiar caché si excede el límite
    if (cache.size >= MAX_CACHE_SIZE) {
      // Eliminar las primeras entradas (FIFO)
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    // Limitar variaciones para mejorar rendimiento
    const variations = word.length > 10 ? [normalizeText(word)] : generatePhoneticVariations(word).slice(0, 5);
    cache.set(word, variations);
    return variations;
  }, []);
  
  // Manejar el estado de procesamiento con useEffect para evitar loops infinitos
  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setIsProcessing(false);
    } else {
      setIsProcessing(true);
      // Marcar como no procesando después de un pequeño delay para indicar que terminó
      const timer = setTimeout(() => {
        setIsProcessing(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [debouncedSearchTerm]);
  
  const searchItems = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return items;
    }
    
    const normalizedQuery = normalizeText(debouncedSearchTerm);
    const queryWords = tokenize(debouncedSearchTerm);
    const queryNumbers = extractNumbers(debouncedSearchTerm);
    
    // Expandir términos con sinónimos
    const expandedTerms = new Set(queryWords);
    queryWords.forEach(word => {
      const normalizedWord = normalizeText(word);
      
      // Buscar en el mapa semántico expandido
      if (expandedSemanticMap[normalizedWord]) {
        expandedSemanticMap[normalizedWord].forEach(related => {
          expandedTerms.add(normalizeText(related));
        });
      }
    });
    
    // Calcular puntuación para cada item
    const scoredItems = items.map(item => {
      let score = 0;
      
      // Construir texto de búsqueda desde los campos especificados
      const fieldTexts = {};
      searchFields.forEach(field => {
        const fieldParts = field.split('.');
        let value = item;
        
        for (const part of fieldParts) {
          value = value?.[part];
          if (value === undefined || value === null) break;
        }
        
        fieldTexts[field] = value?.toString() || '';
      });
      
      const fullText = Object.values(fieldTexts).join(' ');
      const normalizedFullText = normalizeText(fullText);
      
      // 1. Coincidencia exacta de la query completa (máxima puntuación)
      if (normalizedFullText.includes(normalizedQuery)) {
        score += 20;
      }
      
      // 2. Búsqueda numérica aproximada
      if (enableNumericSearch && queryNumbers.length > 0) {
        const textNumbers = extractNumbers(fullText);
        
        queryNumbers.forEach(queryNum => {
          textNumbers.forEach(textNum => {
            if (fuzzyNumberMatch(queryNum, textNum, numberTolerance)) {
              // Mayor puntuación para coincidencias exactas
              const exactMatch = queryNum === textNum;
              score += exactMatch ? 15 : 10;
              
              // Bonus si el número está en un campo importante
              Object.entries(fieldTexts).forEach(([field, fieldText]) => {
                if (extractNumbers(fieldText).includes(textNum)) {
                  const weight = scoreWeights[field] || 1;
                  score += 3 * weight;
                }
              });
            }
          });
        });
      }
      
      // 3. Coincidencias de términos expandidos (con sinónimos)
      expandedTerms.forEach(term => {
        const normalizedTerm = normalizeText(term);
        
        if (normalizedFullText.includes(normalizedTerm)) {
          // Aplicar pesos por campo
          Object.entries(fieldTexts).forEach(([field, fieldText]) => {
            const normalizedFieldText = normalizeText(fieldText);
            
            if (normalizedFieldText.includes(normalizedTerm)) {
              const weight = scoreWeights[field] || 1;
              score += 5 * weight;
            }
          });
        }
      });
      
      // 4. Búsqueda difusa (fuzzy) y fonética para errores tipográficos y ortográficos
      if (enableFuzzy) {
        queryWords.forEach(queryWord => {
          const textWords = tokenize(fullText);
          
          textWords.forEach(textWord => {
            let matchScore = 0;
            const queryLen = queryWord.length;
            const textLen = textWord.length;
            
            // Búsqueda fonética mejorada para palabras parciales y completas
            if (enablePartialPhonetic && queryLen >= minPhoneticLength) {
              // Verificar coincidencia fonética completa
              if (phoneticMatch(queryWord, textWord, 0.75)) {
                matchScore = 5; // Puntuación alta para coincidencias fonéticas completas
              }
              // Verificar si la búsqueda es un prefijo fonético
              else if (textLen >= queryLen) {
                const textPrefix = textWord.substring(0, Math.min(queryLen + 2, textLen));
                if (phoneticMatch(queryWord, textPrefix, 0.70)) {
                  matchScore = 4; // Puntuación alta para prefijos fonéticos
                }
              }
            }
            
            // Búsqueda fuzzy tradicional como respaldo
            if (matchScore === 0 && queryLen >= 2) {
              const similarity = stringSimilarity(
                normalizeText(queryWord),
                normalizeText(textWord)
              );
              
              // Verificar coincidencia de prefijo
              const normalizedQuery = normalizeText(queryWord);
              const normalizedText = normalizeText(textWord);
              
              if (normalizedText.startsWith(normalizedQuery)) {
                matchScore = 3.5; // Puntuación alta para prefijos exactos
              } else if (similarity >= fuzzyThreshold && similarity < 1) {
                matchScore = 3 * similarity;
              }
            }
            
            if (matchScore > 0) {
              score += matchScore;
              
              // Bonus por campo importante
              Object.entries(fieldTexts).forEach(([field, fieldText]) => {
                const fieldWords = tokenize(fieldText);
                if (fieldWords.includes(textWord) || 
                    fieldWords.some(fw => phoneticMatch(fw, textWord, 0.8))) {
                  const weight = scoreWeights[field] || 1;
                  score += 2 * weight;
                }
              });
            }
          });
        });
      }
      
      // 5. Coincidencias parciales de palabras
      queryWords.forEach(word => {
        const normalizedWord = normalizeText(word);
        const regex = new RegExp(normalizedWord, 'gi');
        const matches = normalizedFullText.match(regex);
        
        if (matches) {
          score += matches.length * 0.5;
        }
      });
      
      // 6. Bonus por coincidencias en campos específicos
      Object.entries(fieldTexts).forEach(([field, fieldText]) => {
        const normalizedFieldText = normalizeText(fieldText);
        
        // Si el campo completo coincide con la búsqueda
        if (normalizedFieldText === normalizedQuery) {
          const weight = scoreWeights[field] || 1;
          score += 10 * weight;
        }
      });
      
      return { ...item, _searchScore: score };
    });
    
    // Filtrar y ordenar por puntuación
    const filtered = scoredItems
      .filter(item => item._searchScore > minScore)
      .sort((a, b) => b._searchScore - a._searchScore)
      .map(({ _searchScore, ...item }) => item);
    
    return filtered;
  }, [
    debouncedSearchTerm,
    items,
    searchFields,
    expandedSemanticMap,
    scoreWeights,
    minScore,
    fuzzyThreshold,
    numberTolerance,
    enableFuzzy,
    enableNumericSearch,
    enablePartialPhonetic,
    minPhoneticLength,
    getCachedPhoneticVariations
  ]);
  
  // Limpiar caché cuando el componente se desmonte
  useEffect(() => {
    return () => {
      phoneticCacheRef.current.clear();
    };
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems: searchItems,
    resultsCount: searchItems.length,
    isSearching: searchTerm.trim() !== '',
    isProcessing // Indica si está procesando la búsqueda
  };
};

export default useSemanticSearch;