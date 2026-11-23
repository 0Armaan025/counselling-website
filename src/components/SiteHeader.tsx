import { GraduationCap } from "lucide-react";
import Link from "next/link";
import VoiceToggle from "./VoiceToggle";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-paper-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="GuidePath home" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center bg-ink-900 text-paper-50">
            <GraduationCap size={15} strokeWidth={2} aria-hidden />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
            GuidePath
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700 sm:inline">
            Post-12th Counselling
          </span>
        </Link>
        <nav className="flex items-center gap-2" aria-label="Primary">
          <a
            href="#streams"
            className="hidden px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-700 transition-colors hover:text-clay-800 sm:inline"
          >
            Streams
          </a>
          <VoiceToggle />
        </nav>
      </div>
    </header>
  );
}
