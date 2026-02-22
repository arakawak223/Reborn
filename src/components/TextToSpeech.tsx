"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";

type TTSMode = "normal" | "emotional";
type StoryStage = "origin" | "despair" | "void" | "awakening" | "rebirth" | null;

interface TextToSpeechProps {
  text: string;
  label?: string;
  mode?: TTSMode;
  compact?: boolean;
  stage?: StoryStage;
  locale?: Locale;
}

// Preferred Japanese voices
const PREFERRED_JA_VOICES = [
  "Microsoft Nanami Online",
  "Google \u65e5\u672c\u8a9e",
  "Nanami",
  "Kyoko",
  "O-Ren",
  "Hattori",
  "ja-JP",
];

// Preferred English voices
const PREFERRED_EN_VOICES = [
  "Microsoft Jenny Online",
  "Google US English",
  "Samantha",
  "Alex",
  "en-US",
  "en-GB",
];

function findBestVoice(voices: SpeechSynthesisVoice[], locale: Locale): SpeechSynthesisVoice | null {
  const preferred = locale === "en" ? PREFERRED_EN_VOICES : PREFERRED_JA_VOICES;
  const langPrefix = locale === "en" ? "en" : "ja";

  for (const pref of preferred) {
    const match = voices.find(
      (v) => v.name.includes(pref) || v.lang.startsWith(langPrefix)
    );
    if (match) return match;
  }
  return voices.find((v) => v.lang.startsWith(langPrefix)) ?? null;
}

type Emotion = "neutral" | "sorrow" | "triumph" | "tension" | "quiet" | "warm";

const EMOTION_KEYWORDS_JA: { emotion: Emotion; words: string[] }[] = [
  {
    emotion: "sorrow",
    words: [
      "\u7d76\u671b", "\u82e6\u75db", "\u6d99", "\u632b\u6298", "\u5d29\u308c", "\u5931", "\u60b2", "\u75db\u307f", "\u6697\u95c7",
      "\u82e6\u3057", "\u6ce3", "\u5730\u7344", "\u6050\u6016", "\u4e0d\u5b89", "\u5b64\u72ec", "\u65ad\u88c2", "\u7834\u58ca", "\u7d42\u308f\u308a",
      "\u3082\u3046\u99c4\u76ee", "\u5168\u6cbb", "\u624b\u8853", "\u5f15\u9000", "\u96e2\u8131", "\u91cd\u50b7",
    ],
  },
  {
    emotion: "triumph",
    words: [
      "\u5fa9\u6d3b", "\u52dd\u5229", "\u6804\u5149", "\u5947\u8de1", "\u6b53\u559c", "\u9054\u6210", "\u512a\u52dd", "\u91d1\u30e1\u30c0\u30eb",
      "\u5fa9\u5e30", "\u6210\u3057\u9042\u3052", "\u8d85\u3048", "\u6253\u3061\u52dd", "\u518d\u3073", "\u623b\u3063\u3066", "\u8f1d",
      "\u6b53\u58f0", "\u4e16\u754c\u4e00", "\u8a18\u9332", "\u8a3c\u660e", "\u4fe1\u3058",
    ],
  },
  {
    emotion: "tension",
    words: [
      "\u6c7a\u65ad", "\u899a\u609f", "\u904b\u547d", "\u8ced\u3051", "\u702c\u6238\u969b", "\u9650\u754c", "\u6311", "\u95d8",
      "\u7acb\u3061\u4e0a\u304c", "\u5fc5\u6b7b", "\u547d\u304c\u3051", "\u30ae\u30ea\u30ae\u30ea", "\u6700\u5f8c\u306e", "\u4e00\u304b\u516b\u304b",
    ],
  },
  {
    emotion: "quiet",
    words: [
      "\u9759\u304b", "\u7a7a\u767d", "\u7121", "\u6c88\u9ed9", "\u305f\u3060", "\u4e00\u4eba", "\u3058\u3063\u3068", "\u9577\u3044",
      "\u898b\u3064\u3081", "\u5f85", "\u8010\u3048", "\u65e5\u3005", "\u7e70\u308a\u8fd4",
    ],
  },
  {
    emotion: "warm",
    words: [
      "\u652f\u3048", "\u4ef2\u9593", "\u5bb6\u65cf", "\u611f\u8b1d", "\u611b", "\u7d46", "\u6069", "\u5171\u306b",
      "\u5bc4\u308a\u6dfb", "\u52b1\u307e\u3057", "\u4fe1\u983c", "\u7b11\u9854",
    ],
  },
];

