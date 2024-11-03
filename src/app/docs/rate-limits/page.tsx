import { InteractiveCode } from "@/components/docs/interactive-code";

export default function RateLimitsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Rate Limits</h1>
      
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-lg text-muted-foreground">
            To ensure fair usage and system stability, the Memetica API implements rate limiting on all endpoints.
            Rate limits are applied per API key and are reset every minute.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Limits</h2>
          <div className="grid gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-xl font-semibold mb-2">Chat Completions</h3>
              <p className="text-muted-foreground mb-2">60 requests per minute</p>
              <p className="text-sm text-muted-foreground">
                This limit applies to the <code className="text-sm">/v1/minds/:mind_id/chat</code> endpoint.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Rate Limit Headers</h2>
          <p className="text-lg text-muted-foreground">
            All API responses include headers that indicate your current rate limit status:
          </p>
          <InteractiveCode language="bash" code={`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1635724800`} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Rate Limit Errors</h2>
          <p className="text-lg text-muted-foreground">
            When you exceed the rate limit, you'll receive a 429 Too Many Requests response:
          </p>
          <InteractiveCode language="json" code={`{
  "error": {
    "type": "rate_limit_error",
    "message": "Rate limit exceeded. Please try again in 23 seconds.",
    "code": "rate_limit_exceeded"
  }
}`} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Best Practices</h2>
          <div className="space-y-3">
            <p className="text-lg text-muted-foreground">To handle rate limits gracefully:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Monitor the rate limit headers in your responses</li>
              <li>Implement exponential backoff when retrying requests</li>
              <li>Cache responses when possible</li>
              <li>Consider using streaming for real-time applications</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
} 