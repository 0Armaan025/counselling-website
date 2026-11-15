"use client";

import { Search, MapPin, Landmark, Filter, Clock, FileText } from "lucide-react";
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
    <section className="border-t hairline mt-12 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-paper-50">
            <Search size={16} strokeWidth={2} aria-hidden />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-1">
              <Filter size={12} aria-hidden /> College Search &amp; Filter
            </p>
            <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-50">
              Find colleges by city, exam, or fees
            </h3>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
              Search name / city / stream
            </label>
            <input
              value={filter.query}
              onChange={(e) => setFilter({ ...filter, query: e.target.value })}
              placeholder="e.g. IIT Bombay, Delhi, B.Tech"
              className="border border-ink-200 rounded bg-paper-100 px-3 py-2 text-[11px] focus:ring-0 dark:border-white/20 dark:bg-black/20 dark:text-paper-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
              City
            </label>
            <select
              value={filter.city}
              onChange={(e) => setFilter({ ...filter, city: e.target.value })}
              className="border border-ink-200 rounded bg-paper-100 px-3 py-2 text-[11px] focus:ring-0 dark:border-white/20 dark:bg-black/20 dark:text-paper-50"
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
            <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
              State
            </label>
            <select
              value={filter.state}
              onChange={(e) => setFilter({ ...filter, state: e.target.value })}
              className="border border-ink-200 rounded bg-paper-100 px-3 py-2 text-[11px] focus:ring-0 dark:border-white/20 dark:bg-black/20 dark:text-paper-50"
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
            <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
              Entrance exam
            </label>
            <select
              value={filter.exam}
              onChange={(e) => setFilter({ ...filter, exam: e.target.value })}
              className="border border-ink-200 rounded bg-paper-100 px-3 py-2 text-[11px] focus:ring-0 dark:border-white/20 dark:bg-black/20 dark:text-paper-50"
            >
              <option value="">Any exam</option>
              {exams.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
              Min fees (₹ Lakhs/year)
            </label>
            <input
              type="number"
              value={filter.minFees}
              onChange={(e) => setFilter({ ...filter, minFees: e.target.value })}
              placeholder="0"
              className="border border-ink-200 rounded bg-paper-100 px-3 py-2 text-[11px] focus:ring-0 dark:border-white/20 dark:bg-black/20 dark:text-paper-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
              Max fees (₹ Lakhs/year)
            </label>
            <input
              type="number"
              value={filter.maxFees}
              onChange={(e) => setFilter({ ...filter, maxFees: e.target.value })}
              placeholder="50"
              className="border border-ink-200 rounded bg-paper-100 px-3 py-2 text-[11px] focus:ring-0 dark:border-white/20 dark:bg-black/20 dark:text-paper-50"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
            {filtered.length} college{s(filtered.length)} found
          </p>
          <button
            onClick={() =>
              setFilter({
                query: "", city: "", state: "", exam: "", minFees: "", maxFees: "",
              })
            }
            className="text-[10px] uppercase tracking-[0.14em] text-ink-500 underline underline-offset-2 hover:text-clay-600 dark:text-paper-300 dark:hover:text-clay-500"
          >
            Clear filters
          </button>
        </div>

        <div className="grid gap-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-ink-500 dark:text-paper-300">
              No colleges match your filters. Try broadening the search.
            </p>
          ) : (
            filtered.map((c) => (
              <div
                key={`${c.name}-${c.stream}`}
                className="border border-ink-100 rounded-lg p-4 dark:border-white/10 dark:bg-black/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <a
                      href={c.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-sm font-semibold leading-snug text-ink-900 underline-offset-4 hover:underline dark:text-paper-50"
                    >
                      {c.name}
                    </a>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-500 dark:text-paper-300">
                      <MapPin size={11} aria-hidden /> {c.city}, {c.state}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-500 dark:text-paper-300">
                      <Landmark size={11} aria-hidden /> {c.stream}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500 dark:text-paper-300">
                      {c.exam} · {c.fees}
                    </p>
                  </div>
                  <a
                    href={c.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-ink-900 px-2.5 py-1.5 font-sans text-[11px] font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-50 dark:border-paper-100 dark:text-paper-100 dark:hover:bg-paper-100 dark:hover:text-ink-900"
                  >
                    <FileText size={12} strokeWidth={1.75} aria-hidden /> Form
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function s(n: number) {
  return n !== 1 ? "s" : "";
}