const EMOTION_KEYWORDS_EN: { emotion: Emotion; words: string[] }[] = [
  {
    emotion: "sorrow",
    words: [
      "despair", "pain", "tears", "devastat", "shatter", "loss", "grief", "agony",
      "darkness", "suffer", "cry", "hell", "fear", "anxiety", "lonely", "rupture",
      "destroy", "end", "hopeless", "surgery", "retire", "sidelined", "critical",
    ],
  },
  {
    emotion: "triumph",
    words: [
      "comeback", "victory", "glory", "miracle", "triumph", "achiev", "champion", "gold medal",
      "return", "accomplish", "overcom", "conquer", "again", "back", "shine",
      "cheer", "world best", "record", "prove", "believ",
    ],
  },
  {
    emotion: "tension",
    words: [
      "decision", "resolve", "destiny", "gamble", "brink", "limit", "challeng", "fight",
      "rise", "desperate", "life-or-death", "razor", "final", "all-or-nothing",
    ],
  },
  {
    emotion: "quiet",
    words: [
      "quiet", "void", "nothing", "silence", "just", "alone", "still", "long",
      "stare", "wait", "endure", "days", "repeat",
    ],
  },
  {
    emotion: "warm",
    words: [
      "support", "teammate", "family", "grate", "love", "bond", "owe", "together",
      "beside", "encourage", "trust", "smile",
    ],
  },
];

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

function detectEmotion(text: string, locale: Locale): Emotion {
  const keywords = locale === "en" ? EMOTION_KEYWORDS_EN : EMOTION_KEYWORDS_JA;
  let best: Emotion = "neutral";
  let bestCount = 0;
  for (const { emotion, words } of keywords) {
    const lowerText = text.toLowerCase();
    const count = words.filter((w) => lowerText.includes(w.toLowerCase())).length;
    if (count > bestCount) {
      bestCount = count;
      best = emotion;
    }
  }
  return best;
}

const DASH_RE = /[\u2014\u2015\u2500\u30fc\-]{2,}/;

function splitIntoSegments(text: string, locale: Locale): Segment[] {
  const paragraphs = text.split(/\n+/).filter((p) => p.trim());
  const segments: Segment[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    const isQuote = locale === "ja"
      ? (trimmed.startsWith("\u300c") || trimmed.startsWith("\u300e") || trimmed.startsWith("\""))
      : (trimmed.startsWith("\"") || trimmed.startsWith("\u201c") || trimmed.startsWith("\u300c"));

    const sentenceRegex = locale === "en"
      ? /(?<=[.!?])\s+/g
      : /(?<=[\u3002\uff01\uff1f\u2026])/g;

    const sentences = trimmed
      .split(sentenceRegex)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const parts = sentences.length > 0 ? sentences : [trimmed];

    for (const sentence of parts) {
      if (DASH_RE.test(sentence)) {
        const subParts = sentence.split(DASH_RE).map((s) => s.trim()).filter((s) => s.length > 0);
        subParts.forEach((sub, i) => {
          const cleaned = sub.replace(/^[\u2014\u2015\u2500\u30fc\-]+|[\u2014\u2015\u2500\u30fc\-]+$/g, "").trim();
          if (!cleaned) return;
          segments.push({
            text: cleaned,
            isQuote,
            emotion: detectEmotion(cleaned, locale),
            hasExclamation: /\uff01|!/.test(cleaned),
            hasQuestion: /\uff1f|\?/.test(cleaned),
            hasEllipsis: /\u2026|\.\.\./.test(cleaned),
            hasDash: i < subParts.length - 1,
          });
        });
      } else {
        segments.push({
          text: sentence,
          isQuote,
          emotion: detectEmotion(sentence, locale),
          hasExclamation: /\uff01|!/.test(sentence),
          hasQuestion: /\uff1f|\?/.test(sentence),
          hasEllipsis: /\u2026|\.\.\./.test(sentence),
          hasDash: false,
        });
      }
    }
  }

  return segments;
}

