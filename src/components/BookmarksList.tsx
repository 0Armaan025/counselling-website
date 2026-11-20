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
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300">
              No saved colleges yet
            </p>
            <p className="mt-2 text-sm text-ink-500 dark:text-paper-300">
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
              Your <em className="italic text-clay-600 dark:text-clay-500">bookmarked</em> colleges
            </h3>
          </div>
        </div>

        <ul className="divide-y hairline border-y hairline">
          {bookmarks.map((c) => (
            <li
              key={`${c.name}-${c.stream}`}
              className="flex flex-wrap items-center justify-between gap-3 p-4 transition-colors hover:bg-paper-100/60 dark:hover:bg-white/5"
            >
              <div className="min-w-0">
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-base font-semibold leading-snug text-ink-900 underline-offset-4 hover:underline dark:text-paper-50"
                >
                  {c.name}
                </a>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500 dark:text-paper-300">
                  {c.city}, {c.state} · {c.stream} · {c.exam} · {c.fees}
                </p>
              </div>
              <a
                href={c.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 border border-ink-900 px-2.5 py-1.5 font-sans text-[11px] font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-50 dark:border-paper-100 dark:text-paper-100 dark:hover:bg-paper-100 dark:hover:text-ink-900"
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
