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
      className="group card p-5 rounded-xl shadow-lg shadow-black/20 transition-all cursor-pointer border border-white/30 bg-royal-600 text-white flex flex-col items-start gap-4 block"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sun-500 font-bold">
        {college.city}, {college.state} &bull; {college.exam}
      </span>
      <h3 className="font-display text-xl font-bold tracking-tight text-white group-hover:text-sun-400 transition-colors">
        {college.name}
      </h3>
      <div className="w-full grid grid-cols-2 gap-2 pt-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
          Fees
        </span>
        <span className="font-mono text-[11px] font-bold text-white">{college.fees}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
          City
        </span>
        <span className="font-mono text-[11px] font-bold text-white">{college.city}</span>
      </div>
      <span className="bg-sun-500 text-ink-900 font-sans text-sm font-bold py-2 px-4 rounded tracking-wide">
        Open official website
      </span>
    </a>
  );
}
