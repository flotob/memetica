"use client";

import { useState } from "react";
import { ClipboardIcon, CheckIcon, PlayIcon } from "lucide-react";

interface InteractiveCodeProps {
  language: string;
  code: string;
  endpoint?: string;
  method?: string;
}

export function InteractiveCode({ language, code, endpoint, method }: InteractiveCodeProps) {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const isCurl = code && typeof code === 'string' && code.trim().toLowerCase().startsWith('curl');

  const executeRequest = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(endpoint!, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: code.match(/-d '(.+?)'/)?.[1] || ''
      });
      
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="relative group rounded-lg border bg-zinc-950">
      <div className="absolute right-3 top-3 flex gap-2">
        {isCurl && endpoint && (
          <button
            onClick={executeRequest}
            disabled={isLoading}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md 
                     hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 border-t-2 border-white rounded-full animate-spin" />
                Running...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <PlayIcon className="w-3 h-3" />
                Run
              </span>
            )}
          </button>
        )}
        
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 px-3 py-1.5 text-xs border border-zinc-700 
                   text-zinc-400 rounded-md hover:bg-zinc-700 hover:text-zinc-100"
        >
          {isCopied ? (
            <span className="flex items-center gap-1">
              <CheckIcon className="w-3 h-3" />
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <ClipboardIcon className="w-3 h-3" />
              Copy
            </span>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-100">
        <code>{code}</code>
      </pre>

      {error && (
        <div className="mt-2 p-4 border-l-4 border-red-500 bg-red-50/10">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {response && (
        <div className="mt-2 border-t border-zinc-800">
          <div className="p-4">
            <div className="text-sm font-medium text-zinc-400 mb-2">Response</div>
            <pre className="overflow-x-auto text-sm text-zinc-100">
              <code>{response}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
} 