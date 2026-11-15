"use client";

import { useEffect } from "react";
import { speak, WELCOME_LINE } from "@/lib/speech";

export default function VoiceWelcome() {
  useEffect(() => {
    const id = window.setTimeout(() => speak(WELCOME_LINE), 600);
    return () => window.clearTimeout(id);
  }, []);
  return null;
}
