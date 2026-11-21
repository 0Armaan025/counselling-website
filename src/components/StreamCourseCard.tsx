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
      className="group card p-5 hover:shadow-lg hover:shadow-black/10 transition-all cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 font-mono text-[11px] uppercase tracking-wider text-clay-600 dark:text-clay-400">
          {course.duration}
        </span>
        <div>
          <h3 className="font-sans text-lg font-semibold text-ink-900 dark:text-paper-50 group-hover:text-clay-600 dark:group-hover:text-clay-400">
            {course.name}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-paper-300 mt-1">
            Entrance: {course.exam}
          </p>
        </div>
      </div>
      <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-clay-600 dark:text-clay-400">
        Click to explore colleges
      </span>
    </div>
  );
}
