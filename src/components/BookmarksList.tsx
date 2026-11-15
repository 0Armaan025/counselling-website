"use client";

import { Bookmark, Clock } from "lucide-react";
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
      <section className="border-t hairline mt-12 py-12">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-200 mx-auto mb-4 dark:border-white/20">
            <Bookmark size={16} strokeWidth={2} aria-hidden className="text-ink-400 dark:text-paper-400" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 dark:text-paper-300 mb-2">
            No saved colleges yet
          </p>
          <p className="text-sm text-ink-500 dark:text-paper-300">
            Click &ldquo;Save&rdquo; on any college card to bookmark it here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t hairline mt-12 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-paper-50">
            <Bookmark size={16} strokeWidth={2} aria-hidden />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-1">
              <Clock size={12} aria-hidden /> Saved Colleges
            </p>
            <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-50">
              Your bookmarked colleges
            </h3>
          </div>
        </div>

        <div className="grid gap-3">
          {bookmarks.map((c) => (
            <div key={`${c.name}-${c.stream}`} className="border border-ink-100 rounded-lg p-4 dark:border-white/10 dark:bg-black/5">
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
                    <span aria-hidden>·</span> {c.city}, {c.state}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500 dark:text-paper-300">
                    {c.stream} · {c.exam} · {c.fees}
                  </p>
                </div>
                <a
                  href={c.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-ink-900 px-2.5 py-1.5 font-sans text-[11px] font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-50 dark:border-paper-100 dark:text-paper-100 dark:hover:bg-paper-100 dark:hover:text-ink-900"
                >
                  <span className="text-[10px]">Form</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
