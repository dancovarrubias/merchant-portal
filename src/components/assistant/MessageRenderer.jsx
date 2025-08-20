import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * MessageRenderer Component
 * Renders message content with markdown support and custom styling
 */
const MessageRenderer = ({ content, isUser }) => {
  // User messages are plain text, assistant messages support markdown
  if (isUser) {
    return <p className="text-sm whitespace-pre-wrap break-words">{content}</p>;
  }

  return (
    <div className="markdown-content text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        // Headings
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mb-3 mt-4 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold mb-2 mt-3 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-semibold mb-2 mt-2 first:mt-0">{children}</h3>
        ),
        
        // Paragraphs
        p: ({ children }) => (
          <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>
        ),
        
        // Lists
        ul: ({ children }) => (
          <ul className="mb-3 space-y-1.5 ml-1">{children}</ul>
        ),
        ol: ({ children, start }) => (
          <ol className="mb-3 space-y-1.5 ml-1 list-decimal list-inside" start={start}>
            {children}
          </ol>
        ),
        li: ({ children, ordered }) => {
          // For unordered lists, use custom bullet
          if (!ordered) {
            return (
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5 flex-shrink-0">•</span>
                <span className="flex-1">{children}</span>
              </li>
            );
          }
          // For ordered lists, use default numbering
          return (
            <li className="ml-2">
              <span className="inline-block align-top">{children}</span>
            </li>
          );
        },
        
        // Strong/Bold
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        
        // Emphasis/Italic
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),
        
        // Code
        code: ({ inline, children }) => {
          if (inline) {
            return (
              <code className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-xs font-mono">
                {children}
              </code>
            );
          }
          return (
            <code className="block p-3 bg-gray-100 text-gray-800 rounded-lg text-xs font-mono overflow-x-auto mb-3">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="mb-3 last:mb-0">{children}</pre>
        ),
        
        // Links
        a: ({ href, children }) => (
          <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            {children}
          </a>
        ),
        
        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 my-3 italic text-gray-700">
            {children}
          </blockquote>
        ),
        
        // Horizontal Rule
        hr: () => (
          <hr className="my-4 border-t border-gray-200" />
        ),
        
        // Tables (from GFM)
        table: ({ children }) => (
          <div className="overflow-x-auto mb-3">
            <table className="min-w-full divide-y divide-gray-200">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr>{children}</tr>
        ),
        th: ({ children }) => (
          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">
            {children}
          </td>
        ),
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MessageRenderer;