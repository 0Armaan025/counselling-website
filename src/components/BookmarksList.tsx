"use client";

import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { getBookmarks, type BookmarkedCollege } from "@/lib/bookmarks";

export default function BookmarksList() {
  const [bookmarks, setBookmarks] = useState<BookmarkedCollege[]>([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
    const sync = () => setBookmarks(getBookmarks());
    window.addEventListener("gp:bookmarks-toggle", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("gp:bookmarks-toggle", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (bookmarks.length === 0) {
    return (
      <section className="section" aria-label="Saved colleges">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 md:py-16">
          <div className="card p-8 text-center">
            <span className="section-icon mx-auto" aria-hidden>
              <Bookmark size={16} strokeWidth={2} />
            </span>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-700 font-semibold">
              No saved colleges yet
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Click &ldquo;Save&rdquo; on any college to bookmark it here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" aria-labelledby="bookmarks-heading">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <div className="section-head">
          <span className="section-icon" aria-hidden>
            <Bookmark size={16} strokeWidth={2} />
          </span>
          <div>
            <p className="eyebrow">Saved Colleges</p>
            <h3 id="bookmarks-heading" className="section-title">
              Your <em className="italic text-indigo-700 font-medium">bookmarked</em> colleges
            </h3>
          </div>
        </div>

        <ul className="divide-y border-slate-100 space-y-0">
          {bookmarks.map((c) => (
            <li
              key={`${c.name}-${c.stream}`}
              className="flex flex-wrap items-center justify-between gap-3 p-4 transition-colors hover:bg-slate-50 hover:border-indigo-200 border border-slate-200 rounded-xl"
            >
              <div className="min-w-0">
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-base font-semibold leading-snug text-slate-900 underline-offset-4 hover:text-indigo-600 hover:underline"
                >
                  {c.name}
                </a>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-700 font-semibold">
                  {c.city}, {c.state} · {c.stream} · {c.exam} · {c.fees}
                </p>
              </div>
              <a
                href={c.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 border border-indigo-600 px-2.5 py-1.5 font-sans text-[11px] font-semibold text-indigo-700 transition-colors hover:bg-indigo-600 hover:text-white"
              >
                Form
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
