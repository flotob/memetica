import Link from "next/link";
import { InteractiveCode } from "@/components/docs/interactive-code";

export default function AuthenticationPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Authentication</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">API Keys</h2>
          <p className="text-muted-foreground mb-4">
            All API requests require an API key for authentication. Your API key should be included in the Authorization header of each request.
          </p>
          <InteractiveCode 
            language="bash"
            code="Authorization: Bearer your_api_key_here"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Request</h2>
          <InteractiveCode 
            language="bash"
            code={`curl -X POST 'https://api.memeti.ca/v1/minds/mind-005/chat' \\
  -H 'Authorization: Bearer your_api_key_here' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`}
            endpoint="/api/v1/minds/mind-005/chat"
            method="POST"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Authentication Errors</h2>
          <p className="text-muted-foreground mb-4">
            If your API key is missing or invalid, you'll receive a 401 Unauthorized response:
          </p>
          <InteractiveCode 
            language="json"
            code={`{
  "error": {
    "type": "authentication_error",
    "message": "Invalid API key provided",
    "code": "invalid_api_key"
  }
}`}
          />
        </section>
      </div>
    </div>
  );
} 