import { notFound } from "next/navigation";
import { findStreamByCategory, type Stream } from "@/data/streams";
import StreamCourseCard from "@/components/StreamCourseCard";

export default async function StreamPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const stream = findStreamByCategory(category);

  if (!stream) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b hairline px-6 py-4">
        <a
          href="/"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-600 hover:text-clay-600 dark:text-paper-300 dark:hover:text-clay-400"
        >
          <span aria-hidden>←</span> Back to paths
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
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 dark:text-paper-50 mb-4 sm:text-4xl">
            {stream.name}
          </h1>
          <p className="text-lg leading-relaxed text-ink-700 dark:text-paper-200 mb-10">
            {stream.tagline}
          </p>

          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500 dark:text-paper-300 mb-6">
            Degrees &amp; programs
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stream.courses.map((course, index) => (
              <StreamCourseCard
                key={course.name}
                course={course}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
