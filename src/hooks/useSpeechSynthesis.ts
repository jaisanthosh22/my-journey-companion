import { useCallback, useEffect, useRef, useState } from "react";

interface UseSpeechSynthesisOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface UseSpeechSynthesisResult {
  speak: (text: string) => void;
  error: string | null;
}

export function useSpeechSynthesis(
  options: UseSpeechSynthesisOptions = {}
): UseSpeechSynthesisResult {
  const { lang = "en-IN", rate = 1, pitch = 1, volume = 1 } = options;
  const [error, setError] = useState<string | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setError("Speech synthesis is not supported in this browser.");
      return;
    }
    synthRef.current = window.speechSynthesis;
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!synthRef.current) {
        return;
      }
      if (!text) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      synthRef.current.cancel();
      synthRef.current.speak(utterance);
    },
    [lang, pitch, rate, volume]
  );

  return { speak, error };
}

