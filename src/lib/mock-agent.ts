import { ChatMessage, ChatRequestOptions, ChatResponse } from "@/types/api";

const MOCK_DELAY = 500; // Simulate network latency
const RATE_LIMIT = 60; // Requests per minute
const rateLimit = new Map<string, number>(); // Track requests per API key

export class MockAgent {
  private mindId: string;
  private apiKey: string;

  constructor(mindId: string, apiKey: string) {
    this.mindId = mindId;
    this.apiKey = apiKey;
  }

  private checkRateLimit() {
    const now = Date.now();
    const requests = rateLimit.get(this.apiKey) || 0;
    
    if (requests >= RATE_LIMIT) {
      throw new Error("Rate limit exceeded");
    }
    
    rateLimit.set(this.apiKey, requests + 1);
    setTimeout(() => {
      rateLimit.set(this.apiKey, (rateLimit.get(this.apiKey) || 1) - 1);
    }, 60000); // Reset after 1 minute
  }

  private async generateResponse(messages: ChatMessage[], options?: ChatRequestOptions): Promise<ChatResponse> {
    // Simple mock responses based on the last user message
    const lastMessage = messages[messages.length - 1];
    let response = "I'm a mock agent. ";

    if (lastMessage.content.toLowerCase().includes("hello")) {
      response += "Hello! How can I help you today?";
    } else if (lastMessage.content.toLowerCase().includes("help")) {
      response += "I'm here to assist you. What would you like to know?";
    } else {
      response += "I understand you're saying: " + lastMessage.content;
    }

    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    return {
      id: `msg_${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      mind_id: this.mindId,
      conversation_id: `conv_${Math.random().toString(36).substr(2, 9)}`,
      message: {
        role: "assistant",
        content: response
      },
      usage: {
        prompt_tokens: lastMessage.content.length,
        completion_tokens: response.length,
        total_tokens: lastMessage.content.length + response.length
      },
      finish_reason: "stop"
    };
  }

  async chat(messages: ChatMessage[], options?: ChatRequestOptions): Promise<ChatResponse> {
    this.checkRateLimit();
    return this.generateResponse(messages, options);
  }

  async *chatStream(messages: ChatMessage[], options?: ChatRequestOptions): AsyncGenerator<ChatResponse> {
    this.checkRateLimit();
    
    const response = await this.generateResponse(messages, options);
    const chunks = response.message.content.split(" ");
    
    for (const chunk of chunks) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulate streaming delay
      yield {
        ...response,
        message: {
          role: "assistant",
          content: chunk + " "
        }
      };
    }
  }
} 