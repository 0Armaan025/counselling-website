"use client";

import { Volume2 } from "lucide-react";
import { speak, WELCOME_LINE } from "@/lib/speech";

export default function WelcomeTrigger({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => speak(WELCOME_LINE)} className={className}>
      <Volume2 size={16} strokeWidth={1.75} aria-hidden /> Hear the welcome
    </button>
  );
}
