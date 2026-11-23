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
              className="flex items-center gap-2 p-2 rounded-2xl border hairline hover:bg-clay-100 text-sm font-sans transition-colors"
            >
              <Bot size={14} strokeWidth={2} aria-hidden />
              AI Counsellor
            </Link>
          </div>
        )}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center pt-20 pb-16 px-6">
        <p className="eyebrow mb-10 text-center">Choose your path after Class 12</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight text-ink-900 mb-12 text-center sm:text-6xl lg:text-7xl">
          What would you like to pursue?
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-xs sm:max-w-none">
          {CATEGORIES.map((cat) => {
            const stream = streams.find((s) => s.id === cat.streamId);
            return (
              <button
                key={cat.id}
                onClick={() => enterCategory(cat)}
                className="stream-card group"
                style={{ borderColor: cat.accent + "40" }}
              >
                <span className="icon-wrap" style={{ backgroundColor: cat.accent }}>
                  {cat.id === "med" && <span aria-hidden>🏥</span>}
                  {cat.id === "non-med" && <span aria-hidden>⚙️</span>}
                  {cat.id === "commerce" && <span aria-hidden>📊</span>}
                  {cat.id === "humanities" && <span aria-hidden>🎨</span>}
                </span>
                <span className="title">{cat.name}</span>
                <span className="tagline">{cat.tagline}</span>
                <span className="cta">
                  Click to explore <ArrowRight size={12} strokeWidth={2} className="inline ml-1 translate-y-0.5" aria-hidden />
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-14 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-300 text-center">
          Click any path to hear it and explore its degrees and top colleges
        </p>
      </main>
    </div>
  );
}
