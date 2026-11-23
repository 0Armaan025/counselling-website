"use client";

import { useRouter } from "next/navigation";
import { speak } from "@/lib/speech";
import type { Course } from "@/data/streams";

interface StreamCourseCardProps {
  course: Course;
  category: string;
  index: number;
}

export default function StreamCourseCard({
  course,
  category,
  index,
}: StreamCourseCardProps) {
  const router = useRouter();

  const handleClick = () => {
    speak(
      `${course.name}, ${course.duration}. Entrance: ${course.exam}.`,
    );
    router.push(`/stream/${category}/program/${index}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group card p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all cursor-pointer border-t-2 border-t-transparent group-hover:border-indigo-600"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 font-mono text-[11px] uppercase tracking-wider text-slate-700 font-semibold">
          {course.duration}
        </span>
        <div>
          <h3 className="font-display text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
            {course.name}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-700 font-semibold mt-1">
            Entrance: {course.exam}
          </p>
        </div>
      </div>
      <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold group-hover:text-slate-900 transition-colors">
        Click to explore colleges
      </span>
    </div>
  );
}
