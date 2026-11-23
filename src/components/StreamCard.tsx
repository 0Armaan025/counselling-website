"use client";

import { useState } from "react";
import {
  ChevronDown,
  Clock,
  ClipboardList,
  GraduationCap,
  Landmark,
  MapPin,
  Volume2,
} from "lucide-react";
import type { Stream } from "@/data/streams";
import { speak, speakCollege, speakStreamSummary } from "@/lib/speech";
import BookmarkButton from "./BookmarkButton";
import CollegeDetailBox from "./CollegeDetailBox";

export default function StreamCard({ stream }: { stream: Stream }) {
  const [openCollege, setOpenCollege] = useState<string | null>(null);
  return (
    <details
      className="group card"
      onToggle={(event) => {
        const target = event.currentTarget;
        if (target.open) speakStreamSummary(stream.name, stream.courses.map((c) => c.name));
      }}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6 transition-colors hover:bg-indigo-50 sm:p-8 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start gap-4 sm:gap-6">
          <span className="pt-1 font-mono text-xs font-semibold text-slate-900">
            {stream.index}
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl">
              {stream.name}
            </h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-700">
              {stream.tagline}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Courses in this stream">
              {stream.courses.map((course) => (
                <li
                  key={course.name}
                  className="border border-slate-200 px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase tracking-[0.14em] text-slate-700 font-semibold bg-slate-50"
                >
                  {course.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ChevronDown
          size={18}
          strokeWidth={1.75}
          aria-hidden
          className="mt-1 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>

      <div className="grid gap-8 border-t border-slate-200 p-6 sm:grid-cols-[1.05fr_1fr] sm:p-8">
        <section aria-label={`Courses in ${stream.name}`}>
          <div className="flex items-center gap-2 mb-6">
            <ClipboardList size={12} aria-hidden className="text-indigo-600" />
            <p className="eyebrow">Paths in this stream</p>
          </div>
          <ul className="divide-y border-slate-100 space-y-0">
            {stream.courses.map((course) => (
              <li key={course.name} className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-xl border border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{course.name}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold">
                    <Clock size={11} aria-hidden /> {course.duration}
                    <span aria-hidden>·</span>
                    {course.exam}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label={`Top colleges for ${stream.name}`}>
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Landmark size={12} aria-hidden className="text-indigo-600" />
              <p className="eyebrow">Best colleges in India</p>
            </div>
            <button
              type="button"
              onClick={() => stream.colleges.forEach((c, i) => window.setTimeout(() => speak(c.name), i * 1800))}
              aria-label="Read out the top colleges"
              title="Read out the top colleges"
              className="text-slate-600 font-semibold transition-colors hover:text-indigo-700"
            >
              <Volume2 size={14} aria-hidden />
            </button>
          </div>
          <ol className="divide-y border-slate-100 space-y-0">
            {stream.colleges.map((college, position) => (
              <li
                key={college.name}
                className="flex flex-col gap-2 p-4 rounded-xl border border-white bg-white transition-all hover:border-indigo-200 hover:shadow-md hover:shadow-slate-200/50 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenCollege(openCollege === college.name ? null : college.name)
                      }
                      aria-expanded={openCollege === college.name}
                      aria-label={openCollege === college.name ? `Hide details for ${college.name}` : `Show details for ${college.name}`}
                      className="flex items-start gap-1.5 font-display text-base font-bold text-slate-900 underline underline-offset-4 hover:text-indigo-600 transition-colors"
                    >
                      {college.name}
                    </button>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold">
                      <MapPin size={11} aria-hidden /> {college.city}, {college.state}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-600 font-semibold">
                      {college.exam} · {college.fees}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="font-display text-xs font-bold text-slate-900">
                      No. {position + 1}
                    </span>
                    <a
                      href={college.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-[11px] px-3 py-2"
                    >
                      <GraduationCap size={12} aria-hidden /> Form
                    </a>
                    <button
                      type="button"
                      onClick={() => speakCollege(college.name, college.city, college.fees)}
                      aria-label={`Hear about ${college.name}`}
                      title={`Hear about ${college.name}`}
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600 font-semibold transition-colors hover:text-indigo-700"
                    >
                      <Volume2 size={11} aria-hidden /> Hear
                    </button>
                    <BookmarkButton college={college} stream={stream.name} />
                  </div>
                </div>
                {openCollege === college.name && (
                  <CollegeDetailBox college={college} />
                )}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </details>
  );
}
