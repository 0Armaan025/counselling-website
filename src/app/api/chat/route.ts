import { NextResponse } from "next/server";
import { streams } from "@/data/streams";
import { getGeminiModel, isGeminiConfigured } from "@/lib/gemini";

const COUNSELLING_CONTEXT = `You are GuidePath, a career counsellor for Indian students after Class 12.
Answer questions ONLY using the counselling data below. Do not invent colleges, courses, fees, exams, or dates.
If a question cannot be answered from this data, say you don't have that information and suggest what IS available.

STREAMS DATA:
${JSON.stringify(streams, null, 2)}

RULES:
- Answer only from the data above.
- Keep answers short, helpful, and student-friendly.
- Mention stream names, courses, durations, exams, colleges, cities, states, fees, and form URLs only as listed.
- Never make up new colleges or courses.
- If asked about something not in the data, say so politely.`;

// Limit context length to avoid huge prompts
function truncateContext(ctx: string, maxChars = 12000): string {
  if (ctx.length <= maxChars) return ctx;
  return ctx.slice(0, maxChars) + "\n...[data truncated]";
}

export async function POST(req: Request) {
  if (!isGeminiConfigured()) {
    return NextResponse.json(
      { error: "Gemini API is not configured. Set GEMINI_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  let body: { message: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { message } = body;
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    const model = getGeminiModel();
    const fullPrompt = truncateContext(
      COUNSELLING_CONTEXT + "\n\nSTUDENT QUESTION: " + message
    );
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Gemini error: " + message }, { status: 500 });
  }
}
