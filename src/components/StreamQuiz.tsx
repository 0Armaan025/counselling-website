"use client";

import { Target, ArrowRight } from "lucide-react";
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
      <section className="section" aria-labelledby="quiz-heading">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 md:py-16">
          <div className="section-head">
            <span className="section-icon" aria-hidden>
              <Target size={16} strokeWidth={2} />
            </span>
            <div>
              <p className="eyebrow">Stream Recommender</p>
              <h3 id="quiz-heading" className="section-title !text-2xl sm:!text-3xl">
                Based on your answers
              </h3>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <p className="label">Your recommended stream</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl text-paper-50">
              {stream?.name}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-700 text-paper-300">
              {STREAM_DESCRIPTIONS[result]}
            </p>
            <a href="#streams" className="btn-ghost mt-6 !px-4 !py-2.5 !text-xs">
              Explore {stream?.name} <ArrowRight size={12} strokeWidth={2} aria-hidden />
            </a>
          </div>

          <button
            onClick={reset}
            className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 underline underline-offset-2 transition-colors hover:text-clay-800 text-paper-300 hover:text-clay-700"
          >
            Retake quiz
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section" aria-labelledby="quiz-heading">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 md:py-16">
        <div className="section-head">
          <span className="section-icon" aria-hidden>
            <Target size={16} strokeWidth={2} />
          </span>
          <div>
            <p className="eyebrow">Stream Recommender</p>
            <h3 id="quiz-heading" className="section-title !text-2xl sm:!text-3xl">
              Find the right stream for you
            </h3>
          </div>
        </div>

        <p className="-mt-4 mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-clay-800 text-clay-700">
          Question {String(step + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
        </p>
        <p className="mb-8 font-display text-xl font-semibold tracking-tight text-ink-900 text-paper-50">
          {current.text}
        </p>

        <div className="space-y-3">
          {current.options.map((opt) => (
            <button
              key={opt.streamId}
              onClick={() => handlePick(opt)}
              className="flex w-full items-center justify-between gap-3 border hairline bg-white p-4 text-left transition-colors hover:border-clay-500 hover:bg-clay-100/50 bg-[#1E1B17] hover:bg-clay-600/10 hover:border-clay-500"
            >
              <span className="text-sm font-medium text-ink-900 text-paper-50">{opt.label}</span>
              <span className="shrink-0 font-mono text-[10px] text-ink-700 text-paper-300">+{opt.points}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
