/**
 * CoeFont API client — fetches audio via Cloudflare Worker proxy.
 */

const PROXY_URL = process.env.NEXT_PUBLIC_COEFONT_PROXY_URL ?? "";
const VOICE_ID = process.env.NEXT_PUBLIC_COEFONT_VOICE_ID ?? "";

/** Whether CoeFont is configured and available */
export function isCoefontAvailable(): boolean {
  return PROXY_URL !== "" && VOICE_ID !== "";
}

// ---------------------------------------------------------------------------
// Parameter conversion helpers
// ---------------------------------------------------------------------------

/** Web Speech pitch (0.88-1.12 range) → CoeFont pitch in cents (-300 ~ +300) */
export function convertPitch(webPitch: number): number {
  return Math.round((webPitch - 1.0) * 300);
}

/** Web Speech rate → CoeFont speed (clamped 0.5-3.0) */
export function convertSpeed(webRate: number): number {
  return Math.max(0.5, Math.min(3.0, webRate));
}

type Emotion = "neutral" | "sorrow" | "triumph" | "tension" | "quiet" | "warm";

/** Emotion → CoeFont intonation (0-2 scale) */
export function convertIntonation(emotion: Emotion): number {
  switch (emotion) {
    case "sorrow":  return 0.7;
    case "triumph": return 1.6;
    case "tension": return 1.4;
    case "quiet":   return 0.5;
    case "warm":    return 1.2;
    default:        return 1.0;
  }
}

/** Segment pause characteristics → CoeFont kuten/toten pauses */
export function convertPauses(hasDash: boolean, hasEllipsis: boolean): { kuten: number; toten: number } {
  if (hasDash)     return { kuten: 700, toten: 400 };
  if (hasEllipsis) return { kuten: 600, toten: 350 };
  return { kuten: 400, toten: 200 };
}

// ---------------------------------------------------------------------------
// Text splitting (CoeFont has a 1000 char limit per request)
// ---------------------------------------------------------------------------

/** Split text at sentence boundaries, keeping each chunk under maxLength */
export function splitTextIntoChunks(text: string, maxLength = 900): string[] {
  if (text.length <= maxLength) return [text];

  const sentenceRegex = /(?<=[\u3002\uff01\uff1f\u2026])/g;
  const sentences = text.split(sentenceRegex).filter((s) => s.trim().length > 0);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current.length + sentence.length > maxLength) {
      if (current) chunks.push(current);
      // If a single sentence exceeds maxLength, force-split it
      if (sentence.length > maxLength) {
        for (let i = 0; i < sentence.length; i += maxLength) {
          chunks.push(sentence.slice(i, i + maxLength));
        }
        current = "";
      } else {
        current = sentence;
      }
    } else {
      current += sentence;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

// ---------------------------------------------------------------------------
// Client-side cache
// ---------------------------------------------------------------------------

const MAX_CACHE_SIZE = 50;
const audioCache = new Map<string, Blob>();

function cacheKey(text: string, pitch: number, speed: number, intonation: number): string {
  return `${text}|${pitch}|${speed}|${intonation}`;
}

function putCache(key: string, blob: Blob): void {
  if (audioCache.size >= MAX_CACHE_SIZE) {
    // Evict oldest entry
    const firstKey = audioCache.keys().next().value;
    if (firstKey !== undefined) audioCache.delete(firstKey);
  }
  audioCache.set(key, blob);
}

// ---------------------------------------------------------------------------
// Fetch audio
// ---------------------------------------------------------------------------

export interface CoefontParams {
  text: string;
  pitch?: number;       // cents, -300 ~ +300
  speed?: number;       // 0.5 ~ 3.0
  intonation?: number;  // 0 ~ 2
  kuten?: number;       // pause at period (ms)
  toten?: number;       // pause at comma (ms)
}

const TIMEOUT_MS = 10_000;
const MAX_RETRIES = 1;

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Fetch audio blob from CoeFont via proxy. Returns null on failure. */
export async function fetchCoefontAudio(params: CoefontParams): Promise<Blob | null> {
  if (!isCoefontAvailable()) return null;

  const key = cacheKey(
    params.text,
    params.pitch ?? 0,
    params.speed ?? 1.0,
    params.intonation ?? 1.0,
  );
  const cached = audioCache.get(key);
  if (cached) return cached;

  const body = JSON.stringify({
    coefont: VOICE_ID,
    text: params.text,
    ...(params.pitch !== undefined && { pitch: params.pitch }),
    ...(params.speed !== undefined && { speed: params.speed }),
    ...(params.intonation !== undefined && { intonation: params.intonation }),
    ...(params.kuten !== undefined && { kuten: params.kuten }),
    ...(params.toten !== undefined && { toten: params.toten }),
  });

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(
        PROXY_URL,
        { method: "POST", headers: { "Content-Type": "application/json" }, body },
        TIMEOUT_MS,
      );
      if (!res.ok) {
        console.warn(`CoeFont API error (attempt ${attempt + 1}): ${res.status}`);
        continue;
      }
      const blob = await res.blob();
      putCache(key, blob);
      return blob;
    } catch (err) {
      console.warn(`CoeFont fetch failed (attempt ${attempt + 1}):`, err);
    }
  }
  return null;
}
