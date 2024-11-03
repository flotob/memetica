"use client";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 p-2 rounded-md hover:bg-muted-foreground/10"
      >
        Copy
      </button>
    </div>
  );
} 