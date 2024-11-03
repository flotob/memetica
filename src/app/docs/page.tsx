import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Memetica API Documentation</h1>
      
      <p className="text-xl text-muted-foreground mb-8">
        Welcome to the Memetica API documentation. Learn how to integrate AI minds into your applications.
      </p>

      <div className="grid gap-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Start</h2>
          <div className="grid gap-4">
            <Link 
              href="/docs/authentication"
              className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
            >
              <h3 className="font-medium mb-1">Authentication</h3>
              <p className="text-sm text-muted-foreground">Get your API key and start making requests</p>
            </Link>

            <Link 
              href="/docs/api-reference/minds/chat"
              className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
            >
              <h3 className="font-medium mb-1">Chat API</h3>
              <p className="text-sm text-muted-foreground">Learn how to interact with minds via chat</p>
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Examples</h2>
          <div className="grid gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Basic Chat Request</h3>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`curl -X POST 'https://api.memeti.ca/v1/minds/mind-005/chat' \\
  -H 'Authorization: Bearer your_api_key' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 