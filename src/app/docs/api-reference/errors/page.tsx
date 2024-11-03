import { InteractiveCode } from "@/components/docs/interactive-code";

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Error Handling</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-lg text-muted-foreground">
            Memetica uses conventional HTTP response codes to indicate the success or failure of an API request. 
            Codes in the 2xx range indicate success, codes in the 4xx range indicate an error with the provided 
            information, and codes in the 5xx range indicate an error with our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Error Response Format</h2>
          <p className="text-lg text-muted-foreground mb-4">
            All API errors follow a consistent format:
          </p>
          <InteractiveCode 
            language="json"
            code={`{
  "error": {
    "type": "error_type",
    "message": "A human-readable message",
    "code": "specific_error_code",
    "param": "parameter_name"  // optional, included when relevant
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Errors</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Authentication Errors (401)</h3>
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
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Validation Errors (400)</h3>
              <InteractiveCode 
                language="json"
                code={`{
  "error": {
    "type": "invalid_request",
    "message": "Messages array is required and cannot be empty",
    "code": "invalid_parameter",
    "param": "messages"
  }
}`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Rate Limit Errors (429)</h3>
              <InteractiveCode 
                language="json"
                code={`{
  "error": {
    "type": "rate_limit_error",
    "message": "Rate limit exceeded. Please try again in 60 seconds.",
    "code": "rate_limit_exceeded"
  }
}`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Server Errors (500)</h3>
              <InteractiveCode 
                language="json"
                code={`{
  "error": {
    "type": "server_error",
    "message": "An unexpected error occurred",
    "code": "internal_error"
  }
}`}
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Error Handling Best Practices</h2>
          <div className="space-y-3">
            <p className="text-lg text-muted-foreground">When handling errors:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Always check the error type and code for programmatic handling</li>
              <li>Display the human-readable message to end users</li>
              <li>Implement retries with exponential backoff for rate limits</li>
              <li>Log unexpected server errors for debugging</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
} 