"use client";

import { Target, GraduationCap, Lightbulb, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { streams } from "@/data/streams";

type Answer = { streamId: string; points: number };

const QUESTIONS = [
  {
    id: "subjects",
    text: "Which subjects do you enjoy most?",
    options: [
      { label: "Physics, Chemistry, Maths", streamId: "science-pcm", points: 3 },
      { label: "Biology, Chemistry", streamId: "science-pcb", points: 3 },
      { label: "Accountancy, Business Studies, Economics", streamId: "commerce", points: 3 },
      { label: "History, Political Science, English, Psychology", streamId: "arts-humanities", points: 3 },
      { label: "Drawing, Design, Creativity", streamId: "design", points: 3 },
      { label: "Legal studies, Debate, Logic", streamId: "law", points: 3 },
      { label: "Cooking, Hotel ops, Event planning", streamId: "hospitality", points: 3 },
      { label: "Drawing, Maths, Planning", streamId: "architecture", points: 3 },
    ],
  },
  {
    id: "career",
    text: "What kind of career appeals to you?",
    options: [
      { label: "Engineer / Scientist", streamId: "science-pcm", points: 3 },
      { label: "Doctor / Healthcare", streamId: "science-pcb", points: 3 },
      { label: "Manager / Entrepreneur", streamId: "commerce", points: 3 },
      { label: "Writer / Journalist / Civil servant", streamId: "arts-humanities", points: 3 },
      { label: "Designer / Artist", streamId: "design", points: 3 },
      { label: "Lawyer / Judge", streamId: "law", points: 3 },
      { label: "Hotel manager / Chef", streamId: "hospitality", points: 3 },
      { label: "Architect / Planner", streamId: "architecture", points: 3 },
    ],
  },
  {
    id: "duration",
    text: "How long do you want to study?",
    options: [
      { label: "4+ years (B.Tech, MBBS, B.Arch)", streamId: "science-pcm", points: 2 },
      { label: "5.5 years (MBBS)", streamId: "science-pcb", points: 2 },
      { label: "3 years (B.Com, BBA, BA)", streamId: "commerce", points: 2 },
      { label: "3-4 years (BA, B.Des)", streamId: "design", points: 2 },
      { label: "5 years (BA LLB)", streamId: "law", points: 2 },
      { label: "4 years (Hotel mgmt)", streamId: "hospitality", points: 2 },
      { label: "5 years (B.Arch)", streamId: "architecture", points: 2 },
    ],
  },
  {
    id: "budget",
    text: "What is your approximate annual fee comfort?",
    options: [
      { label: "Low (govt colleges under ₹1L)", streamId: "science-pcb", points: 2 },
      { label: "Moderate (₹1L–₹3L)", streamId: "commerce", points: 2 },
      { label: "Flexible (₹3L+ for top pvt)", streamId: "design", points: 2 },
      { label: "Any — I want the best fit", streamId: "arts-humanities", points: 1 },
    ],
  },
];

const STREAM_DESCRIPTIONS: Record<string, string> = {
  "science-pcm": "Engineering, technology, and pure sciences — B.Tech, B.Sc, IISER.",
  "science-pcb": "Medicine, dentistry, and health sciences — MBBS, BDS, BPT, Nursing.",
  commerce: "Business, finance, and accountancy — B.Com, BBA, BCA, Economics.",
  "arts-humanities": "Language, society, psychology, and media — BA, Journalism, Social Work.",
  design: "Product, communication, and fashion design — B.Des, BFA.",
  law: "Integrated 5-year and 3-year law degrees — BA LLB, BBA LLB.",
  hospitality: "Hospitality, culinary, and event management — Hotel mgmt, Culinary Arts.",
  architecture: "Built environment and planning — B.Arch, B.Plan.",
};

export default function StreamQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);

  const current = QUESTIONS[step];

  const handlePick = (option: (typeof QUESTIONS)[number]["options"][number]) => {
    setScores((prev) => {
      const next = { ...prev };
      next[option.streamId] = (next[option.streamId] || 0) + option.points;
      return next;
    });
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
      setResult(best ? best[0] : null);
    }
  };

  const reset = () => {
    setStep(0);
    setScores({});
    setResult(null);
  };

  if (result) {
    const stream = streams.find((s) => s.id === result);
    return (
      <section className="border-t hairline mt-12 py-12">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-paper-50">
              <Target size={16} strokeWidth={2} aria-hidden />
            </div>
            <div>
              <p className="eyebrow flex items-center gap-1">
                <Lightbulb size={12} aria-hidden /> Stream Recommender
              </p>
              <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-50">
                Based on your answers
              </h3>
            </div>
          </div>

          <div className="border border-ink-100 rounded-lg p-6 dark:border-white/10 dark:bg-black/5 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300 mb-2">
              Your recommended stream
            </p>
            <h2 className="font-display text-3xl font-semibold text-ink-900 dark:text-paper-50 mb-2">
              {stream?.name}
            </h2>
            <p className="text-sm leading-relaxed text-ink-700 dark:text-paper-300 mb-6">
              {STREAM_DESCRIPTIONS[result]}
            </p>
            <a
              href="#streams"
              className="inline-flex items-center gap-2 border border-ink-900 px-4 py-2 font-sans text-[11px] font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-50 dark:border-paper-100 dark:text-paper-100 dark:hover:bg-paper-100 dark:hover:text-ink-900"
            >
              Explore {stream?.name} <ArrowRight size={12} strokeWidth={2} aria-hidden />
            </a>
          </div>

          <button
            onClick={reset}
            className="mt-6 text-[10px] uppercase tracking-[0.14em] text-ink-500 underline underline-offset-2 hover:text-clay-600 dark:text-paper-300 dark:hover:text-clay-500"
          >
            Retake quiz
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t hairline mt-12 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-paper-50">
            <Target size={16} strokeWidth={2} aria-hidden />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-1">
              <Lightbulb size={12} aria-hidden /> Stream Recommender
            </p>
            <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-50">
              Find the right stream for you
            </h3>
          </div>
        </div>

        <p className="text-sm text-ink-500 dark:text-paper-300 mb-8">
          {step + 1} of {QUESTIONS.length} — {current.text}
        </p>

        <div className="space-y-3">
          {current.options.map((opt) => (
            <button
              key={opt.streamId}
              onClick={() => handlePick(opt)}
              className="flex items-center justify-between border border-ink-200 rounded-lg p-3 text-left hover:border-clay-600 hover:bg-clay-600/5 transition-colors dark:border-white/20 dark:text-paper-50 dark:hover:border-clay-500"
            >
              <span className="text-sm text-ink-900 dark:text-paper-50">{opt.label}</span>
              <span className="font-mono text-[10px] text-ink-400 dark:text-paper-400">+{opt.points}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
