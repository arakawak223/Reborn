"use client";

import { useState } from "react";
import type { InjuryRecord } from "@/lib/mock-data";
import type { Locale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";

type ViewMode = "musculoskeletal" | "organs";

const REGION_POS_MUSCLE: Record<string, { x: number; y: number }> = {
  head: { x: 50, y: 3.5 }, jaw: { x: 50, y: 8.5 },
  eye_left: { x: 47, y: 3.5 }, eye_right: { x: 53, y: 3.5 },
  neck: { x: 50, y: 11.5 },
  shoulder_left: { x: 28, y: 16 }, shoulder_right: { x: 72, y: 16 },
  upper_arm_left: { x: 22, y: 23 }, upper_arm_right: { x: 78, y: 23 },
  elbow_left: { x: 17, y: 31 }, elbow_right: { x: 83, y: 31 },
  forearm_left: { x: 13, y: 38 }, forearm_right: { x: 87, y: 38 },
  wrist_left: { x: 9, y: 44 }, wrist_right: { x: 91, y: 44 },
  hand_left: { x: 6, y: 50 }, hand_right: { x: 94, y: 50 },
  chest: { x: 50, y: 22 }, ribcage: { x: 44, y: 28 },
  upper_back: { x: 50, y: 24 }, abdomen: { x: 50, y: 35 },
  spine: { x: 50, y: 30 }, lower_back: { x: 50, y: 38 },
  pelvis: { x: 50, y: 42 },
  hip_left: { x: 40, y: 44 }, hip_right: { x: 60, y: 44 },
  thigh_left: { x: 38, y: 55 }, thigh_right: { x: 62, y: 55 },
  knee_left: { x: 38, y: 64 }, knee_right: { x: 62, y: 64 },
  shin_left: { x: 38, y: 73 }, shin_right: { x: 62, y: 73 },
  calf_left: { x: 38, y: 75 }, calf_right: { x: 62, y: 75 },
  ankle_left: { x: 38, y: 84 }, ankle_right: { x: 62, y: 84 },
  foot_left: { x: 38, y: 92 }, foot_right: { x: 62, y: 92 },
};

const REGION_POS_ORGANS: Record<string, { x: number; y: number }> = {
  head: { x: 50, y: 7 }, jaw: { x: 50, y: 13 },
  eye_left: { x: 47, y: 7 }, eye_right: { x: 53, y: 7 },
  neck: { x: 50, y: 18 },
  shoulder_left: { x: 32, y: 24 }, shoulder_right: { x: 68, y: 24 },
  chest: { x: 50, y: 32 }, ribcage: { x: 44, y: 38 },
  upper_back: { x: 50, y: 34 }, abdomen: { x: 50, y: 50 },
  spine: { x: 50, y: 44 }, lower_back: { x: 50, y: 56 },
  pelvis: { x: 50, y: 68 },
  hip_left: { x: 40, y: 70 }, hip_right: { x: 60, y: 70 },
  upper_arm_left: { x: 22, y: 34 }, upper_arm_right: { x: 78, y: 34 },
  elbow_left: { x: 16, y: 46 }, elbow_right: { x: 84, y: 46 },
  forearm_left: { x: 12, y: 56 }, forearm_right: { x: 88, y: 56 },
  wrist_left: { x: 9, y: 64 }, wrist_right: { x: 91, y: 64 },
  hand_left: { x: 7, y: 70 }, hand_right: { x: 93, y: 70 },
  thigh_left: { x: 40, y: 82 }, thigh_right: { x: 60, y: 82 },
  knee_left: { x: 40, y: 94 }, knee_right: { x: 60, y: 94 },
};

function getSeverityInfo(severity: number, dict: ReturnType<typeof getDictionary>) {
  if (severity >= 8) return { color: "#ef4444", glow: "rgba(239,68,68,0.7)", label: dict.injury.severe, bg: "rgba(239,68,68,0.15)" };
  if (severity >= 5) return { color: "#f97316", glow: "rgba(249,115,22,0.7)", label: dict.injury.moderate, bg: "rgba(249,115,22,0.15)" };
  return { color: "#facc15", glow: "rgba(250,204,21,0.7)", label: dict.injury.mild, bg: "rgba(250,204,21,0.15)" };
}

export default function InjuryBodyMap({ injuries, locale = "ja" }: { injuries: InjuryRecord[]; locale?: Locale }) {
  const dict = getDictionary(locale);
  const isJa = locale === "ja";
  const [selected, setSelected] = useState<InjuryRecord | null>(null);
  const [view, setView] = useState<ViewMode>("musculoskeletal");

  const positions = view === "musculoskeletal" ? REGION_POS_MUSCLE : REGION_POS_ORGANS;

  const VIEW_CONFIG: Record<ViewMode, { label: string; src: string }> = {
    musculoskeletal: {
      label: dict.injury.musculoskeletal,
      src: "/Reborn/images/anatomy/muscular-front.png",
    },
    organs: {
      label: dict.injury.organs,
      src: "/Reborn/images/anatomy/organs-front.png",
    },
  };

  function getRegionLabel(region: string): string {
    return (dict.bodyRegions as Record<string, string>)[region] ?? region;
  }

  return (
    <div className="space-y-6">
      {/* View toggle */}
      <div className="flex gap-2">
        {(Object.entries(VIEW_CONFIG) as [ViewMode, { label: string }][]).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              view === key
                ? "bg-accent/20 text-accent border border-accent/40"
                : "text-muted border border-transparent hover:text-foreground hover:bg-foreground/5"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Anatomy image with markers */}
        <div className="relative flex-shrink-0 mx-auto lg:mx-0 w-72 sm:w-80">
          <div
            className="relative rounded-xl overflow-hidden border border-border/50"
            style={{ background: "linear-gradient(180deg, #0c0c1a 0%, #111125 100%)" }}
          >
            <img
              src={VIEW_CONFIG[view].src}
              alt={dict.injury.anatomyAlt.replace("{view}", VIEW_CONFIG[view].label)}
              className="w-full h-auto transition-opacity duration-300"
              style={{
                filter: "invert(0.88) hue-rotate(180deg) saturate(0.6) brightness(0.85)",
                opacity: 0.7,
                mixBlendMode: "screen",
              }}
            />

            {injuries.map((injury) => {
              const pos = positions[injury.body_region];
              if (!pos) return null;
              const { color, glow } = getSeverityInfo(injury.severity, dict);
              const isSelected = selected?.id === injury.id;
              const size = isSelected ? 18 : 12 + Math.min(injury.severity * 0.5, 4);

              return (
                <button
                  key={injury.id}
                  onClick={(e) => { e.stopPropagation(); setSelected(isSelected ? null : injury); }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: size, height: size }}
                  title={`${injury.diagnosis}${isJa ? "\uff08" : " ("}${getRegionLabel(injury.body_region)}${isJa ? "\uff09" : ")"}`}
                >
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      backgroundColor: color,
                      opacity: isSelected ? 0.4 : 0.25,
                      animationDuration: injury.is_primary ? "1.5s" : "2.5s",
                    }}
                  />
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 ${isSelected ? 16 : 10}px ${glow}, 0 0 ${isSelected ? 30 : 16}px ${glow}`,
                      border: isSelected ? "2px solid #fff" : "1px solid rgba(255,255,255,0.3)",
                    }}
                  />
                  {isSelected && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-0.5 text-[10px] font-bold text-white"
                      style={{ bottom: size + 6, boxShadow: `0 0 8px ${glow}` }}
                    >
                      {getRegionLabel(injury.body_region)}
                    </span>
                  )}
                </button>
              );
            })}

            <p className="absolute bottom-1 right-2 text-[8px] text-white/20">
              Wikimedia Commons (Public Domain)
            </p>
          </div>
        </div>

        {/* Injury detail cards */}
        <div className="flex-1 space-y-3">
          <h3 className="text-xs font-medium tracking-widest text-muted uppercase mb-4">
            {dict.injury.injuryList.replace("{n}", String(injuries.length))}
          </h3>

          {injuries.map((injury) => {
            const { color, label, bg } = getSeverityInfo(injury.severity, dict);
            const isSelected = selected?.id === injury.id;

            return (
              <button
                key={injury.id}
                onClick={() => setSelected(isSelected ? null : injury)}
                className={`flex w-full items-start gap-3 glass-card rounded-lg p-4 text-left text-sm transition-all ${
                  isSelected ? "border-accent/40" : "hover:border-accent/20"
                }`}
                style={isSelected ? { boxShadow: `0 0 20px ${color}25`, backgroundColor: `${color}08` } : undefined}
              >
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold">{injury.diagnosis}</p>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: bg, color }}
                    >
                      {label}
                    </span>
                    {injury.is_primary && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-accent/10 text-accent">
                        {dict.injury.primary}
                      </span>
                    )}
                  </div>
                  <p className="text-muted mt-1">
                    {getRegionLabel(injury.body_region)} \u2014 {injury.injury_type}
                  </p>
                  <p className="text-muted mt-0.5">
                    {injury.year_occurred}{isJa ? `\u5e74 / \u56de\u5fa9 ${injury.recovery_months}\u30f6\u6708` : ` / ${injury.recovery_months} months recovery`}
                  </p>
                  {isSelected && (
                    <p className="mt-2 text-foreground/80 leading-relaxed border-t border-border/30 pt-2">
                      {injury.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}

          {/* Legend */}
          <div className="flex items-center gap-4 pt-3 text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ef4444" }} />
              {dict.injury.severe} (8-10)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#f97316" }} />
              {dict.injury.moderate} (5-7)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#facc15" }} />
              {dict.injury.mild} (1-4)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
