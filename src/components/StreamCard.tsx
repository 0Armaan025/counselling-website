"use client";

import {
  ChevronDown,
  Clock,
  ClipboardList,
  ExternalLink,
  GraduationCap,
  Landmark,
  MapPin,
  Volume2,
} from "lucide-react";
import type { Stream } from "@/data/streams";
import { speak, speakCollege, speakStreamSummary } from "@/lib/speech";
import BookmarkButton from "./BookmarkButton";

export default function StreamCard({ stream }: { stream: Stream }) {
  return (
    <details
      className="group card"
      onToggle={(event) => {
        const target = event.currentTarget;
        if (target.open) speakStreamSummary(stream.name, stream.courses.map((c) => c.name));
      }}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 transition-colors hover:bg-paper-100/60 sm:p-6 dark:hover:bg-white/5 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start gap-4 sm:gap-6">
          <span className="pt-1 font-mono text-xs font-medium text-ink-300 dark:text-paper-300">
            {stream.index}
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink-900 sm:text-2xl dark:text-paper-50">
              {stream.name}
            </h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-500 dark:text-paper-300">
              {stream.tagline}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Courses in this stream">
              {stream.courses.map((course) => (
                <li
                  key={course.name}
                  className="border hairline px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 dark:text-paper-100"
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
          className="mt-1 shrink-0 text-ink-500 transition-transform duration-200 group-open:rotate-180 dark:text-paper-300"
        />
      </summary>

      <div className="grid gap-6 border-t hairline p-5 sm:grid-cols-[1.05fr_1fr] sm:p-6">
        <section aria-label={`Courses in ${stream.name}`}>
          <p className="eyebrow flex items-center gap-2">
            <ClipboardList size={12} aria-hidden /> Paths in this stream
          </p>
          <ul className="mt-3 divide-y hairline border hairline">
            {stream.courses.map((course) => (
              <li key={course.name} className="flex flex-wrap items-center justify-between gap-2 bg-paper-50 p-3 dark:bg-black/10">
                <div>
                  <p className="text-sm font-semibold text-ink-900 dark:text-paper-50">{course.name}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink-500 dark:text-paper-300">
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
          <p className="eyebrow flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <Landmark size={12} aria-hidden /> Best colleges in India
            </span>
            <button
              type="button"
              onClick={() => stream.colleges.forEach((c, i) => window.setTimeout(() => speak(c.name), i * 1800))}
              aria-label="Read out the top colleges"
              title="Read out the top colleges"
              className="text-ink-500 transition-colors hover:text-clay-600 dark:text-paper-300 dark:hover:text-clay-500"
            >
              <Volume2 size={14} aria-hidden />
            </button>
          </p>
          <ol className="mt-3 divide-y hairline border hairline">
            {stream.colleges.map((college, position) => (
              <li key={college.name} className="flex items-start justify-between gap-3 p-3">
                <div className="min-w-0">
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-start gap-1.5 font-sans text-sm font-semibold leading-snug text-ink-900 underline-offset-4 hover:underline dark:text-paper-50"
                  >
                    {college.name}
                    <ExternalLink size={12} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-ink-300 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 dark:text-paper-300" />
                  </a>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-500 dark:text-paper-300">
                    <MapPin size={11} aria-hidden /> {college.city}, {college.state}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500 dark:text-paper-300">
                    {college.exam} · {college.fees}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="font-display text-xs font-semibold text-ink-300 dark:text-paper-300">
                    No. {position + 1}
                  </span>
                  <a
                    href={college.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-ink-900 px-2.5 py-1.5 font-sans text-[11px] font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-50 dark:border-paper-100 dark:text-paper-100 dark:hover:bg-paper-100 dark:hover:text-ink-900"
                  >
                    <GraduationCap size={12} aria-hidden /> Form
                  </a>
                  <button
                    type="button"
                    onClick={() => speakCollege(college.name, college.city, college.fees)}
                    aria-label={`Hear about ${college.name}`}
                    title={`Hear about ${college.name}`}
                    className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-500 transition-colors hover:text-clay-600 dark:text-paper-300 dark:hover:text-clay-500"
                  >
                    <Volume2 size={11} aria-hidden /> Hear
                  </button>
                  <BookmarkButton college={college} stream={stream.name} />
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </details>
  );
}
