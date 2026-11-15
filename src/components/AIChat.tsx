"use client";

import { Bot, Send, X, MessageCircle, Volume2 } from "lucide-react";
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
    <section className="border-t hairline mt-12 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-paper-50">
            <Bot size={16} strokeWidth={2} aria-hidden />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-1">
              <MessageCircle size={12} aria-hidden /> AI Career Counsellor
            </p>
            <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-50">
              Ask GuidePath anything
            </h3>
          </div>
        </div>

        <p className="mb-6 text-sm text-ink-500 dark:text-paper-300">
          Answers come only from our counselling data — no made-up colleges or fees.
        </p>

        {/* Chat window */}
        <div
          className="flex h-[360px] flex-col border border-ink-100 rounded-lg bg-paper-50 dark:border-white/10 dark:bg-black/20 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] ${
                  m.role === "user"
                    ? "ml-auto text-left"
                    : "mr-auto text-left"
                }`}
              >
                <div
                  className={`inline-block rounded-lg p-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-ink-900 text-paper-50"
                      : "bg-paper-100 text-ink-900 dark:bg-white/10 dark:text-paper-50"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "assistant" && (
                  <button
                    key="speak"
                    onClick={speakLast}
                    aria-label="Hear this answer"
                    className="mt-1.5 inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] text-ink-400 hover:text-clay-600 dark:text-paper-400 dark:hover:text-clay-500"
                  >
                    <Volume2 size={10} aria-hidden /> Hear
                  </button>
                )}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] mr-auto text-left">
                <div className="inline-block rounded-lg p-3 bg-paper-100 text-ink-900 dark:bg-white/10 dark:text-paper-50 text-sm animate-pulse">
                  Typing…
                </div>
              </div>
            )}
            {error && (
              <div className="max-w-[85%] ml-auto text-left">
                <div className="inline-block rounded-lg p-3 bg-ink-900/50 border border-red-500/30 text-red-500 text-sm">
                  {error}
                </div>
                <button
                  onClick={() => setError(null)}
                  className="mt-1 text-[10px] underline underline-offset-2 text-red-500 hover:text-red-600"
                >
                  Dismiss
                </button>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="border-t border-ink-100 bg-paper-50 p-3 dark:border-white/10 dark:bg-black/20"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about streams, colleges, exams, fees…"
                disabled={loading}
                className="flex-1 min-w-0 bg-transparent border-none placeholder:text-ink-400 dark:placeholder:text-paper-400 text-sm text-ink-900 dark:text-paper-50 focus:ring-0 sm:px-3"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink-900 rounded bg-ink-900 text-paper-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-clay-600"
                aria-label="Send message"
              >
                <Send size={14} strokeWidth={2} aria-hidden />
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-paper-300">
          Powered by Gemini — set GEMINI_API_KEY in .env.local to enable
        </p>
      </div>
    </section>
  );
}
