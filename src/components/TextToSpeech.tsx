"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type TTSMode = "normal" | "emotional";

interface TextToSpeechProps {
  /** Text to read aloud */
  text: string;
  /** Label shown on the button */
  label?: string;
  /** Reading mode: "emotional" adds pitch/rate variation for quotes */
  mode?: TTSMode;
  /** Compact button style (icon only) */
  compact?: boolean;
}

// Preferred Japanese voices (ranked by quality)
const PREFERRED_VOICES = [
  "Microsoft Nanami Online",   // Edge neural voice (very natural)
  "Google 日本語",              // Chrome
  "Nanami",                    // Edge
  "Kyoko",                     // macOS / iOS
  "O-Ren",                     // macOS
  "Hattori",                   // macOS
  "ja-JP",                     // Generic Japanese
];

function findBestJapaneseVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Try preferred voices first
  for (const pref of PREFERRED_VOICES) {
    const match = voices.find(
      (v) => v.name.includes(pref) || v.lang.startsWith("ja")
    );
    if (match) return match;
  }
  // Fallback: any Japanese voice
  return voices.find((v) => v.lang.startsWith("ja")) ?? null;
}

/** Split text into segments for emotional reading */
function splitIntoSegments(text: string): { text: string; isQuote: boolean }[] {
  const paragraphs = text.split(/\n+/).filter((p) => p.trim());
  return paragraphs.map((p) => ({
    text: p.trim(),
    isQuote: p.startsWith("「") || p.startsWith("『") || p.startsWith("\""),
  }));
}

export default function TextToSpeech({
  text,
  label = "読み上げ",
  mode = "emotional",
  compact = false,
}: TextToSpeechProps) {
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [rate, setRate] = useState(1.0);
  const [showControls, setShowControls] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
  const currentIndexRef = useRef(0);
  const rateRef = useRef(rate);

  // Keep rate ref in sync
  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        voiceRef.current = findBestJapaneseVoice(voices);
        setVoiceReady(true);
      }
    };

    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const speakSegment = useCallback(
    (segments: { text: string; isQuote: boolean }[], index: number) => {
      if (index >= segments.length) {
        setStatus("idle");
        setShowControls(false);
        currentIndexRef.current = 0;
        return;
      }

      const seg = segments[index];
      const utterance = new SpeechSynthesisUtterance(seg.text);

      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
      }
      utterance.lang = "ja-JP";

      // Emotional reading adjustments
      if (mode === "emotional" && seg.isQuote) {
        utterance.rate = rateRef.current * 0.88;
        utterance.pitch = 1.15;
      } else {
        utterance.rate = rateRef.current;
        utterance.pitch = 1.0;
      }

      utterance.onend = () => {
        currentIndexRef.current = index + 1;
        speakSegment(segments, index + 1);
      };

      utterance.onerror = (e) => {
        if (e.error !== "interrupted" && e.error !== "canceled") {
          console.warn("TTS error:", e.error);
        }
        // Don't auto-advance on error
      };

      speechSynthesis.speak(utterance);
    },
    [mode]
  );

  const handlePlay = useCallback(() => {
    if (status === "paused") {
      speechSynthesis.resume();
      setStatus("playing");
      return;
    }

    // Start fresh
    speechSynthesis.cancel();
    const segments = splitIntoSegments(text);
    if (segments.length === 0) return;

    currentIndexRef.current = 0;
    setStatus("playing");
    setShowControls(true);
    speakSegment(segments, 0);
  }, [status, text, speakSegment]);

  const handlePause = useCallback(() => {
    speechSynthesis.pause();
    setStatus("paused");
  }, []);

  const handleStop = useCallback(() => {
    speechSynthesis.cancel();
    setStatus("idle");
    setShowControls(false);
    currentIndexRef.current = 0;
  }, []);

  const handleRateChange = useCallback(
    (newRate: number) => {
      setRate(newRate);
      // If currently playing, restart at current position with new rate
      if (status === "playing") {
        speechSynthesis.cancel();
        const segments = splitIntoSegments(text);
        speakSegment(segments, currentIndexRef.current);
      }
    },
    [status, text, speakSegment]
  );

  // Don't render if speech synthesis not supported
  if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 flex-wrap">
      {/* Main play button */}
      {status === "idle" ? (
        <button
          onClick={handlePlay}
          disabled={!voiceReady}
          className={`group inline-flex items-center gap-2 rounded-full transition-all duration-300 ${
            compact
              ? "h-8 w-8 justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
              : "px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-sm"
          } ${!voiceReady ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          title={label}
        >
          {/* Play icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-accent shrink-0"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          {!compact && (
            <span className="text-muted group-hover:text-foreground transition-colors">
              {label}
            </span>
          )}
        </button>
      ) : (
        <div className="inline-flex items-center gap-1.5">
          {/* Pause/Resume */}
          <button
            onClick={status === "playing" ? handlePause : handlePlay}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 hover:bg-accent/30 border border-accent/30 transition-all"
            title={status === "playing" ? "一時停止" : "再開"}
          >
            {status === "playing" ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Stop */}
          <button
            onClick={handleStop}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            title="停止"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-muted">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </button>

          {/* Speaking indicator */}
          {status === "playing" && (
            <div className="flex items-center gap-0.5 ml-1" aria-label="読み上げ中">
              <span className="tts-bar h-3 w-0.5 rounded-full bg-accent" style={{ animationDelay: "0ms" }} />
              <span className="tts-bar h-4 w-0.5 rounded-full bg-accent" style={{ animationDelay: "150ms" }} />
              <span className="tts-bar h-2 w-0.5 rounded-full bg-accent" style={{ animationDelay: "300ms" }} />
              <span className="tts-bar h-5 w-0.5 rounded-full bg-accent" style={{ animationDelay: "100ms" }} />
              <span className="tts-bar h-3 w-0.5 rounded-full bg-accent" style={{ animationDelay: "250ms" }} />
            </div>
          )}
        </div>
      )}

      {/* Speed control - show when controls are visible */}
      {showControls && (
        <div className="inline-flex items-center gap-1 ml-2">
          {[0.8, 1.0, 1.2, 1.5].map((r) => (
            <button
              key={r}
              onClick={() => handleRateChange(r)}
              className={`rounded-full px-2 py-0.5 text-xs transition-all ${
                Math.abs(rate - r) < 0.01
                  ? "bg-accent/20 text-accent border border-accent/30"
                  : "text-muted hover:text-foreground bg-white/5 border border-transparent hover:border-white/10"
              }`}
            >
              {r === 1.0 ? "1x" : `${r}x`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
