"use client";

import { Search, MapPin, FileText } from "lucide-react";
import { useState, useMemo } from "react";
import { streams, type College } from "@/data/streams";

type FilterState = {
  query: string;
  city: string;
  state: string;
  exam: string;
  minFees: string;
  maxFees: string;
};

export default function CollegeFilter() {
  const [filter, setFilter] = useState<FilterState>({
    query: "",
    city: "",
    state: "",
    exam: "",
    minFees: "",
    maxFees: "",
  });

  const allColleges = useMemo(
    () =>
      streams.flatMap((s) =>
        s.colleges.map((c) => ({ ...c, stream: s.name }))
      ),
    []
  );

  const filtered = useMemo(() => {
    return allColleges.filter((c) => {
      const q = filter.query.toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.stream.toLowerCase().includes(q);
      const matchesCity = !filter.city || c.city === filter.city;
      const matchesState = !filter.state || c.state === filter.state;
      const matchesExam = !filter.exam || c.exam.toLowerCase().includes(filter.exam.toLowerCase());
      const feeNum = parseFloat(c.fees.replace(/[^\d.]/g, ""));
      const min = parseFloat(filter.minFees) || 0;
      const max = parseFloat(filter.maxFees) || Infinity;
      const matchesFees = !isNaN(feeNum) && feeNum >= min && feeNum <= max;
      return matchesQuery && matchesCity && matchesState && matchesExam && matchesFees;
    });
  }, [filter, allColleges]);

  const cities = Array.from(new Set(allColleges.map((c) => c.city))).sort();
  const states = Array.from(new Set(allColleges.map((c) => c.state))).sort();
  const exams = Array.from(new Set(allColleges.map((c) => c.exam))).sort();

  return (
    <section className="section" aria-labelledby="college-filter-heading">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="section-head">
          <span className="section-icon" aria-hidden>
            <Search size={16} strokeWidth={2} />
          </span>
          <div>
            <p className="eyebrow">College Search &amp; Filter</p>
            <h3 id="college-filter-heading" className="section-title">
              Find colleges by <em className="italic text-clay-800 text-clay-700">city, exam, or fees</em>
            </h3>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="cf-query" className="label">
              Search name / city / stream
            </label>
            <input
              id="cf-query"
              value={filter.query}
              onChange={(e) => setFilter({ ...filter, query: e.target.value })}
              placeholder="e.g. IIT Bombay, Delhi, B.Tech"
              className="input font-mono text-xs"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cf-city" className="label">
              City
            </label>
            <select
              id="cf-city"
              value={filter.city}
              onChange={(e) => setFilter({ ...filter, city: e.target.value })}
              className="input font-mono text-xs"
            >
              <option value="">Any city</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cf-state" className="label">
              State
            </label>
            <select
              id="cf-state"
              value={filter.state}
              onChange={(e) => setFilter({ ...filter, state: e.target.value })}
              className="input font-mono text-xs"
            >
              <option value="">Any state</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cf-exam" className="label">
              Entrance exam
            </label>
            <select
              id="cf-exam"
              value={filter.exam}
              onChange={(e) => setFilter({ ...filter, exam: e.target.value })}
              className="input font-mono text-xs"
            >
              <option value="">Any exam</option>
              {exams.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cf-min" className="label">
              Min fees (₹ Lakhs/year)
            </label>
            <input
              id="cf-min"
              type="number"
              value={filter.minFees}
              onChange={(e) => setFilter({ ...filter, minFees: e.target.value })}
              placeholder="0"
              className="input font-mono text-xs"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cf-max" className="label">
              Max fees (₹ Lakhs/year)
            </label>
            <input
              id="cf-max"
              type="number"
              value={filter.maxFees}
              onChange={(e) => setFilter({ ...filter, maxFees: e.target.value })}
              placeholder="50"
              className="input font-mono text-xs"
            />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between border-b-2 border-ink-900 pb-3 border-paper-100">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-700 text-paper-300">
            {filtered.length} college{s(filtered.length)} found
          </p>
          <button
            onClick={() =>
              setFilter({
                query: "", city: "", state: "", exam: "", minFees: "", maxFees: "",
              })
            }
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 underline underline-offset-2 transition-colors hover:text-clay-800 text-paper-300 hover:text-clay-700"
          >
            Clear filters
          </button>
        </div>

        {filtered.length === 0 ? (
          <p className="border hairline p-6 text-sm text-ink-700 text-paper-300">
            No colleges match your filters. Try broadening the search.
          </p>
        ) : (
          <ul className="divide-y hairline border-y hairline">
            {filtered.map((c) => (
              <li
                key={`${c.name}-${c.stream}`}
                className="flex flex-wrap items-center justify-between gap-3 p-4 transition-colors hover:bg-paper-100/60 hover:bg-white/5"
              >
                <div className="min-w-0">
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-display text-base font-semibold leading-snug text-ink-900 underline-offset-4 hover:underline text-paper-50"
                  >
                    {c.name}
                    <MapPin size={11} aria-hidden className="shrink-0 text-ink-300 text-paper-300" />
                  </a>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-700 text-paper-300">
                    {c.city}, {c.state} · {c.stream} · {c.exam} · {c.fees}
                  </p>
                </div>
                <a
                  href={c.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 border border-ink-900 px-2.5 py-1.5 font-sans text-[11px] font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-50 border-paper-100 text-paper-100 hover:bg-paper-100 hover:text-ink-900"
                >
                  <FileText size={12} strokeWidth={1.75} aria-hidden /> Form
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function s(n: number) {
  return n !== 1 ? "s" : "";
}
