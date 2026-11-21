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
    <a
      href={college.website}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        speak(
          `${college.name}, located in ${college.city}. Approximate fees: ${college.fees.replace(
            /≈/g,
            "approximately",
          )}.`,
        )
      }
      className="group card p-5 rounded-xl shadow-card hover:shadow-card transition-all cursor-pointer border border-white/30 flex flex-col items-start gap-4 block"
    >
      <div className="flex items-start gap-2 w-full">
        <span className="box-label text-clay-600">{college.city}, {college.state}</span>
      </div>
      <h3 className="box-title text-lg text-ink-900 group-hover:text-clay-600 transition-colors">
        {college.name}
      </h3>
      <div className="grid grid-cols-2 gap-3 w-full">
        <span className="label text-ink-500">Fees</span>
        <span className="font-mono text-[11px] font-bold text-ink-900">{college.fees}</span>
        <span className="label text-ink-500">Exam</span>
        <span className="font-mono text-[11px] font-bold text-ink-900">{college.exam}</span>
      </div>
      <span className="highlight-pill">
        Open official website
      </span>
    </a>
  );
}
