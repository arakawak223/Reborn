"use client";

import { useState } from "react";
import type { InjuryRecord } from "@/lib/mock-data";

type ViewMode = "musculoskeletal" | "organs";

const VIEW_CONFIG: Record<ViewMode, { label: string; src: string }> = {
  musculoskeletal: {
    label: "筋肉・骨格",
    src: "/Reborn/images/anatomy/muscular-front.png",
  },
  organs: {
    label: "内臓",
    src: "/Reborn/images/anatomy/organs-front.png",
  },
};

/**
 * Injury marker positions as percentage of the musculoskeletal image (791×1342).
 * Each region maps to { x%, y% } on the image.
 */
const REGION_POS_MUSCLE: Record<string, { x: number; y: number }> = {
  head:             { x: 50,  y: 5 },
  jaw:              { x: 50,  y: 8 },
  eye_left:         { x: 47,  y: 4 },
  eye_right:        { x: 53,  y: 4 },
  neck:             { x: 50,  y: 12 },
  shoulder_left:    { x: 32,  y: 17 },
  shoulder_right:   { x: 68,  y: 17 },
  upper_arm_left:   { x: 24,  y: 24 },
  upper_arm_right:  { x: 76,  y: 24 },
  elbow_left:       { x: 19,  y: 32 },
  elbow_right:      { x: 81,  y: 32 },
  forearm_left:     { x: 15,  y: 39 },
  forearm_right:    { x: 85,  y: 39 },
  wrist_left:       { x: 11,  y: 46 },
  wrist_right:      { x: 89,  y: 46 },
  hand_left:        { x: 8,   y: 51 },
  hand_right:       { x: 92,  y: 51 },
  chest:            { x: 50,  y: 24 },
  ribcage:          { x: 50,  y: 27 },
  upper_back:       { x: 50,  y: 26 },
  abdomen:          { x: 50,  y: 36 },
  spine:            { x: 50,  y: 32 },
  lower_back:       { x: 50,  y: 40 },
  pelvis:           { x: 50,  y: 44 },
  hip_left:         { x: 40,  y: 46 },
  hip_right:        { x: 60,  y: 46 },
  thigh_left:       { x: 39,  y: 56 },
  thigh_right:      { x: 61,  y: 56 },
  knee_left:        { x: 39,  y: 65 },
  knee_right:       { x: 61,  y: 65 },
  shin_left:        { x: 39,  y: 73 },
  shin_right:       { x: 61,  y: 73 },
  calf_left:        { x: 39,  y: 75 },
  calf_right:       { x: 61,  y: 75 },
  ankle_left:       { x: 39,  y: 84 },
  ankle_right:      { x: 61,  y: 84 },
  foot_left:        { x: 39,  y: 90 },
  foot_right:       { x: 61,  y: 90 },
};

/**
 * Organ view positions (organs-front.png is upper-body focused, 3029×2693).
 * Adjusted for the different image proportions.
 */
const REGION_POS_ORGANS: Record<string, { x: number; y: number }> = {
  head:             { x: 50,  y: 5 },
  jaw:              { x: 50,  y: 10 },
  eye_left:         { x: 46,  y: 3 },
  eye_right:        { x: 54,  y: 3 },
  neck:             { x: 50,  y: 17 },
  shoulder_left:    { x: 30,  y: 25 },
  shoulder_right:   { x: 70,  y: 25 },
  chest:            { x: 50,  y: 33 },
  ribcage:          { x: 50,  y: 38 },
  upper_back:       { x: 50,  y: 35 },
  abdomen:          { x: 50,  y: 52 },
  spine:            { x: 50,  y: 45 },
  lower_back:       { x: 50,  y: 58 },
  pelvis:           { x: 50,  y: 68 },
  hip_left:         { x: 38,  y: 72 },
  hip_right:        { x: 62,  y: 72 },
  upper_arm_left:   { x: 20,  y: 35 },
  upper_arm_right:  { x: 80,  y: 35 },
  elbow_left:       { x: 14,  y: 48 },
  elbow_right:      { x: 86,  y: 48 },
  forearm_left:     { x: 10,  y: 58 },
  forearm_right:    { x: 90,  y: 58 },
  thigh_left:       { x: 40,  y: 82 },
  thigh_right:      { x: 60,  y: 82 },
  knee_left:        { x: 40,  y: 92 },
  knee_right:       { x: 60,  y: 92 },
};

