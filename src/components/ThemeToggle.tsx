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
      className="inline-flex h-9 w-9 items-center justify-center border hairline text-ink-700 transition-colors hover:border-clay-500 hover:text-clay-800 hover:text-clay-700"
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
