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
    <section className="section" aria-labelledby="timeline-heading">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <div className="section-head">
          <span className="section-icon" aria-hidden>
            <Calendar size={16} strokeWidth={2} />
          </span>
          <div>
            <p className="eyebrow">Entrance Exam Timeline</p>
            <h3 id="timeline-heading" className="section-title">
              Key exam windows for <em className="italic text-indigo-700 font-medium">2026–27</em>
            </h3>
          </div>
        </div>

        <p className="-mt-4 mb-8 max-w-xl text-sm leading-relaxed text-slate-900">
          Entrance-exam months are indicative and change every year — confirm on the official
          exam portal before applying.
        </p>

        <ol className="relative space-y-6 border-l border-slate-200 pl-8">
          {sorted.map((entry) => (
            <li key={entry.exam} className="relative">
              <span className="absolute -left-[37px] top-[22px] h-2.5 w-2.5 shrink-0 bg-indigo-600" aria-hidden />
              <div className="card p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="label">{entry.month}</p>
                    <h4 className="mt-1 font-display text-lg font-semibold tracking-tight text-slate-900">
                      {entry.exam}
                    </h4>
                    <p className="mt-1 text-sm text-slate-900">
                      For: {entry.streams.join(", ")}
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center text-indigo-700 font-medium" aria-hidden>
                    <entry.icon size={15} strokeWidth={1.75} />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
