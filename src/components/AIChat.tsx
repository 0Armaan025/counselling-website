"use client";

import { Bot, Send, Volume2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { speak } from "@/lib/speech";

type Message = { role: "user" | "assistant"; text: string };

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [spoken, setSpoken] = useState<Set<string>>(new Set());

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messages.length]);

  const addAssistant = useCallback((text: string) => {
    setMessages((prev) => [...prev, { role: "assistant", text }]);
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      addAssistant(
        "Hi! I'm your GuidePath counsellor. Ask me about streams, courses, colleges, exams, or fees — I'll answer only from our counselling data."
      );
    }
  }, [addAssistant]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to get a response");
      }
      const data = await res.json();
      addAssistant(data.reply || "I'm not sure how to answer that.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      addAssistant(
        "Sorry, I couldn't reach the counsellor right now. Make sure GEMINI_API_KEY is set in .env.local and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as unknown as React.FormEvent);
    }
  };

  const speakLast = () => {
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant") return;
    if (spoken.has(last.text)) return;
    setSpoken((prev) => {
      const next = new Set(prev);
      next.add(last.text);
      return next;
    });
    speak(last.text);
  };

  return (
    <section className="section" aria-labelledby="ai-chat-heading">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 md:py-16">
        <div className="section-head">
          <span className="section-icon" aria-hidden>
            <Bot size={16} strokeWidth={2} />
          </span>
          <div>
            <p className="eyebrow">AI Career Counsellor</p>
            <h3 id="ai-chat-heading" className="section-title !text-2xl sm:!text-3xl">
              Ask GuidePath anything
            </h3>
          </div>
        </div>

        <p className="-mt-4 mb-6 text-sm leading-relaxed text-ink-700">
          Answers come only from our counselling data — no made-up colleges or fees.
        </p>

        {/* Chat window */}
        <div className="card flex h-[380px] flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}
              >
                <div
                  className={`p-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-ink-900 text-ink-900"
                      : "border hairline text-ink-900"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "assistant" && (
                  <button
                    key="speak"
                    onClick={speakLast}
                    aria-label="Hear this answer"
                    className="mt-1.5 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-700 transition-colors hover:text-clay-800 hover:text-clay-700"
                  >
                    <Volume2 size={10} aria-hidden /> Hear
                  </button>
                )}
              </div>
            ))}
            {loading && (
              <div className="mr-auto max-w-[85%]">
                <div className="inline-block border hairline p-3 font-mono text-xs uppercase tracking-[0.14em] text-ink-700 animate-pulse">
                  Counsellor is typing…
                </div>
              </div>
            )}
            {error && (
              <div className="ml-auto max-w-[85%]">
                <div className="inline-block border border-clay-600/40 bg-clay-100 p-3 text-sm text-clay-800 bg-clay-600/10 text-clay-700">
                  {error}
                </div>
                <button
                  onClick={() => setError(null)}
                  className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-clay-800 underline underline-offset-2 hover:text-clay-700 text-clay-700"
                >
                  Dismiss
                </button>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSend} className="border-t hairline p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about streams, colleges, exams, fees…"
                disabled={loading}
                className="input min-w-0 flex-1"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center bg-ink-900 transition-colors hover:bg-clay-600 disabled:cursor-not-allowed disabled:opacity-50 text-ink-900 hover:bg-clay-500"
                aria-label="Send message"
              >
                <Send size={14} strokeWidth={2} aria-hidden />
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
          Powered by Gemini — set GEMINI_API_KEY in .env.local to enable
        </p>
      </div>
    </section>
  );
}
