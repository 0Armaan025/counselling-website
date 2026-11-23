"use client";

import type { College } from "@/data/streams";

export default function CollegeDetailBox({ college }: { college: College }) {
  return (
    <div className="mt-3 p-4 rounded-xl border border-blue-200 bg-blue-50 shadow-sm">
      <h3 className="font-display text-sm font-semibold text-ink-900 mb-2">
        {college.name}
      </h3>
      <div className="space-y-2">
        <div className="flex items-start gap-2 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 w-20 shrink-0">
            Official website
          </span>
          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-clay-600 underline underline-offset-4 hover:text-clay-800"
          >
            {college.website}
          </a>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 w-20 shrink-0">
            Famous for
          </span>
          <span className="text-ink-700">
            {college.famousFor ?? "Strong academics and graduate outcomes."}
          </span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 w-20 shrink-0">
            Location
          </span>
          <span className="text-ink-700">{college.city}, {college.state}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 w-20 shrink-0">
            Fees
          </span>
          <span className="text-ink-700">{college.fees}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 w-20 shrink-0">
            Entrance exam
          </span>
          <span className="text-ink-700">{college.exam}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 w-20 shrink-0">
            Courses
          </span>
          <span className="text-ink-700">{college.courses.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}
