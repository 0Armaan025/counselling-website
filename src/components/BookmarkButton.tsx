"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toggleBookmark, isBookmarked, getBookmarks, type BookmarkedCollege } from "@/lib/bookmarks";

export default function BookmarkButton({
  college,
  stream,
}: {
  college: { name: string; city: string; state: string; fees: string; exam: string; formUrl: string; website: string };
  stream: string;
}) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked({ ...college, stream }));
  }, [college, stream]);

  const handleClick = useCallback(() => {
    const b: BookmarkedCollege = {
      name: college.name,
      city: college.city,
      state: college.state,
      stream,
      fees: college.fees,
      exam: college.exam,
      formUrl: college.formUrl,
      website: college.website,
    };
    const now = toggleBookmark(b);
    setBookmarked(now);
  }, [college, stream]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark college"}
      className={`inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-700 font-semibold transition-colors hover:text-indigo-700 ${bookmarked ? "text-indigo-700" : ""}`}
    >
      {bookmarked ? (
        <BookmarkCheck size={11} strokeWidth={2} aria-hidden fill="currentColor" />
      ) : (
        <Bookmark size={11} strokeWidth={2} aria-hidden />
      )}
      {bookmarked ? "Saved" : "Save"}
    </button>
  );
}
