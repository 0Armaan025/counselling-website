"use client";

import { Scale, ArrowLeft } from "lucide-react";
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
    <section className="section" aria-labelledby="comparison-heading">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="section-head">
          <span className="section-icon" aria-hidden>
            <Scale size={16} strokeWidth={2} />
          </span>
          <div>
            <p className="eyebrow">Stream Comparison</p>
            <h3 id="comparison-heading" className="section-title">
              Compare two streams <em className="italic text-indigo-700 font-medium">side by side</em>
            </h3>
          </div>
          <button
            onClick={swap}
            disabled={swapping}
            className="ml-auto hidden h-9 w-9 shrink-0 items-center justify-center border border-slate-200 text-slate-700 transition-all hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 disabled:opacity-50 sm:inline-flex active:scale-95 cursor-pointer"
            aria-label="Swap streams"
            title="Swap streams"
          >
            <ArrowLeft size={15} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { label: "Stream A", stream: left, onChange: setLeft },
            { label: "Stream B", stream: right, onChange: setRight },
          ].map(({ label, stream, onChange }) => (
            <div key={label} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-700 font-semibold">
                  {label}
                </p>
                <button
                  onClick={swap}
                  disabled={swapping}
                  className="inline-flex h-7 w-7 items-center justify-center border border-slate-200 text-slate-700 transition-all hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 disabled:opacity-50 sm:hidden active:scale-95 cursor-pointer"
                  aria-label="Swap streams"
                >
                  <ArrowLeft size={13} strokeWidth={2} aria-hidden />
                </button>
              </div>
              <select
                value={stream.id}
                onChange={(e) => {
                  const s = streams.find((x) => x.id === e.target.value);
                  if (s) onChange(s);
                }}
                className="input font-mono text-xs"
                aria-label={label}
              >
                {streams.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <div className="card flex-1 overflow-y-auto p-4 sm:p-5">
                <p className="font-display text-lg font-semibold tracking-tight text-slate-900">
                  {stream.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-900">
                  {stream.tagline}
                </p>

                <div className="mt-5">
                  <p className="label">Courses</p>
                  <ul className="mt-2 divide-y border-slate-100 space-y-0">
                    {stream.courses.map((c) => (
                      <li key={c.name} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                        <span className="font-semibold text-slate-900">{c.name}</span>
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-700 font-semibold">
                          {c.duration} · {c.exam}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <p className="label">Top Colleges</p>
                  <ul className="mt-2 divide-y border-slate-100 space-y-0">
                    {stream.colleges.map((c) => (
                      <li key={c.name} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                        <span className="font-semibold text-slate-900">{c.name}</span>
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-700 font-semibold">
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
