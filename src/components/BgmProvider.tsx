"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useCallback, useState } from "react";
import { getBgmForPath } from "@/lib/bgm-config";

const FADE_DURATION = 1200; // ms
const VOLUME = 0.35;

export default function BgmProvider() {
  const pathname = usePathname();
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef<string>("");
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const fadingRef = useRef(false);

  // Fade out an audio element and clean up
  const fadeOut = useCallback((audio: HTMLAudioElement) => {
    const startVol = audio.volume;
    const steps = 20;
    const stepTime = FADE_DURATION / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      audio.volume = Math.max(0, startVol * (1 - step / steps));
      if (step >= steps) {
        clearInterval(interval);
        audio.pause();
        audio.src = "";
        audio.load();
      }
    }, stepTime);
  }, []);

  // Fade in an audio element
  const fadeIn = useCallback((audio: HTMLAudioElement, targetVol: number) => {
    audio.volume = 0;
    const steps = 20;
    const stepTime = FADE_DURATION / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      audio.volume = Math.min(targetVol, targetVol * (step / steps));
      if (step >= steps) {
        clearInterval(interval);
        fadingRef.current = false;
      }
    }, stepTime);
  }, []);

  // Start or switch BGM based on pathname
  const playBgm = useCallback(
    (targetSrc: string) => {
      if (fadingRef.current) return;

      // Already playing this track
      if (currentSrcRef.current === targetSrc && currentAudioRef.current) {
        return;
      }

      fadingRef.current = true;

      // Fade out old track
      if (currentAudioRef.current) {
        fadeOut(currentAudioRef.current);
      }

      // Create and play new track
      const newAudio = new Audio(targetSrc);
      newAudio.loop = true;
      newAudio.volume = 0;
      currentAudioRef.current = newAudio;
      currentSrcRef.current = targetSrc;

      newAudio
        .play()
        .then(() => {
          fadeIn(newAudio, muted ? 0 : VOLUME);
        })
        .catch(() => {
          // Autoplay blocked — will try again on user interaction
          fadingRef.current = false;
        });
    },
    [fadeOut, fadeIn, muted]
  );

  // Try autoplay on mount and on first user interaction
  useEffect(() => {
    const targetSrc = getBgmForPath(pathname);

    if (!started) {
      // Try autoplay first
      const audio = new Audio(targetSrc);
      audio.loop = true;
      audio.volume = VOLUME;
      const playPromise = audio.play();

      if (playPromise) {
        playPromise
          .then(() => {
            currentAudioRef.current = audio;
            currentSrcRef.current = targetSrc;
            setStarted(true);
          })
          .catch(() => {
            // Autoplay blocked — wait for user interaction
            audio.pause();
            audio.src = "";

            const startOnInteraction = () => {
              document.removeEventListener("click", startOnInteraction);
              document.removeEventListener("touchstart", startOnInteraction);
              document.removeEventListener("keydown", startOnInteraction);
              setStarted(true);
            };
            document.addEventListener("click", startOnInteraction);
            document.addEventListener("touchstart", startOnInteraction);
            document.addEventListener("keydown", startOnInteraction);
          });
      }

      return;
    }

    playBgm(targetSrc);
  }, [pathname, started, playBgm]);

  // When started becomes true from user interaction, start playing
  useEffect(() => {
    if (started && !currentAudioRef.current) {
      const targetSrc = getBgmForPath(pathname);
      const audio = new Audio(targetSrc);
      audio.loop = true;
      audio.volume = muted ? 0 : VOLUME;
      audio.play().catch(() => {});
      currentAudioRef.current = audio;
      currentSrcRef.current = targetSrc;
    }
  }, [started, pathname, muted]);

  // Handle mute/unmute
  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (currentAudioRef.current) {
        if (next) {
          currentAudioRef.current.volume = 0;
        } else {
          currentAudioRef.current.volume = VOLUME;
          // If not started yet, start on this interaction
          if (!started) {
            setStarted(true);
          }
        }
      }
      return next;
    });
  }, [started]);

  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? "BGMをオンにする" : "BGMをオフにする"}
      title={muted ? "BGMをオンにする" : "BGMをオフにする"}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 shadow-lg"
    >
      {muted ? (
        // Muted icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        // Playing icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
