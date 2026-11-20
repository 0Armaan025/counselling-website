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
      className="group card p-5 hover:shadow-lg hover:shadow-black/10 transition-all cursor-pointer block"
    >
      <div className="flex items-start gap-3">
        <div>
          <h3 className="font-sans text-lg font-semibold text-ink-900 dark:text-paper-50 group-hover:text-clay-600 dark:group-hover:text-clay-400">
            {college.name}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-paper-300 mt-1">
            {college.city}, {college.state}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-paper-300 mt-1">
            Fees: {college.fees}
          </p>
        </div>
      </div>
      <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-clay-600 dark:text-clay-400">
        Open official website
      </span>
    </a>
  );
}
