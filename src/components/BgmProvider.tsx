"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getBgmForPath } from "@/lib/bgm-config";
import type { Locale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";

const FADE_MS = 1000;
const VOLUME = 0.35;
const FADE_STEPS = 20;

function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  onDone?: () => void
) {
  let step = 0;
  const delta = (to - from) / FADE_STEPS;
  const interval = setInterval(() => {
    step++;
    audio.volume = Math.min(1, Math.max(0, from + delta * step));
    if (step >= FADE_STEPS) {
      clearInterval(interval);
      onDone?.();
    }
  }, FADE_MS / FADE_STEPS);
  return interval;
}

export default function BgmProvider({ locale = "ja" }: { locale?: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const srcRef = useRef("");
  const mutedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const startTrack = (src: string) => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = mutedRef.current ? 0 : VOLUME;
    audioRef.current = audio;
    srcRef.current = src;
    audio.play().then(() => setPlaying(true)).catch(() => {});
  };

  const switchTrack = (newSrc: string) => {
    const old = audioRef.current;
    if (old) {
      const oldVol = old.volume;
      fadeVolume(old, oldVol, 0, () => { old.pause(); old.src = ""; });
    }
    const audio = new Audio(newSrc);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    srcRef.current = newSrc;
    audio.play().then(() => {
      fadeVolume(audio, 0, mutedRef.current ? 0 : VOLUME);
      setPlaying(true);
    }).catch(() => {});
  };

  useEffect(() => {
    const src = getBgmForPath(pathname);
    startTrack(src);
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newSrc = getBgmForPath(pathname);
    if (newSrc === srcRef.current) return;
    switchTrack(newSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio || audio.paused) {
      if (audio) { audio.pause(); audio.src = ""; }
      const src = getBgmForPath(pathname);
      const newAudio = new Audio(src);
      newAudio.loop = true;
      newAudio.volume = VOLUME;
      audioRef.current = newAudio;
      srcRef.current = src;
      newAudio.play().then(() => { setPlaying(true); setMuted(false); }).catch(() => {});
      return;
    }
    if (muted) { audio.volume = VOLUME; setMuted(false); }
    else { audio.volume = 0; setMuted(true); }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={muted || !playing ? dict.bgm.on : dict.bgm.off}
      title={muted || !playing ? dict.bgm.on : dict.bgm.off}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 shadow-lg"
    >
      {muted || !playing ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
