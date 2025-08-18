/**
 * Response Cleaner Service
 * Cleans and formats OpenAI Assistant responses
 */

class ResponseCleaner {
  constructor() {
    // Pattern to match file references like 【22:0†FAQ In-Store.docx】
    this.fileReferencePattern = /【\d+:\d+†[^】]+】/g;
    
    // Pattern to match sandbox references like (sandbox:/path/to/file)
    this.sandboxPattern = /\(sandbox:[^)]+\)/g;
    
    // Pattern to match citation markers like [1], [2], etc.
    this.citationPattern = /\[\d+\]/g;
    
    // Pattern to match knowledge base references
    this.knowledgePattern = /\【.*?†.*?】/g;
  }

  /**
   * Clean the response from OpenAI Assistant
   * @param {string} text - The raw response text
   * @param {Object} options - Cleaning options
   * @returns {string} - Cleaned text
   */
  clean(text, options = {}) {
    const {
      removeFileReferences = true,
      removeSandboxPaths = true,
      removeCitations = false,
      removeKnowledgeRefs = true,
      trimExtraSpaces = true,
      preserveFormatting = true
    } = options;

    let cleanedText = text;

    // Remove file references
    if (removeFileReferences) {
      cleanedText = cleanedText.replace(this.fileReferencePattern, '');
    }

    // Remove knowledge base references
    if (removeKnowledgeRefs) {
      cleanedText = cleanedText.replace(this.knowledgePattern, '');
    }

    // Remove sandbox paths
    if (removeSandboxPaths) {
      cleanedText = cleanedText.replace(this.sandboxPattern, '');
    }

    // Remove citation markers (optional)
    if (removeCitations) {
      cleanedText = cleanedText.replace(this.citationPattern, '');
    }

    // Clean up extra spaces and line breaks
    if (trimExtraSpaces) {
      // Replace multiple spaces with single space
      cleanedText = cleanedText.replace(/\s+/g, ' ');
      
      // Replace multiple line breaks with double line break
      if (preserveFormatting) {
        cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n');
      }
      
      // Trim leading and trailing whitespace
      cleanedText = cleanedText.trim();
    }

    // Fix spacing around punctuation
    cleanedText = this.fixPunctuation(cleanedText);

    return cleanedText;
  }

  /**
   * Fix spacing around punctuation marks
   * @param {string} text - Text to fix
   * @returns {string} - Fixed text
   */
  fixPunctuation(text) {
    // Remove spaces before punctuation
    text = text.replace(/\s+([.,;:!?])/g, '$1');
    
    // Ensure space after punctuation (except at end of string)
    text = text.replace(/([.,;:!?])([A-Za-z])/g, '$1 $2');
    
    // Fix spacing around parentheses
    text = text.replace(/\s+\)/g, ')');
    text = text.replace(/\(\s+/g, '(');
    
    return text;
  }

  /**
   * Extract and clean code blocks from response
   * @param {string} text - Response text
   * @returns {Object} - Object with cleanedText and codeBlocks
   */
  extractCodeBlocks(text) {
    const codeBlocks = [];
    const codeBlockPattern = /```[\s\S]*?```/g;
    
    let cleanedText = text;
    let match;
    let index = 0;
    
    while ((match = codeBlockPattern.exec(text)) !== null) {
      codeBlocks.push({
        index: index++,
        content: match[0],
        language: this.detectLanguage(match[0])
      });
      
      // Replace with placeholder
      cleanedText = cleanedText.replace(match[0], `[CODE_BLOCK_${index - 1}]`);
    }
    
    // Clean the text
    cleanedText = this.clean(cleanedText);
    
    // Restore code blocks
    codeBlocks.forEach((block, i) => {
      cleanedText = cleanedText.replace(`[CODE_BLOCK_${i}]`, block.content);
    });
    
    return { cleanedText, codeBlocks };
  }

  /**
   * Detect programming language from code block
   * @param {string} codeBlock - Code block with ``` markers
   * @returns {string|null} - Detected language or null
   */
  detectLanguage(codeBlock) {
    const match = codeBlock.match(/```(\w+)/);
    return match ? match[1] : null;
  }

  /**
   * Apply markdown formatting fixes
   * @param {string} text - Text to format
   * @returns {string} - Formatted text
   */
  formatMarkdown(text) {
    // Fix bold markers
    text = text.replace(/\*\*\s+/g, '**');
    text = text.replace(/\s+\*\*/g, '**');
    
    // Fix italic markers
    text = text.replace(/\*\s+/g, '*');
    text = text.replace(/\s+\*/g, '*');
    
    // Fix heading spacing
    text = text.replace(/^#+\s*$/gm, '');
    text = text.replace(/^(#+)\s+/gm, '$1 ');
    
    // Fix list formatting
    text = text.replace(/^-\s+/gm, '- ');
    text = text.replace(/^\*\s+/gm, '* ');
    text = text.replace(/^\d+\.\s+/gm, (match) => match);
    
    return text;
  }

  /**
   * Process a complete response with all cleaning options
   * @param {string} text - Raw response text
   * @param {Object} config - Configuration object
   * @returns {string} - Fully processed text
   */
  process(text, config = {}) {
    const defaultConfig = {
      removeFileReferences: true,
      removeSandboxPaths: true,
      removeCitations: false,
      removeKnowledgeRefs: true,
      trimExtraSpaces: true,
      preserveFormatting: true,
      preserveCodeBlocks: true,
      applyMarkdownFixes: true
    };

    const finalConfig = { ...defaultConfig, ...config };

    let processedText = text;

    // Handle code blocks separately if needed
    if (finalConfig.preserveCodeBlocks) {
      const { cleanedText } = this.extractCodeBlocks(processedText);
      processedText = cleanedText;
    } else {
      processedText = this.clean(processedText, finalConfig);
    }

    // Apply markdown fixes if needed
    if (finalConfig.applyMarkdownFixes) {
      processedText = this.formatMarkdown(processedText);
    }

    return processedText;
  }
}

export default new ResponseCleaner();