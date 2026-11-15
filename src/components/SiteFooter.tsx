import { GraduationCap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t hairline bg-paper-100 dark:bg-black/20">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2" aria-label="GuidePath home">
              <span className="flex h-6 w-6 items-center justify-center bg-ink-900 text-paper-50 dark:bg-paper-50 dark:text-ink-900">
                <GraduationCap size={13} strokeWidth={2} aria-hidden />
              </span>
              <span className="font-display text-base font-semibold tracking-tight text-ink-900 dark:text-paper-50">
                GuidePath
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-ink-500 dark:text-paper-300">
              Every post-12th stream in India, the courses under it, the fees, the entrance
              exams, and the official admission form for each leading college — in one place.
              Free for students and parents.
            </p>
          </div>
          <div className="max-w-md">
            <p className="eyebrow flex items-center gap-2">
              <ShieldCheck size={12} aria-hidden /> Before you apply
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ink-500 dark:text-paper-300">
              Fees, entrance-exam windows and admission dates are indicative for 2026–27 and
              change every year. Always confirm on the official college portal — every link on
              this page opens an official site or the recognised counselling authority.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t hairline pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 sm:flex-row sm:items-center sm:justify-between dark:text-paper-300">
          <span>GuidePath — made for Indian students</span>
          <span>Admissions 2026–27</span>
          <span>© {new Date().getFullYear()} GuidePath Counselling</span>
        </div>
      </div>
    </footer>
  );
}
