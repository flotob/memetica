"use client";

import { useState, useRef } from "react";
import { CodeBlock } from "@/components/ui/code";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipboardIcon, CheckIcon, TimerIcon } from 'lucide-react';

interface PlaygroundProps {
  endpoint: string;
  method: string;
  defaultPayload: any;
}

export function ApiPlayground({ endpoint, method, defaultPayload }: PlaygroundProps) {
  const [apiKey, setApiKey] = useState("");
  const [payload, setPayload] = useState(JSON.stringify(defaultPayload, null, 2));
  const [response, setResponse] = useState<string | null>(null);
  const [streamingResponse, setStreamingResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [requestTime, setRequestTime] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const formatPayload = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(payload), null, 2);
      setPayload(formatted);
    } catch (err) {
      // Keep payload as is if it's invalid JSON
    }
  };

  const copyToClipboard = async () => {
    const textToCopy = `curl -X ${method} '${endpoint}' \\
  -H 'Authorization: Bearer ${apiKey}' \\
  -H 'Content-Type: application/json' \\
  -d '${payload}'`;

    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  async function handleStream() {
    const startTime = performance.now();
    setIsLoading(true);
    setError(null);
    setStreamingResponse("");
    setIsStreaming(true);

    try {
      const payloadObj = JSON.parse(payload);
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payloadObj,
          options: {
            ...payloadObj.options,
            stream: true
          }
        })
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            
            try {
              const parsed = JSON.parse(data);
              setStreamingResponse(prev => prev + (parsed.message.content || ""));
            } catch (e) {
              console.error("Failed to parse chunk:", data);
            }
          }
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setRequestTime(performance.now() - startTime);
    }
  }

  async function handleRequest() {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setStreamingResponse("");
    
    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: payload
      });
      
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 border rounded-lg p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Try it out</h3>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1 text-sm border rounded hover:bg-gray-50"
        >
          {isCopied ? (
            <><CheckIcon className="w-4 h-4" /> Copied!</>
          ) : (
            <><ClipboardIcon className="w-4 h-4" /> Copy as cURL</>
          )}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk_test_..."
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Request Body
          </label>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            rows={8}
            className="w-full p-2 font-mono text-sm border rounded-md bg-background"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRequest}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading && !isStreaming ? "Sending..." : "Send Request"}
          </button>

          <button
            onClick={handleStream}
            disabled={isLoading}
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 disabled:opacity-50"
          >
            {isStreaming ? "Streaming..." : "Stream Response"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      {streamingResponse && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Streaming Response</h4>
          <div className="p-4 border rounded-md bg-background font-mono text-sm whitespace-pre-wrap">
            {streamingResponse}
          </div>
        </div>
      )}

      {response && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Response</h4>
          <CodeBlock language="json">
            {response}
          </CodeBlock>
        </div>
      )}
    </div>
  );
} 