"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type TTSMode = "normal" | "emotional";
type StoryStage = "origin" | "despair" | "void" | "awakening" | "rebirth" | null;

interface TextToSpeechProps {
  /** Text to read aloud */
  text: string;
  /** Label shown on the button */
  label?: string;
  /** Reading mode: "emotional" adds pitch/rate variation for quotes */
  mode?: TTSMode;
  /** Compact button style (icon only) */
  compact?: boolean;
  /** Story stage for stage-aware intonation */
  stage?: StoryStage;
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

// --- Emotion detection ---

type Emotion = "neutral" | "sorrow" | "triumph" | "tension" | "quiet" | "warm";

const EMOTION_KEYWORDS: { emotion: Emotion; words: string[] }[] = [
  {
    emotion: "sorrow",
    words: [
      "絶望", "苦痛", "涙", "挫折", "崩れ", "失", "悲", "痛み", "暗闇",
      "苦し", "泣", "地獄", "恐怖", "不安", "孤独", "断裂", "破壊", "終わり",
      "もう駄目", "全治", "手術", "引退", "離脱", "重傷",
    ],
  },
  {
    emotion: "triumph",
    words: [
      "復活", "勝利", "栄光", "奇跡", "歓喜", "達成", "優勝", "金メダル",
      "復帰", "成し遂げ", "超え", "打ち勝", "再び", "戻って", "輝",
      "歓声", "世界一", "記録", "証明", "信じ",
    ],
  },
  {
    emotion: "tension",
    words: [
      "決断", "覚悟", "運命", "賭け", "瀬戸際", "限界", "挑", "闘",
      "立ち上が", "必死", "命がけ", "ギリギリ", "最後の", "一か八か",
    ],
  },
  {
    emotion: "quiet",
    words: [
      "静か", "空白", "無", "沈黙", "ただ", "一人", "じっと", "長い",
      "見つめ", "待", "耐え", "日々", "繰り返",
    ],
  },
  {
    emotion: "warm",
    words: [
      "支え", "仲間", "家族", "感謝", "愛", "絆", "恩", "共に",
      "寄り添", "励まし", "信頼", "笑顔",
    ],
  },
];

/** Stage-level base tone adjustments */
const STAGE_TONE: Record<string, { pitchBase: number; rateBase: number }> = {
  origin:    { pitchBase: 1.02, rateBase: 0.97 },
  despair:   { pitchBase: 0.88, rateBase: 0.88 },
  void:      { pitchBase: 0.92, rateBase: 0.85 },
  awakening: { pitchBase: 1.05, rateBase: 0.95 },
  rebirth:   { pitchBase: 1.10, rateBase: 1.0 },
};

interface Segment {
  text: string;
  isQuote: boolean;
  emotion: Emotion;
  hasExclamation: boolean;
  hasQuestion: boolean;
  hasEllipsis: boolean;
  hasDash: boolean;
}

function detectEmotion(text: string): Emotion {
  let best: Emotion = "neutral";
  let bestCount = 0;
  for (const { emotion, words } of EMOTION_KEYWORDS) {
    const count = words.filter((w) => text.includes(w)).length;
    if (count > bestCount) {
      bestCount = count;
      best = emotion;
    }
  }
  return best;
}

// Regex for long dashes: ——, ――, ーー, --, ─── etc. (2+ consecutive)
const DASH_RE = /[—―─ー\-]{2,}/;

/** Split text into sentence-level segments with emotion metadata */
function splitIntoSegments(text: string): Segment[] {
  const paragraphs = text.split(/\n+/).filter((p) => p.trim());
  const segments: Segment[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    const isQuote = trimmed.startsWith("「") || trimmed.startsWith("『") || trimmed.startsWith("\"");

    // Split paragraph into sentences (by 。！？… but keep the delimiter)
    // Note: 」』 are NOT split points — they should flow naturally
    const sentences = trimmed
      .split(/(?<=[。！？…])/g)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const parts = sentences.length > 0 ? sentences : [trimmed];

    for (const sentence of parts) {
      // Further split on long dashes (——) to create a pause boundary
      if (DASH_RE.test(sentence)) {
        const subParts = sentence.split(DASH_RE).map((s) => s.trim()).filter((s) => s.length > 0);
        subParts.forEach((sub, i) => {
          // Strip any remaining stray single dashes at edges
          const cleaned = sub.replace(/^[—―─ー\-]+|[—―─ー\-]+$/g, "").trim();
          if (!cleaned) return;
          segments.push({
            text: cleaned,
            isQuote,
            emotion: detectEmotion(cleaned),
            hasExclamation: /！|!/.test(cleaned),
            hasQuestion: /？|\?/.test(cleaned),
            hasEllipsis: /…|\.\.\./.test(cleaned),
            hasDash: i < subParts.length - 1, // mark all but last sub-part
          });
        });
      } else {
        segments.push({
          text: sentence,
          isQuote,
          emotion: detectEmotion(sentence),
          hasExclamation: /！|!/.test(sentence),
          hasQuestion: /？|\?/.test(sentence),
          hasEllipsis: /…|\.\.\./.test(sentence),
          hasDash: false,
        });
      }
    }
  }

  return segments;
}

/** Calculate pitch and rate for a segment based on emotion + context */
function getVoiceParams(
  seg: Segment,
  stage: StoryStage,
  baseRate: number,
): { pitch: number; rate: number } {
  // Start with stage-level tone
  const stageTone = stage && STAGE_TONE[stage]
    ? STAGE_TONE[stage]
    : { pitchBase: 1.0, rateBase: 1.0 };

  let pitch = stageTone.pitchBase;
  let rate = baseRate * stageTone.rateBase;

  // Emotion adjustments (layered on top of stage)
  switch (seg.emotion) {
    case "sorrow":
      pitch *= 0.90;
      rate *= 0.85;
      break;
    case "triumph":
      pitch *= 1.12;
      rate *= 1.05;
      break;
    case "tension":
      pitch *= 1.05;
      rate *= 0.92;
      break;
    case "quiet":
      pitch *= 0.95;
      rate *= 0.82;
      break;
    case "warm":
      pitch *= 1.06;
      rate *= 0.93;
      break;
  }

  // Quote: slightly slower, more expressive
  if (seg.isQuote) {
    pitch *= 1.08;
    rate *= 0.90;
  }

  // Punctuation adjustments
  if (seg.hasExclamation) {
    pitch *= 1.10;
    rate *= 1.05;
  }
  if (seg.hasQuestion) {
    pitch *= 1.08;
  }
  if (seg.hasEllipsis) {
    rate *= 0.80;
  }

  // Clamp to Web Speech API limits
  pitch = Math.max(0.1, Math.min(2.0, pitch));
  rate = Math.max(0.1, Math.min(10.0, rate));

  return { pitch, rate };
}

export default function TextToSpeech({
  text,
  label = "読み上げ",
  mode = "emotional",
  compact = false,
  stage = null,
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
    (segments: Segment[], index: number) => {
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

      if (mode === "emotional") {
        const params = getVoiceParams(seg, stage, rateRef.current);
        utterance.pitch = params.pitch;
        utterance.rate = params.rate;
      } else {
        utterance.rate = rateRef.current;
        utterance.pitch = 1.0;
      }

      utterance.onend = () => {
        currentIndexRef.current = index + 1;
        // Add pauses between segments for natural breathing
        // Long dash (——) gets a dramatic pause, ellipsis also long
        const pauseMs = seg.hasDash ? 700 : seg.hasEllipsis ? 600 : 100;
        setTimeout(() => speakSegment(segments, index + 1), pauseMs);
      };

      utterance.onerror = (e) => {
        if (e.error !== "interrupted" && e.error !== "canceled") {
          console.warn("TTS error:", e.error);
        }
      };

      speechSynthesis.speak(utterance);
    },
    [mode, stage]
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
