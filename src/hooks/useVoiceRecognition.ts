import { useCallback, useEffect, useRef, useState } from "react";

interface UseVoiceRecognitionOptions {
  lang?: string;
  onResult?: (transcript: string) => void;
}

interface UseVoiceRecognitionResult {
  start: () => void;
  isListening: boolean;
  error: string | null;
}

export function useVoiceRecognition(
  options: UseVoiceRecognitionOptions = {}
): UseVoiceRecognitionResult {
  const { lang = "en-IN", onResult } = options;
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onerror = (event: any) => {
      setIsListening(false);
      setError(event.error || "Speech recognition error.");
    };
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join(" ");
      if (onResult) {
        onResult(transcript);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {
        // ignore if already stopped
      }
      recognitionRef.current = null;
    };
  }, [lang, onResult]);

  const start = useCallback(() => {
    setError(null);
    const recognition = recognitionRef.current;
    if (!recognition) {
      setError("Speech recognition is not available.");
      return;
    }
    try {
      recognition.start();
    } catch (err) {
      console.error("Speech recognition start error", err);
    }
  }, []);

  return { start, isListening, error };
}

