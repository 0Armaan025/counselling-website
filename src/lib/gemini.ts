import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export function getGeminiModel() {
  if (!genAI) {
    throw new Error("GEMINI_API_KEY is not set. Add it to .env.local");
  }
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

export function isGeminiConfigured() {
  return Boolean(genAI);
}
