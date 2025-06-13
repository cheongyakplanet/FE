'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  // Check if content contains markdown syntax
  const hasMarkdownSyntax = (text: string): boolean => {
    const markdownPatterns = [
      /^#{1,6}\s/m,           // Headers
      /\*\*.*\*\*/,           // Bold
      /\*.*\*/,               // Italic
      /~~.*~~/,               // Strikethrough
      /^\s*[\*\-\+]\s/m,      // Unordered lists
      /^\s*\d+\.\s/m,         // Ordered lists
      /\[.*\]\(.*\)/,         // Links
      /^\s*>/m,               // Blockquotes
      /`.*`/,                 // Inline code
      /```[\s\S]*?```/,       // Code blocks
      /^\s*\|.*\|/m,          // Tables
      /^---+$/m,              // Horizontal rules
    ];
    
    return markdownPatterns.some(pattern => pattern.test(text));
  };

  // If no markdown syntax detected, render as plain text with line breaks
  if (!hasMarkdownSyntax(content)) {
    return (
      <div className={`whitespace-pre-wrap ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <div 
      className={`prose prose-sm max-w-none prose-headings:mt-6 prose-headings:mb-4 prose-headings:font-bold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:leading-relaxed prose-p:mb-4 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto prose-ul:list-disc prose-ol:list-decimal prose-li:mb-1 prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:px-3 prose-th:py-2 prose-th:text-left prose-td:border prose-td:border-gray-300 prose-td:px-3 prose-td:py-2 ${className}`}
      data-color-mode="light"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom components for better styling
          h1: ({ children, ...props }: any) => (
            <h1 className="text-xl font-bold text-gray-900 mt-6 mb-4" {...props}>{children}</h1>
          ),
          h2: ({ children, ...props }: any) => (
            <h2 className="text-lg font-bold text-gray-900 mt-5 mb-3" {...props}>{children}</h2>
          ),
          h3: ({ children, ...props }: any) => (
            <h3 className="text-base font-bold text-gray-900 mt-4 mb-2" {...props}>{children}</h3>
          ),
          p: ({ children, ...props }: any) => (
            <p className="leading-relaxed mb-4 text-gray-700" {...props}>{children}</p>
          ),
          a: ({ href, children, ...props }: any) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
              {...props}
            >
              {children}
            </a>
          ),
          blockquote: ({ children, ...props }: any) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600" {...props}>
              {children}
            </blockquote>
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          ul: ({ children, ...props }: any) => (
            <ul className="list-disc list-inside mb-4 space-y-1" {...props}>{children}</ul>
          ),
          ol: ({ children, ...props }: any) => (
            <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>{children}</ol>
          ),
          li: ({ children, ...props }: any) => (
            <li className="text-gray-700" {...props}>{children}</li>
          ),
          table: ({ children, ...props }: any) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-gray-300" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }: any) => (
            <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-semibold" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }: any) => (
            <td className="border border-gray-300 px-3 py-2" {...props}>{children}</td>
          ),
          hr: () => <hr className="my-6 border-gray-300" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}