function getVoiceParams(
  seg: Segment,
  stage: StoryStage,
  baseRate: number,
): { pitch: number; rate: number } {
  const stageTone = stage && STAGE_TONE[stage]
    ? STAGE_TONE[stage]
    : { pitchBase: 1.0, rateBase: 1.0 };

  let pitch = stageTone.pitchBase;
  let rate = baseRate * stageTone.rateBase;

  switch (seg.emotion) {
    case "sorrow":  pitch *= 0.90; rate *= 0.85; break;
    case "triumph": pitch *= 1.12; rate *= 1.05; break;
    case "tension": pitch *= 1.05; rate *= 0.92; break;
    case "quiet":   pitch *= 0.95; rate *= 0.82; break;
    case "warm":    pitch *= 1.06; rate *= 0.93; break;
  }

  if (seg.isQuote) { pitch *= 1.08; rate *= 0.90; }
  if (seg.hasExclamation) { pitch *= 1.10; rate *= 1.05; }
  if (seg.hasQuestion) { pitch *= 1.08; }
  if (seg.hasEllipsis) { rate *= 0.80; }

  pitch = Math.max(0.1, Math.min(2.0, pitch));
  rate = Math.max(0.1, Math.min(10.0, rate));

  return { pitch, rate };
}

export default function TextToSpeech({
  text,
  label,
  mode = "emotional",
  compact = false,
  stage = null,
  locale = "ja",
}: TextToSpeechProps) {
  const dict = getDictionary(locale);
  const defaultLabel = label ?? dict.tts.readAloud;

  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [rate, setRate] = useState(1.0);
  const [showControls, setShowControls] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const currentIndexRef = useRef(0);
  const rateRef = useRef(rate);

  useEffect(() => { rateRef.current = rate; }, [rate]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        voiceRef.current = findBestVoice(voices, locale);
        setVoiceReady(true);
      }
    };
    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => { speechSynthesis.removeEventListener("voiceschanged", loadVoices); };
  }, [locale]);

  useEffect(() => { return () => { speechSynthesis.cancel(); }; }, []);

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

      if (voiceRef.current) utterance.voice = voiceRef.current;
      utterance.lang = locale === "en" ? "en-US" : "ja-JP";

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
    [mode, stage, locale]
  );

  const handlePlay = useCallback(() => {
    if (status === "paused") { speechSynthesis.resume(); setStatus("playing"); return; }
    speechSynthesis.cancel();
    const segments = splitIntoSegments(text, locale);
    if (segments.length === 0) return;
    currentIndexRef.current = 0;
    setStatus("playing");
    setShowControls(true);
    speakSegment(segments, 0);
  }, [status, text, speakSegment, locale]);

  const handlePause = useCallback(() => { speechSynthesis.pause(); setStatus("paused"); }, []);

  const handleStop = useCallback(() => {
    speechSynthesis.cancel();
    setStatus("idle");
    setShowControls(false);
    currentIndexRef.current = 0;
  }, []);

  const handleRateChange = useCallback(
    (newRate: number) => {
      setRate(newRate);
      if (status === "playing") {
        speechSynthesis.cancel();
        const segments = splitIntoSegments(text, locale);
        speakSegment(segments, currentIndexRef.current);
      }
    },
    [status, text, speakSegment, locale]
  );

  if (typeof window !== "undefined" && !("speechSynthesis" in window)) return null;

  return (
    <div className="inline-flex items-center gap-2 flex-wrap">
      {status === "idle" ? (
        <button
          onClick={handlePlay}
          disabled={!voiceReady}
          className={`group inline-flex items-center gap-2 rounded-full transition-all duration-300 ${
            compact
              ? "h-8 w-8 justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
              : "px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-sm"
          } ${!voiceReady ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          title={defaultLabel}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent shrink-0">
            <path d="M8 5v14l11-7z" />
          </svg>
          {!compact && (
            <span className="text-muted group-hover:text-foreground transition-colors">{defaultLabel}</span>
          )}
        </button>
      ) : (
        <div className="inline-flex items-center gap-1.5">
          <button
            onClick={status === "playing" ? handlePause : handlePlay}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 hover:bg-accent/30 border border-accent/30 transition-all"
            title={status === "playing" ? dict.tts.pause : dict.tts.resume}
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
          <button
            onClick={handleStop}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            title={dict.tts.stop}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-muted">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </button>
          {status === "playing" && (
            <div className="flex items-center gap-0.5 ml-1" aria-label={dict.tts.speaking}>
              <span className="tts-bar h-3 w-0.5 rounded-full bg-accent" style={{ animationDelay: "0ms" }} />
              <span className="tts-bar h-4 w-0.5 rounded-full bg-accent" style={{ animationDelay: "150ms" }} />
              <span className="tts-bar h-2 w-0.5 rounded-full bg-accent" style={{ animationDelay: "300ms" }} />
              <span className="tts-bar h-5 w-0.5 rounded-full bg-accent" style={{ animationDelay: "100ms" }} />
              <span className="tts-bar h-3 w-0.5 rounded-full bg-accent" style={{ animationDelay: "250ms" }} />
            </div>
          )}
        </div>
      )}
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
