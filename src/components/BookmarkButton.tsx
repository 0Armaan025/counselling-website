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
      className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] transition-colors hover:text-clay-600 dark:text-paper-300 dark:hover:text-clay-500"
    >
      {bookmarked ? (
        <BookmarkCheck size={11} strokeWidth={2} aria-hidden fill="clay-600" />
      ) : (
        <Bookmark size={11} strokeWidth={2} aria-hidden />
      )}
      {bookmarked ? "Saved" : "Save"}
    </button>
  );
}
