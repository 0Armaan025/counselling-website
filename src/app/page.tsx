"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Bot } from "lucide-react";
import Link from "next/link";
import { speak } from "@/lib/speech";
import { streams } from "@/data/streams";

type Category = {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  streamId: string;
};

const CATEGORIES: Category[] = [
  {
    id: "med",
    name: "Medical",
    tagline: "Medicine, dentistry and health sciences",
    accent: "#14424A",
    streamId: "science-pcb",
  },
  {
    id: "non-med",
    name: "Non-Medical",
    tagline: "Engineering, technology and the hard sciences",
    accent: "#B34724",
    streamId: "science-pcm",
  },
  {
    id: "commerce",
    name: "Commerce",
    tagline: "Business, finance and accountancy",
    accent: "#C8552E",
    streamId: "commerce",
  },
  {
    id: "humanities",
    name: "Humanities",
    tagline: "Language, society, psychology and media",
    accent: "#6A1B9A",
    streamId: "arts-humanities",
  },
];

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const enterCategory = (cat: Category) => {
    const stream = streams.find((s) => s.id === cat.streamId);
    if (stream) {
      speak(
        `${stream.name}. The available courses are: ${stream.courses
          .map((c) => c.name)
          .join(", ")}.`,
      );
    }
    router.push(`/stream/${cat.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Left slide-down menu */}
      <div className="fixed left-4 top-24 z-40">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open menu"
          className="btn-ghost flex items-center gap-2 whitespace-nowrap"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider">menu</span>
          <ArrowRight
            size={14}
            strokeWidth={2}
            className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}
            aria-hidden
          />
        </button>
        {open && (
          <div className="mt-2 card p-3 w-48 shadow-lg shadow-black/10 animate-slide-down">
            <Link
              href="/chatbot"
              className="flex items-center gap-2 p-2 rounded border hairline hover:bg-clay-100 dark:hover:bg-white/5 text-sm font-sans transition-colors"
            >
              <Bot size={14} strokeWidth={2} aria-hidden />
              AI Counsellor
            </Link>
          </div>
        )}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-6">
        <p className="eyebrow mb-8 text-center">Choose your path after Class 12</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-paper-50 mb-12 text-center sm:text-5xl lg:text-6xl">
          What would you like to pursue?
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-xs sm:max-w-none">
          {CATEGORIES.map((cat) => {
            const stream = streams.find((s) => s.id === cat.streamId);
            return (
              <button
                key={cat.id}
                onClick={() => enterCategory(cat)}
                style={{
                  backgroundColor: cat.accent + "0f",
                  borderColor: cat.accent,
                }}
                className={`flex flex-col items-center gap-3 w-full sm:w-64 border hairline p-6 rounded-xl text-center transition-all hover:shadow-lg hover:shadow-black/10 group`}
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: cat.accent + "20",
                    color: cat.accent,
                  }}
                >
                  {cat.id === "med" && <span aria-hidden>🏥</span>}
                  {cat.id === "non-med" && <span aria-hidden>⚙️</span>}
                  {cat.id === "commerce" && <span aria-hidden>📊</span>}
                  {cat.id === "humanities" && <span aria-hidden>🎨</span>}
                </span>
                <span className="font-display text-xl font-semibold text-ink-900 dark:text-paper-50">
                  {cat.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-paper-300">
                  {cat.tagline}
                </span>
                <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-clay-600 dark:text-clay-500 group-hover:text-clay-800 dark:group-hover:text-clay-400">
                  Click to explore <ArrowRight size={12} strokeWidth={2} className="inline ml-1 translate-y-0.5" aria-hidden />
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 dark:text-paper-400 text-center">
          Click any path to hear it and explore its degrees and top colleges
        </p>
      </main>
    </div>
  );
}
