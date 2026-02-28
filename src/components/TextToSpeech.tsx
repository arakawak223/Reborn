"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";
import {
  isCoefontAvailable,
  fetchCoefontAudio,
  convertPitch,
  convertSpeed,
  convertIntonation,
  splitTextIntoChunks,
  type CoefontParams,
} from "@/lib/coefont-client";
import { applyReadingDict } from "@/lib/coefont-dictionary";

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
  "Google 日本語",
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
      ? (trimmed.startsWith("「") || trimmed.startsWith("『") || trimmed.startsWith("\""))
      : (trimmed.startsWith("\"") || trimmed.startsWith("\u201c") || trimmed.startsWith("「"));

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

// ---------------------------------------------------------------------------
// CoeFont helpers
// ---------------------------------------------------------------------------

/** Merge paragraphs into chunks for CoeFont, keeping each under 900 chars.
 *  Newlines become "。" so CoeFont inserts a natural pause at paragraph boundaries. */
function splitIntoParagraphChunks(text: string): string[] {
  const paragraphs = text.split(/\n+/).map((p) => p.trim()).filter((p) => p.length > 0);
  // Merge paragraphs into as few chunks as possible (max 900 chars each)
  const chunks: string[] = [];
  let current = "";
  for (const para of paragraphs) {
    const separator = current ? "。" : "";
    if (current.length + separator.length + para.length <= 900) {
      current += separator + para;
    } else {
      if (current) chunks.push(current);
      if (para.length > 900) {
        chunks.push(...splitTextIntoChunks(para, 900));
        current = "";
      } else {
        current = para;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks.length > 0 ? chunks : [text];
}

function buildCoefontParamsForText(text: string, stage: StoryStage, baseRate: number, locale: Locale): CoefontParams {
  const emotion = detectEmotion(text, locale);
  const stageTone = stage && STAGE_TONE[stage] ? STAGE_TONE[stage] : { pitchBase: 1.0, rateBase: 1.0 };
  let pitch = stageTone.pitchBase;
  let rate = baseRate * stageTone.rateBase;

  switch (emotion) {
    case "sorrow":  pitch *= 0.95; rate *= 0.92; break;
    case "triumph": pitch *= 1.06; rate *= 1.02; break;
    case "tension": pitch *= 1.03; rate *= 0.95; break;
    case "quiet":   pitch *= 0.97; rate *= 0.90; break;
    case "warm":    pitch *= 1.03; rate *= 0.96; break;
  }

  return {
    text: locale === "ja" ? applyReadingDict(text) : text,
    pitch: convertPitch(pitch),
    speed: convertSpeed(rate),
    intonation: convertIntonation(emotion),
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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

  const [status, setStatus] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [rate, setRate] = useState(1.0);
  const [showControls, setShowControls] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const currentIndexRef = useRef(0);
  const rateRef = useRef(rate);

  // CoeFont state
  const useCoefont = locale === "ja" && isCoefontAvailable();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const stoppedRef = useRef(false);
  const prefetchRef = useRef<Promise<Blob | null> | null>(null);

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  // Revoke previous blob URL helper
  const revokeBlobUrl = useCallback(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, []);

  // ---------------------------------------------------------------------------
  // CoeFont playback
  // ---------------------------------------------------------------------------

  const speakChunksCoefont = useCallback(
    async (chunks: string[], index: number, fallbackToWebSpeech: () => void) => {
      if (stoppedRef.current || index >= chunks.length) {
        if (!stoppedRef.current) {
          setStatus("idle");
          setShowControls(false);
          currentIndexRef.current = 0;
        }
        return;
      }

      const chunkText = chunks[index];
      const params = buildCoefontParamsForText(chunkText, stage, rateRef.current, locale);

      // Use prefetched blob if available
      let blob: Blob | null = null;
      if (prefetchRef.current) {
        blob = await prefetchRef.current;
        prefetchRef.current = null;
      }
      if (!blob) {
        blob = await fetchCoefontAudio(params);
      }

      if (!blob) {
        console.warn("CoeFont failed, falling back to Web Speech API");
        fallbackToWebSpeech();
        return;
      }

      if (stoppedRef.current) return;

      // Prefetch next chunk
      if (index + 1 < chunks.length) {
        const nextParams = buildCoefontParamsForText(chunks[index + 1], stage, rateRef.current, locale);
        prefetchRef.current = fetchCoefontAudio(nextParams);
      }

      // Play audio
      revokeBlobUrl();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      await new Promise<void>((resolve, reject) => {
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error("Audio playback error"));
        audio.play().catch(reject);
      }).catch(() => {
        console.warn("CoeFont playback error, falling back to Web Speech API");
        fallbackToWebSpeech();
        return;
      });

      if (stoppedRef.current) return;

      // Short pause between paragraphs
      currentIndexRef.current = index + 1;
      await new Promise((r) => setTimeout(r, 300));

      if (!stoppedRef.current) {
        speakChunksCoefont(chunks, index + 1, fallbackToWebSpeech);
      }
    },
    [stage, locale, revokeBlobUrl],
  );

  // ---------------------------------------------------------------------------
  // Web Speech API playback (for English, or CoeFont fallback)
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handlePlay = useCallback(() => {
    if (status === "paused") {
      if (useCoefont && audioRef.current) {
        audioRef.current.play();
        setStatus("playing");
      } else {
        speechSynthesis.resume();
        setStatus("playing");
      }
      return;
    }

    // Stop any current playback
    speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    stoppedRef.current = false;

    currentIndexRef.current = 0;

    if (useCoefont) {
      const chunks = splitIntoParagraphChunks(text);
      if (chunks.length === 0) return;

      setStatus("loading");
      setShowControls(true);

      const segments = splitIntoSegments(text, locale);
      const fallbackToWebSpeech = () => {
        stoppedRef.current = true;
        revokeBlobUrl();
        setStatus("playing");
        speakSegment(segments, currentIndexRef.current);
      };

      speakChunksCoefont(chunks, 0, fallbackToWebSpeech);

      const checkPlaying = () => {
        if (audioRef.current && !stoppedRef.current) {
          setStatus("playing");
        }
      };
      setTimeout(checkPlaying, 200);
    } else {
      const segments = splitIntoSegments(text, locale);
      if (segments.length === 0) return;
      setStatus("playing");
      setShowControls(true);
      speakSegment(segments, 0);
    }
  }, [status, text, speakSegment, speakChunksCoefont, locale, useCoefont, revokeBlobUrl]);

  const handlePause = useCallback(() => {
    if (useCoefont && audioRef.current) {
      audioRef.current.pause();
    } else {
      speechSynthesis.pause();
    }
    setStatus("paused");
  }, [useCoefont]);

  const handleStop = useCallback(() => {
    stoppedRef.current = true;
    speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    revokeBlobUrl();
    prefetchRef.current = null;
    setStatus("idle");
    setShowControls(false);
    currentIndexRef.current = 0;
  }, [revokeBlobUrl]);

  const handleRateChange = useCallback(
    (newRate: number) => {
      setRate(newRate);
      if (status === "playing") {
        if (useCoefont) {
          handleStop();
          setTimeout(() => {
            stoppedRef.current = false;
            const chunks = splitIntoParagraphChunks(text);
            setStatus("loading");
            setShowControls(true);
            const segments = splitIntoSegments(text, locale);
            const fallbackToWebSpeech = () => {
              stoppedRef.current = true;
              revokeBlobUrl();
              setStatus("playing");
              speakSegment(segments, currentIndexRef.current);
            };
            speakChunksCoefont(chunks, currentIndexRef.current, fallbackToWebSpeech);
            setTimeout(() => {
              if (audioRef.current && !stoppedRef.current) setStatus("playing");
            }, 200);
          }, 50);
        } else {
          speechSynthesis.cancel();
          const segments = splitIntoSegments(text, locale);
          speakSegment(segments, currentIndexRef.current);
        }
      }
    },
    [status, text, speakSegment, speakChunksCoefont, locale, useCoefont, handleStop, revokeBlobUrl]
  );

  if (typeof window !== "undefined" && !("speechSynthesis" in window) && !useCoefont) return null;

  const isReady = useCoefont || voiceReady;
  const loadingLabel = dict.tts.loading;

  return (
    <div className="inline-flex items-center gap-2 flex-wrap">
      {status === "idle" ? (
        <button
          onClick={handlePlay}
          disabled={!isReady}
          className={`group inline-flex items-center gap-2 rounded-full transition-all duration-300 ${
            compact
              ? "h-8 w-8 justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
              : "px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-sm"
          } ${!isReady ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          title={defaultLabel}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent shrink-0">
            <path d="M8 5v14l11-7z" />
          </svg>
          {!compact && (
            <span className="text-muted group-hover:text-foreground transition-colors">{defaultLabel}</span>
          )}
        </button>
      ) : status === "loading" ? (
        <div className="inline-flex items-center gap-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 border border-accent/30">
            <svg className="animate-spin h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <button
            onClick={handleStop}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            title={dict.tts.stop}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-muted">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </button>
          {!compact && (
            <span className="text-xs text-muted">{loadingLabel}</span>
          )}
        </div>
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
