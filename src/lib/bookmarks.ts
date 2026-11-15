const BOOKMARK_KEY = "gp-bookmarks";

export type BookmarkedCollege = {
  name: string;
  city: string;
  state: string;
  stream: string;
  fees: string;
  exam: string;
  formUrl: string;
  website: string;
};

export function getBookmarks(): BookmarkedCollege[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(BOOKMARK_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveBookmarks(colleges: BookmarkedCollege[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BOOKMARK_KEY, JSON.stringify(colleges));
  window.dispatchEvent(new Event("gp:bookmarks-toggle"));
}

export function isBookmarked(college: BookmarkedCollege) {
  const list = getBookmarks();
  return list.some(
    (b) => b.name === college.name && b.stream === college.stream
  );
}

export function toggleBookmark(college: BookmarkedCollege) {
  const list = getBookmarks();
  const exists = isBookmarked(college);
  const next = exists
    ? list.filter((b) => !(b.name === college.name && b.stream === college.stream))
    : [...list, college];
  saveBookmarks(next);
  return !exists;
}
