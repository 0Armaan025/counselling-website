"use client";

import { Calendar, Clock, GraduationCap, Pin, FileText } from "lucide-react";
import { streams } from "@/data/streams";

type ExamEntry = {
  exam: string;
  month: string;
  streams: string[];
  icon: React.ElementType;
};

const EXAM_TIMELINE: ExamEntry[] = [
  {
    exam: "JEE Main",
    month: "January / April",
    streams: ["Science (PCM)"],
    icon: GraduationCap,
  },
  {
    exam: "JEE Advanced",
    month: "May / June",
    streams: ["Science (PCM)"],
    icon: GraduationCap,
  },
  {
    exam: "NEET-UG",
    month: "May",
    streams: ["Science (PCB)"],
    icon: Pin,
  },
  {
    exam: "CUET-UG",
    month: "May / June",
    streams: [
      "Science (PCM)",
      "Science (PCB)",
      "Commerce",
      "Arts & Humanities",
    ],
    icon: Calendar,
  },
  {
    exam: "CLAT",
    month: "December",
    streams: ["Law"],
    icon: FileText,
  },
  {
    exam: "AILET",
    month: "December",
    streams: ["Law"],
    icon: FileText,
  },
  {
    exam: "NID-DAT / UCEED / NIFT",
    month: "January / March",
    streams: ["Design"],
    icon: Clock,
  },
  {
    exam: "NCHMCT JEE",
    month: "April / May",
    streams: ["Hotel Management & Tourism"],
    icon: GraduationCap,
  },
  {
    exam: "NATA / JEE Main Paper 2",
    month: "April / July",
    streams: ["Architecture"],
    icon: Clock,
  },
];

function monthSortKey(m: string) {
  const order: Record<string, number> = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
  };
  const first = m.split("/")[0].trim();
  return order[first] ?? 99;
}

const sorted = [...EXAM_TIMELINE].sort((a, b) => monthSortKey(a.month) - monthSortKey(b.month));

export default function ExamTimeline() {
  return (
    <section className="border-t hairline mt-12 py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-paper-50">
            <Calendar size={16} strokeWidth={2} aria-hidden />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-1">
              <Calendar size={12} aria-hidden /> Entrance Exam Timeline
            </p>
            <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-50">
              Key exam windows for 2026–27
            </h3>
          </div>
        </div>

        <p className="mb-8 text-sm text-ink-500 dark:text-paper-300">
          Entrance-exam months are indicative and change every year — confirm on the official
          exam portal before applying.
        </p>

        <ol className="relative space-y-8 pl-8 border-l hairline">
          {sorted.map((entry, i) => (
            <li key={entry.exam} className="relative group">
              <span className="absolute -left-[10px] top-1.5 flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-2 border-ink-900 bg-paper-50 dark:border-paper-100 dark:bg-black/20" />
              <div className="mb-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
                  {entry.month}
                </p>
              </div>
              <div className="border border-ink-100 rounded-lg p-4 dark:border-white/10 dark:bg-black/5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-50">
                      {entry.exam}
                    </h4>
                    <p className="mt-1 text-sm text-ink-700 dark:text-paper-300">
                      For: {entry.streams.join(", ")}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 text-clay-600 dark:text-clay-500">
                    <entry.icon size={14} strokeWidth={1.75} aria-hidden />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
