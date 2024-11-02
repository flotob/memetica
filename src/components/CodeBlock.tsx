'use client';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative group">
      <pre className="bg-[#0d1117] rounded-lg p-4 overflow-x-auto">
        <code className={`language-${language} text-sm text-gray-300 font-mono`}>
          {code}
        </code>
      </pre>
      
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
        title="Copy to clipboard"
      >
        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      </button>
    </div>
  );
} 