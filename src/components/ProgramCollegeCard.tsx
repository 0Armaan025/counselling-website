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
      className="card p-6 rounded-2xl shadow-sm transition-all hover:border-indigo-200 hover:shadow-md hover:shadow-slate-200/50"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-700 font-semibold">
        {college.city}, {college.state} &bull; {college.exam}
      </span>
      <h3 className="font-display text-lg font-bold tracking-tight text-slate-900 mt-1">
        {college.name}
      </h3>
      <div className="w-full grid grid-cols-2 gap-2 pt-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-700 font-semibold">
          Fees
        </span>
        <span className="font-mono text-[11px] font-bold text-slate-900">{college.fees}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-700 font-semibold">
          City
        </span>
        <span className="font-mono text-[11px] font-bold text-slate-900">{college.city}</span>
      </div>
      <a
        href={college.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block btn text-center text-sm"
      >
        Open official website
      </a>
      <p className="mt-4 text-sm text-slate-900 leading-relaxed">
        {college.famousFor ?? "Strong academics and graduate outcomes."}
      </p>
    </article>
  );
}
