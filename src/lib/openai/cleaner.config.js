/**
 * Configuration for Response Cleaner
 * Centralized configuration for cleaning OpenAI Assistant responses
 */

export const CLEANER_CONFIG = {
  // Default cleaning options
  default: {
    removeFileReferences: true,    // Remove 【22:0†file.docx】 patterns
    removeSandboxPaths: true,      // Remove (sandbox:/path) patterns
    removeKnowledgeRefs: true,     // Remove knowledge base references
    removeCitations: false,         // Keep [1], [2] citation markers
    trimExtraSpaces: false,        // Don't clean up spaces to preserve markdown
    preserveFormatting: true,      // Preserve paragraph breaks
    preserveCodeBlocks: true,      // Keep code blocks intact
    applyMarkdownFixes: false      // Don't fix markdown to preserve original formatting
  },

  // Strict cleaning - removes everything
  strict: {
    removeFileReferences: true,
    removeSandboxPaths: true,
    removeKnowledgeRefs: true,
    removeCitations: true,
    trimExtraSpaces: true,
    preserveFormatting: true,
    preserveCodeBlocks: true,
    applyMarkdownFixes: true
  },

  // Minimal cleaning - only removes file references
  minimal: {
    removeFileReferences: true,
    removeSandboxPaths: false,
    removeKnowledgeRefs: true,
    removeCitations: false,
    trimExtraSpaces: false,
    preserveFormatting: true,
    preserveCodeBlocks: true,
    applyMarkdownFixes: false
  },

  // Development mode - keeps everything for debugging
  development: {
    removeFileReferences: false,
    removeSandboxPaths: false,
    removeKnowledgeRefs: false,
    removeCitations: false,
    trimExtraSpaces: false,
    preserveFormatting: true,
    preserveCodeBlocks: true,
    applyMarkdownFixes: false
  }
};

/**
 * Get cleaner configuration based on environment
 * @returns {Object} Cleaner configuration
 */
export function getCleanerConfig() {
  const env = process.env.NODE_ENV || 'development';
  
  // In production, use default (clean) settings
  if (env === 'production') {
    return CLEANER_CONFIG.default;
  }
  
  // In development, you might want to see raw responses
  // Change this to 'development' if you want to see all references
  return CLEANER_CONFIG.default; // Using default even in dev for cleaner output
}

/**
 * Patterns that should be removed from responses
 */
export const REMOVAL_PATTERNS = {
  // File references: 【22:0†FAQ In-Store.docx】
  fileReferences: /【\d+:\d+†[^】]+】/g,
  
  // Knowledge base references: 【18:0†source】
  knowledgeRefs: /【.*?†.*?】/g,
  
  // Sandbox paths: (sandbox:/path/to/file)
  sandboxPaths: /\(sandbox:[^)]+\)/g,
  
  // Citation markers: [1], [2], etc.
  citations: /\[\d+\]/g,
  
  // Image references: ![image](sandbox:...)
  imageRefs: /!\[.*?\]\(sandbox:.*?\)/g,
  
  // Link references with sandbox: [text](sandbox:...)
  sandboxLinks: /\[.*?\]\(sandbox:.*?\)/g
};

/**
 * Common response issues and their fixes
 */
export const RESPONSE_FIXES = {
  // Multiple spaces
  multipleSpaces: {
    pattern: /\s+/g,
    replacement: ' '
  },
  
  // Multiple line breaks
  multipleLineBreaks: {
    pattern: /\n{3,}/g,
    replacement: '\n\n'
  },
  
  // Space before punctuation
  spaceBeforePunctuation: {
    pattern: /\s+([.,;:!?])/g,
    replacement: '$1'
  },
  
  // Missing space after punctuation
  missingSpaceAfterPunctuation: {
    pattern: /([.,;:!?])([A-Za-z])/g,
    replacement: '$1 $2'
  }
};