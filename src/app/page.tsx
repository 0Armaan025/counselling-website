"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
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
          <div className="mt-2 card p-3 w-48 shadow-card animate-slide-down">
            <Link
              href="/chatbot"
              className="flex items-center gap-2 p-2 rounded border border-white/30 hover:bg-white/10 text-sm font-sans transition-colors"
            >
              <span aria-hidden>🤖</span>
              AI Counsellor
            </Link>
          </div>
        )}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-6">
        <p className="eyebrow mb-8 text-center">Choose your path after Class 12</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink-900 dark:text-paper-50 mb-12 text-center sm:text-5xl lg:text-6xl">
          What would you like to pursue?
        </h1>
        <div className="grid gap-6 w-full max-w-7xl px-4">
          {CATEGORIES.map((cat) => {
            const stream = streams.find((s) => s.id === cat.streamId);
            return (
              <button
                key={cat.id}
                onClick={() => enterCategory(cat)}
                className="group card p-6 rounded-xl shadow-card hover:shadow-lg transition-all cursor-pointer border border-white/30 flex flex-col items-center gap-4 text-center"
              >
                <span
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl font-bold text-2xl"
                  style={{ backgroundColor: cat.accent + "1a", color: cat.accent }}
                >
                  {cat.id === "med" && <span aria-hidden>🏥</span>}
                  {cat.id === "non-med" && <span aria-hidden>⚙️</span>}
                  {cat.id === "commerce" && <span aria-hidden>📊</span>}
                  {cat.id === "humanities" && <span aria-hidden>🎨</span>}
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-ink-900">
                  {cat.name}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-600 leading-none">
                  {cat.tagline}
                </span>
                <span className="highlight-pill">
                  Click to explore <ArrowRight size={12} strokeWidth={2} className="inline ml-1 translate-y-0.5" aria-hidden />
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-12 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400 dark:text-paper-400 text-center">
          Click any path to hear it and explore its degrees and top colleges
        </p>
      </main>
    </div>
  );
}
