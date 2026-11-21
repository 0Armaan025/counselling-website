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
      className="group card p-6 rounded-xl shadow-card hover:shadow-card transition-all cursor-pointer border border-white/30 flex flex-col items-start gap-4"
    >
      <div className="flex items-start gap-3 w-full">
        <span className="mt-0.5 shrink-0 font-mono text-[11px] font-bold uppercase tracking-wider text-coral-500">
          {course.duration}
        </span>
        <div>
          <h3 className="box-title text-lg text-ink-900 group-hover:text-clay-600 transition-colors">
            {course.name}
          </h3>
          <p className="box-sub mt-1 text-ink-500">
            Entrance: {course.exam}
          </p>
        </div>
      </div>
      <span className="highlight-pill">
        Click to explore colleges
      </span>
    </div>
  );
}
