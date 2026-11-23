"use client";

import { speak } from "@/lib/speech";
import type { College } from "@/data/streams";

interface ProgramCollegeCardProps {
  college: College;
}

export default function ProgramCollegeCard({
  college,
}: ProgramCollegeCardProps) {
  return (
    <article
      className="card p-5 rounded-xl shadow-sm transition-colors hover:border-clay-200"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 font-semibold">
        {college.city}, {college.state} &bull; {college.exam}
      </span>
      <h3 className="font-display text-lg font-bold tracking-tight text-ink-900 mt-1">
        {college.name}
      </h3>
      <div className="w-full grid grid-cols-2 gap-2 pt-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
          Fees
        </span>
        <span className="font-mono text-[11px] font-bold text-ink-900">{college.fees}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
          City
        </span>
        <span className="font-mono text-[11px] font-bold text-ink-900">{college.city}</span>
      </div>
      <a
        href={college.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block btn text-center text-sm"
      >
        Open official website
      </a>
      <p className="mt-3 text-sm text-ink-500 leading-relaxed">
        {college.famousFor ?? "Strong academics and graduate outcomes."}
      </p>
    </article>
  );
}
