"use client";

import type { College } from "@/data/streams";

export default function CollegeDetailBox({ college }: { college: College }) {
  return (
    <div className="mt-4 p-6 rounded-2xl border hairline border-slate-200 bg-slate-50 shadow-sm">
      <h3 className="font-display text-lg font-bold text-ink-900 mb-4">
        {college.name}
      </h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 font-semibold w-24 shrink-0 mt-0.5">
            Official website
          </span>
          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-clay-900 font-medium underline underline-offset-4 hover:text-clay-700"
          >
            {college.website}
          </a>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 font-semibold w-24 shrink-0 mt-0.5">
            Famous for
          </span>
          <span className="text-ink-900 leading-relaxed">
            {college.famousFor ?? "Strong academics and graduate outcomes."}
          </span>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 font-semibold w-24 shrink-0 mt-0.5">
            Location
          </span>
          <span className="text-ink-900">{college.city}, {college.state}</span>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 font-semibold w-24 shrink-0 mt-0.5">
            Fees
          </span>
          <span className="text-ink-900 font-semibold">{college.fees}</span>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 font-semibold w-24 shrink-0 mt-0.5">
            Entrance exam
          </span>
          <span className="text-ink-900 font-semibold">{college.exam}</span>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 font-semibold w-24 shrink-0 mt-0.5">
            Courses
          </span>
          <span className="text-ink-900">{college.courses.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}
