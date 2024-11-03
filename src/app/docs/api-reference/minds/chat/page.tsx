import { InteractiveCode } from "@/components/docs/interactive-code";

export default function ChatApiReference() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Chat API Reference</h1>
      
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Send a Message</h2>
          <p className="text-lg text-muted-foreground">
            Create a chat completion for the given mind and messages.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Endpoint</h2>
          <InteractiveCode 
            language="bash"
            code="POST /v1/minds/:mind_id/chat"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Request</h2>
          <InteractiveCode 
            language="json"
            code={`{
  "messages": [
    {
      "role": "user",
      "content": "Hello!"
    }
  ],
  "options": {
    "temperature": 0.7,
    "max_tokens": 1000
  }
}`}
          />

          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold">Example Request</h3>
            <InteractiveCode 
              language="bash"
              code={`curl -X POST 'https://api.memeti.ca/v1/minds/mind-005/chat' \\
  -H 'Authorization: Bearer your_api_key_here' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "options": {
      "temperature": 0.7,
      "max_tokens": 1000
    }
  }'`}
              endpoint="/api/v1/minds/mind-005/chat"
              method="POST"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Response</h2>
          <InteractiveCode 
            language="json"
            code={`{
  "id": "msg_abc123",
  "created_at": "2024-02-28T12:34:56Z",
  "mind_id": "mind-005",
  "conversation_id": "conv_xyz789",
  "message": {
    "role": "assistant",
    "content": "Hello! How can I help you today?"
  }
}`}
          />
        </section>
      </div>
    </div>
  );
} 