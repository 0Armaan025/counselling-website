"use client";

const MUTE_KEY = "gp-voice-muted";
export const VOICE_EVENT = "gp:voice-toggle";

let muted = false;
let voicesReady = false;
let availableVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== "undefined") {
  muted = window.localStorage.getItem(MUTE_KEY) === "1";

  const loadVoices = () => {
    availableVoices = window.speechSynthesis.getVoices();
    voicesReady = true;
  };

  if (window.speechSynthesis) {
    if (window.speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", loadVoices, { once: true });
    }
  }
}

export const isVoiceMuted = () => muted;

export function setVoiceMuted(value: boolean) {
  muted = value;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(MUTE_KEY, value ? "1" : "0");
    window.dispatchEvent(new Event(VOICE_EVENT));
    if (value) {
      window.speechSynthesis?.cancel();
    }
  }
}

export function toggleVoiceMuted() {
  setVoiceMuted(!muted);
}

export const WELCOME_LINE =
  "Welcome to GuidePath. Choose your stream, explore the courses and the best colleges in India, and open the official admission form — everything in one place.";

export const speakStreamSummary = (streamName: string, courseNames: string[]) =>
  speak(`${streamName}. The courses are: ${courseNames.join(", ")}.`);

export const speakCollege = (name: string, city: string, fees: string) =>
  speak(`${name}, located in ${city}. Approximate fees: ${fees.replace(/≈/g, "approximately")}.`);

function pickVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | undefined {
  const candidates = [
    (v: SpeechSynthesisVoice) => /en-IN/i.test(v.lang),
    (v: SpeechSynthesisVoice) => /en-GB/i.test(v.lang),
    (v: SpeechSynthesisVoice) => /en(-|_)/i.test(v.lang),
    () => true,
  ];
  for (const match of candidates) {
    const voice = availableVoices.find(match);
    if (voice) return voice;
  }
  return availableVoices[0];
}

export function speak(text: string) {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth || muted) return;
  synth.cancel();

  if (!voicesReady && synth.getVoices().length === 0) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voice = pickVoice(synth);
  if (voice) utterance.voice = voice;

  utterance.onerror = (event) => {
    console.warn("Speech synthesis error:", event.error);
    try {
      synth.cancel();
      const fallback = new SpeechSynthesisUtterance(text);
      fallback.lang = "en-US";
      fallback.rate = 1;
      fallback.volume = 1;
      synth.speak(fallback);
    } catch {
      // silently ignore
    }
  };

  synth.speak(utterance);
}
