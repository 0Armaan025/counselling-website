"use client";

import { Layout, Sliders, Scale, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { streams } from "@/data/streams";

export default function StreamComparison() {
  const [left, setLeft] = useState<Stream | null>(streams[0]);
  const [right, setRight] = useState<Stream | null>(streams[1] ?? null);
  const [swapping, setSwapping] = useState(false);

  const swap = () => {
    setSwapping(true);
    setTimeout(() => {
      setLeft(right ?? null);
      setRight(left ?? null);
      setSwapping(false);
    }, 150);
  };

  if (!left || !right) return null;

  return (
    <section className="border-t hairline mt-12 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-paper-50">
            <Layout size={16} strokeWidth={2} aria-hidden />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-1">
              <Sliders size={12} aria-hidden /> Stream Comparison
            </p>
            <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-50">
              Compare two streams side by side
            </h3>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { label: "Stream A", stream: left, onChange: setLeft },
            { label: "Stream B", stream: right, onChange: setRight },
          ].map(({ label, stream, onChange }) => (
            <div key={label} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-paper-300">
                  {label}
                </p>
                <button
                  onClick={swap}
                  disabled={swapping}
                  className="ml-auto p-1 text-ink-400 hover:text-clay-600 dark:text-paper-400 dark:hover:text-clay-500"
                  aria-label="Swap streams"
                >
                  <ArrowLeft size={14} strokeWidth={2} aria-hidden />
                </button>
              </div>
              <select
                value={stream.id}
                onChange={(e) => {
                  const s = streams.find((x) => x.id === e.target.value);
                  if (s) onChange(s);
                }}
                className="border border-ink-200 rounded bg-paper-100 px-3 py-2 text-[11px] font-mono text-ink-900 focus:ring-0 dark:border-white/20 dark:bg-black/20 dark:text-paper-50"
              >
                {streams.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <div className="flex-1 border border-ink-100 rounded-lg p-4 dark:border-white/10 dark:bg-black/5 overflow-y-auto">
                <p className="eyebrow flex items-center gap-2">
                  <Scale size={12} aria-hidden /> {stream.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-paper-300">
                  {stream.tagline}
                </p>

                <div className="mt-4 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
                    Courses
                  </p>
                  <ul className="mt-1 space-y-1">
                    {stream.courses.map((c) => (
                      <li key={c.name} className="flex items-start justify-between gap-2 text-sm text-ink-900 dark:text-paper-50">
                        <span className="font-semibold">{c.name}</span>
                        <span className="text-[11px] text-ink-500 dark:text-paper-300">
                          {c.duration} · {c.exam}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
                    Top Colleges
                  </p>
                  <ul className="mt-1 space-y-1">
                    {stream.colleges.map((c, i) => (
                      <li key={c.name} className="flex items-start justify-between gap-2 text-sm text-ink-900 dark:text-paper-50">
                        <span className="font-semibold">{c.name}</span>
                        <span className="text-[11px] text-ink-500 dark:text-paper-300">
                          {c.city} · {c.fees}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Stream = (typeof streams)[number];
