'use client';

export function CodeBlock({ code, language }: { code: string, language: string }) {
  return (
    <div className="relative group">
      <pre className="bg-[#0d1117] rounded-lg p-4 font-mono text-gray-200 text-sm overflow-x-auto">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
      <button 
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-3 right-3 p-2 rounded-lg
          bg-gray-800/50 text-gray-400 hover:text-gray-200
          opacity-0 group-hover:opacity-100
          transition-all"
        aria-label="Copy code"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
} 