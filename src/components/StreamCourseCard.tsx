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
      className="group card p-6 hover:shadow-lg hover:shadow-black/10 transition-all cursor-pointer border-t-2 border-t-transparent group-hover:border-blue-600"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 font-mono text-[11px] uppercase tracking-wider text-ink-700 font-semibold">
          {course.duration}
        </span>
        <div>
          <h3 className="font-display text-lg font-bold tracking-tight text-ink-900 group-hover:text-blue-600 transition-colors">
            {course.name}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700 font-semibold mt-1">
            Entrance: {course.exam}
          </p>
        </div>
      </div>
      <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-clay-600 font-semibold group-hover:text-ink-900 transition-colors">
        Click to explore colleges
      </span>
    </div>
  );
}