function getSeverityInfo(severity: number) {
  if (severity >= 8) return { color: "#ef4444", glow: "rgba(239,68,68,0.7)", label: "重症", bg: "rgba(239,68,68,0.15)" };
  if (severity >= 5) return { color: "#f97316", glow: "rgba(249,115,22,0.7)", label: "中度", bg: "rgba(249,115,22,0.15)" };
  return { color: "#facc15", glow: "rgba(250,204,21,0.7)", label: "軽度", bg: "rgba(250,204,21,0.15)" };
}

function getRegionLabel(region: string): string {
  const labels: Record<string, string> = {
    head: "頭部", neck: "首", shoulder_left: "左肩", shoulder_right: "右肩",
    upper_arm_left: "左上腕", upper_arm_right: "右上腕", elbow_left: "左肘", elbow_right: "右肘",
    forearm_left: "左前腕", forearm_right: "右前腕", chest: "胸部", upper_back: "上背部",
    lower_back: "腰部", abdomen: "腹部", hip_left: "左股関節", hip_right: "右股関節",
    thigh_left: "左太もも", thigh_right: "右太もも", knee_left: "左膝", knee_right: "右膝",
    ankle_left: "左足首", ankle_right: "右足首", foot_left: "左足", foot_right: "右足",
    pelvis: "骨盤", ribcage: "肋骨", spine: "脊椎", jaw: "顎",
    eye_left: "左眼", eye_right: "右眼", wrist_left: "左手首", wrist_right: "右手首",
    hand_left: "左手", hand_right: "右手", shin_left: "左脛", shin_right: "右脛",
    calf_left: "左ふくらはぎ", calf_right: "右ふくらはぎ",
  };
  return labels[region] ?? region;
}

export default function InjuryBodyMap({ injuries }: { injuries: InjuryRecord[] }) {
  const [selected, setSelected] = useState<InjuryRecord | null>(null);
  const [view, setView] = useState<ViewMode>("musculoskeletal");

  const positions = view === "musculoskeletal" ? REGION_POS_MUSCLE : REGION_POS_ORGANS;

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
            {/* Anatomy image */}
            <img
              src={VIEW_CONFIG[view].src}
              alt={`人体解剖図（${VIEW_CONFIG[view].label}）`}
              className="w-full h-auto transition-opacity duration-300"
              style={{
                filter: "invert(0.88) hue-rotate(180deg) saturate(0.6) brightness(0.85)",
                opacity: 0.7,
                mixBlendMode: "screen",
              }}
            />

            {/* Injury markers overlay */}
            {injuries.map((injury) => {
              const pos = positions[injury.body_region];
              if (!pos) return null;
              const { color, glow } = getSeverityInfo(injury.severity);
              const isSelected = selected?.id === injury.id;
              const size = isSelected ? 18 : 12 + Math.min(injury.severity * 0.5, 4);

              return (
                <button
                  key={injury.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(isSelected ? null : injury);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: size,
                    height: size,
                  }}
                  title={`${injury.diagnosis}（${getRegionLabel(injury.body_region)}）`}
                >
                  {/* Pulse ring */}
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      backgroundColor: color,
                      opacity: isSelected ? 0.4 : 0.25,
                      animationDuration: injury.is_primary ? "1.5s" : "2.5s",
                    }}
                  />
                  {/* Core dot */}
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 ${isSelected ? 16 : 10}px ${glow}, 0 0 ${isSelected ? 30 : 16}px ${glow}`,
                      border: isSelected ? "2px solid #fff" : "1px solid rgba(255,255,255,0.3)",
                    }}
                  />
                  {/* Label on select */}
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

            {/* Attribution */}
            <p className="absolute bottom-1 right-2 text-[8px] text-white/20">
              Wikimedia Commons (Public Domain)
            </p>
          </div>
        </div>

        {/* Injury detail cards */}
        <div className="flex-1 space-y-3">
          <h3 className="text-xs font-medium tracking-widest text-muted uppercase mb-4">
            怪我一覧（{injuries.length}件）
          </h3>

          {injuries.map((injury) => {
            const { color, label, bg } = getSeverityInfo(injury.severity);
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
                        主傷
                      </span>
                    )}
                  </div>
                  <p className="text-muted mt-1">
                    {getRegionLabel(injury.body_region)} — {injury.injury_type}
                  </p>
                  <p className="text-muted mt-0.5">
                    {injury.year_occurred}年 / 回復 {injury.recovery_months}ヶ月
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
              重症 (8-10)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#f97316" }} />
              中度 (5-7)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#facc15" }} />
              軽度 (1-4)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
