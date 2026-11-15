import { ArrowDownRight, BookOpenCheck, Eye, FileText, Landmark, MapPinned, MousePointerClick } from "lucide-react";
import StreamCard from "@/components/StreamCard";
import VoiceWelcome from "@/components/VoiceWelcome";
import WelcomeTrigger from "@/components/WelcomeTrigger";
import AIChat from "@/components/AIChat";
import StreamComparison from "@/components/StreamComparison";
import ExamTimeline from "@/components/ExamTimeline";
import CollegeFilter from "@/components/CollegeFilter";
import StreamQuiz from "@/components/StreamQuiz";
import BookmarksList from "@/components/BookmarksList";
import { streams } from "@/data/streams";

const totals = {
  streams: streams.length,
  courses: streams.reduce((n, s) => n + s.courses.length, 0),
  colleges: streams.reduce((n, s) => n + s.colleges.length, 0),
};

export default function Home() {
  return (
    <div>
      <VoiceWelcome />

      {/* Hero */}
      <section className="border-b hairline">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-12 md:py-16 lg:py-20">
          <div className="md:col-span-7">
            <p className="eyebrow">Post-12th counselling — India, 2026–27</p>
            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl dark:text-paper-50">
              Pick the stream.
              <br />
              Find the <em className="italic text-clay-600 dark:text-clay-500">college</em>.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-700 dark:text-paper-100">
              Science, Commerce, Arts, Design, Law, Hotel Management and Architecture — every
              stream, the courses under it, the entrance exams, the fees and the official
              admission form for each leading college. One honest guide, free for students and
              parents.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#streams" className="btn-primary">
                Explore the streams
                <ArrowDownRight size={16} strokeWidth={2} aria-hidden />
              </a>
              <WelcomeTrigger className="btn-ghost" />
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500 dark:text-paper-300">
              {String(totals.streams).padStart(2, "0")} streams — {totals.courses} courses —{" "}
              {totals.colleges} top colleges — Official forms linked
            </p>
          </div>

          <div className="md:col-span-5">
            <aside className="card flex h-full flex-col justify-between p-6 sm:p-7" aria-label="How GuidePath works">
              <div>
                <p className="eyebrow">How it works</p>
                <ol className="mt-5 divide-y hairline border hairline">
                  {[
                    { n: "01", title: "Choose your stream", body: "Eight routes after Class 12 — from B.Tech to BFA. Open the one that fits.", icon: MousePointerClick },
                    { n: "02", title: "Compare honestly", body: "Course length, entrance exam, fees and the strongest colleges for each path.", icon: Eye },
                    { n: "03", title: "Open the official form", body: "Every college links straight to its verified admission portal — nothing in between.", icon: FileText },
                  ].map((step) => (
                    <li key={step.n} className="flex items-start gap-4 p-4">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border hairline font-mono text-[11px] font-medium text-ink-700 dark:text-paper-100">
                        {step.n}
                      </span>
                      <span>
                        <span className="flex items-center gap-2 font-sans text-sm font-semibold text-ink-900 dark:text-paper-50">
                          <step.icon size={14} strokeWidth={1.75} aria-hidden className="text-clay-600 dark:text-clay-500" />
                          {step.title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink-500 dark:text-paper-300">
                          {step.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="mt-6 flex items-center gap-2 border-t hairline pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-paper-300">
                <BookOpenCheck size={13} aria-hidden className="text-clay-600 dark:text-clay-500" />
                Fees &amp; exams re-verified for 2026–27
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Streams index */}
      <section id="streams" aria-labelledby="streams-heading" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink-900 pb-5 dark:border-paper-100">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <Landmark size={12} aria-hidden /> The index
              </p>
              <h2
                id="streams-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-paper-50"
              >
                Eight streams, <em className="italic text-clay-600 dark:text-clay-500">one decision</em>.
              </h2>
            </div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500 dark:text-paper-300">
              <MapPinned size={13} aria-hidden /> Select a stream to hear it
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {streams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Counsellor */}
      <AIChat />

      {/* Stream Comparison */}
      <StreamComparison />

      {/* Entrance Exam Timeline */}
      <ExamTimeline />

      {/* College Search & Filter */}
      <CollegeFilter />

      {/* Stream Recommendation Quiz */}
      <StreamQuiz />

      {/* Saved Colleges */}
      <BookmarksList />
    </div>
  );
}
