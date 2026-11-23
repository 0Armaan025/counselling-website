"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_KEY = "gp-theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark ?? false}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="inline-flex h-9 w-9 items-center justify-center border border-slate-200 text-slate-700 transition-all hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 active:scale-95 cursor-pointer"
    >
      {dark === null ? (
        <span className="h-[17px] w-[17px]" aria-hidden />
      ) : dark ? (
        <Sun size={17} strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon size={17} strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
