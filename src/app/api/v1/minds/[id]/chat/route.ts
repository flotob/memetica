import { NextResponse } from "next/server";
import { ChatRequest, ApiError } from "@/types/api";
import { MockAgent } from "@/lib/mock-agent";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const apiKey = request.headers.get("Authorization")?.split(" ")[1];
    
    if (!apiKey) {
      return NextResponse.json(
        {
          error: {
            type: "authentication_error",
            message: "Missing API key",
            code: "auth_required"
          }
        } satisfies ApiError,
        { status: 401 }
      );
    }

    const body: ChatRequest = await request.json();
    
    if (!body.messages || body.messages.length === 0) {
      return NextResponse.json(
        {
          error: {
            type: "invalid_request",
            message: "Messages array is required and cannot be empty",
            param: "messages",
            code: "invalid_messages"
          }
        } satisfies ApiError,
        { status: 400 }
      );
    }

    const agent = new MockAgent(params.id, apiKey);
    
    if (body.options?.stream) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of agent.chatStream(body.messages, body.options)) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    const response = await agent.chat(body.messages, body.options);
    return NextResponse.json(response);

  } catch (error) {
    if (error.message === "Rate limit exceeded") {
      return NextResponse.json(
        {
          error: {
            type: "rate_limit_error",
            message: "Rate limit exceeded. Please try again in 60 seconds.",
            code: "rate_limit_exceeded"
          }
        } satisfies ApiError,
        { status: 429 }
      );
    }

    console.error("Error processing chat request:", error);
    return NextResponse.json(
      {
        error: {
          type: "server_error",
          message: "An unexpected error occurred",
          code: "internal_error"
        }
      } satisfies ApiError,
      { status: 500 }
    );
  }
} 