// Request Types
export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatRequestOptions {
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  system_prompt?: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  options?: ChatRequestOptions;
}

// Response Types
export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ChatResponse {
  id: string;
  created_at: string;
  mind_id: string;
  conversation_id: string;
  message: ChatMessage;
  usage: TokenUsage;
  finish_reason: "stop" | "length" | "content_filter";
}

// Error Types
export interface ApiError {
  error: {
    type: "invalid_request" | "authentication_error" | "rate_limit_error" | "server_error";
    message: string;
    param?: string;
    code: string;
  };
} 