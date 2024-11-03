"use client";

interface CodeBlockProps {
  language?: string;
  filename?: string;
  children: string;
}

export function CodeBlock({ language = "bash", filename, children }: CodeBlockProps) {
  return (
    <div className="rounded-lg border bg-zinc-950 overflow-hidden">
      {filename && (
        <div className="border-b bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
          {filename}
        </div>
      )}
      <div className="group relative">
        <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
          <code>{children}</code>
        </pre>
        <button
          onClick={() => navigator.clipboard.writeText(children)}
          className="absolute right-4 top-4 rounded border border-zinc-700 px-2 py-1 text-xs 
                     text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 opacity-0 
                     group-hover:opacity-100 transition-opacity"
        >
          Copy
        </button>
      </div>
    </div>
  );
} 