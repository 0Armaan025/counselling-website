"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { isVoiceMuted, toggleVoiceMuted, VOICE_EVENT } from "@/lib/speech";

export default function VoiceToggle() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(isVoiceMuted());
    const sync = () => setMuted(isVoiceMuted());
    window.addEventListener(VOICE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(VOICE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleVoiceMuted}
      aria-pressed={!muted}
      aria-label={muted ? "Turn voice guidance on" : "Turn voice guidance off"}
      title={muted ? "Voice guidance is off" : "Voice guidance is on"}
      className="inline-flex h-9 w-9 items-center justify-center border border-slate-200 text-slate-700 transition-all hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 active:scale-95 cursor-pointer"
    >
      {muted ? <VolumeX size={17} strokeWidth={1.75} aria-hidden /> : <Volume2 size={17} strokeWidth={1.75} aria-hidden />}
    </button>
  );
}
