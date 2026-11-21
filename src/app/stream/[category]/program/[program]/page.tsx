import { notFound } from "next/navigation";
import { findStreamByCategory } from "@/data/streams";
import ProgramCollegeCard from "@/components/ProgramCollegeCard";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ category: string; program: string }>;
}) {
  const { category, program } = await params;
  const stream = findStreamByCategory(category);
  const index = Number(program);
  const course = stream?.courses[index];

  if (!stream || course === undefined) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-white/20 px-6 py-4">
        <a
          href={`/stream/${category}`}
          className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-white/80 hover:text-white"
        >
          <span aria-hidden>←</span> Back to {stream.name}
        </a>
      </nav>

      <main className="flex-1 px-6 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded border hairline px-3 py-1 mb-8 font-mono text-[11px] uppercase tracking-wider text-ink-500 dark:text-paper-300 border-clay-200 dark:border-white/10">
            <span
              style={{
                backgroundColor: stream.accent + "20",
                color: stream.accent,
              }}
              className="flex h-2 w-2 rounded-full"
            />
            {stream.name}
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-paper-50 mb-2 sm:text-4xl">
            {course.name}
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-paper-300 mb-10">
            {course.duration} &bull; Entrance: {course.exam}
          </p>

          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-paper-300 mb-6">
            Top colleges for {course.name}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stream.colleges
              .filter((college) => college.courses.includes(course.name))
              .map((college) => (
                <ProgramCollegeCard key={college.name} college={college} />
              ))}
          </div>
          {stream.colleges.every(
            (college) => !college.courses.includes(course.name),
          ) && (
            <div className="card p-6 text-ink-900 border border-white/30">
              <p className="box-label text-ink-500">
                No colleges listed for {course.name} yet.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
