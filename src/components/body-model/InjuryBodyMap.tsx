"use client";

import { useState } from "react";
import type { InjuryRecord } from "@/lib/mock-data";

/** 2D coordinates for body regions on the SVG (viewBox 0 0 200 500) */
const REGION_POS: Record<string, { x: number; y: number }> = {
  head:             { x: 100, y: 38 },
  neck:             { x: 100, y: 72 },
  shoulder_left:    { x: 62,  y: 105 },
  shoulder_right:   { x: 138, y: 105 },
  upper_arm_left:   { x: 46,  y: 140 },
  upper_arm_right:  { x: 154, y: 140 },
  elbow_left:       { x: 38,  y: 170 },
  elbow_right:      { x: 162, y: 170 },
  forearm_left:     { x: 32,  y: 200 },
  forearm_right:    { x: 168, y: 200 },
  chest:            { x: 100, y: 130 },
  upper_back:       { x: 100, y: 140 },
  lower_back:       { x: 100, y: 190 },
  abdomen:          { x: 100, y: 170 },
  hip_left:         { x: 78,  y: 225 },
  hip_right:        { x: 122, y: 225 },
  thigh_left:       { x: 78,  y: 280 },
  thigh_right:      { x: 122, y: 280 },
  knee_left:        { x: 78,  y: 325 },
  knee_right:       { x: 122, y: 325 },
  shin_left:        { x: 78,  y: 365 },
  shin_right:       { x: 122, y: 365 },
  ankle_left:       { x: 78,  y: 410 },
  ankle_right:      { x: 122, y: 410 },
  foot_left:        { x: 78,  y: 440 },
  foot_right:       { x: 122, y: 440 },
  wrist_left:       { x: 26,  y: 225 },
  wrist_right:      { x: 174, y: 225 },
  hand_left:        { x: 22,  y: 245 },
  hand_right:       { x: 178, y: 245 },
  pelvis:           { x: 100, y: 215 },
  ribcage:          { x: 100, y: 150 },
  spine:            { x: 100, y: 165 },
  jaw:              { x: 100, y: 55 },
  eye_left:         { x: 90,  y: 32 },
  eye_right:        { x: 110, y: 32 },
  calf_left:        { x: 78,  y: 375 },
  calf_right:       { x: 122, y: 375 },
};

function getSeverityColor(severity: number) {
  if (severity >= 8) return { fill: "#ef4444", glow: "rgba(239,68,68,0.6)", label: "重症" };
  if (severity >= 5) return { fill: "#f97316", glow: "rgba(249,115,22,0.6)", label: "中度" };
  return { fill: "#facc15", glow: "rgba(250,204,21,0.6)", label: "軽度" };
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

export default function InjuryBodyMap({
  injuries,
}: {
  injuries: InjuryRecord[];
}) {
  const [selected, setSelected] = useState<InjuryRecord | null>(null);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Body SVG */}
        <div className="relative flex-shrink-0 mx-auto md:mx-0">
          <svg
            viewBox="0 0 200 470"
            className="w-56 sm:w-64 h-auto"
            style={{ filter: "drop-shadow(0 0 20px rgba(239,68,68,0.08))" }}
          >
            <defs>
              <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#64748b" stopOpacity="0.15" />
              </linearGradient>
              <filter id="markerGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Human silhouette */}
            <g fill="url(#bodyGrad)" stroke="#475569" strokeWidth="0.5" strokeOpacity="0.4">
              {/* Head */}
              <ellipse cx="100" cy="35" rx="18" ry="22" />
              {/* Neck */}
              <rect x="92" y="57" width="16" height="18" rx="4" />
              {/* Torso */}
              <path d="M68 75 Q64 75 62 100 L60 190 Q60 220 78 225 L82 225 Q88 215 100 215 Q112 215 118 225 L122 225 Q140 220 140 190 L138 100 Q136 75 132 75 Z" />
              {/* Left arm */}
              <path d="M62 100 Q50 105 46 130 L38 170 Q34 185 30 200 L24 230 Q20 245 24 248 Q28 250 30 245 L38 210 Q42 195 44 180 L50 150 Q54 130 62 115" opacity="0.9" />
              {/* Right arm */}
              <path d="M138 100 Q150 105 154 130 L162 170 Q166 185 170 200 L176 230 Q180 245 176 248 Q172 250 170 245 L162 210 Q158 195 156 180 L150 150 Q146 130 138 115" opacity="0.9" />
              {/* Left leg */}
              <path d="M78 225 Q72 240 72 270 L70 320 Q68 340 70 360 L72 400 Q73 420 70 440 Q68 452 74 454 Q80 454 80 445 L82 420 Q84 400 82 370 L80 330 Q80 310 82 280 L84 250 Q86 235 88 225 Z" opacity="0.9" />
              {/* Right leg */}
              <path d="M122 225 Q128 240 128 270 L130 320 Q132 340 130 360 L128 400 Q127 420 130 440 Q132 452 126 454 Q120 454 120 445 L118 420 Q116 400 118 370 L120 330 Q120 310 118 280 L116 250 Q114 235 112 225 Z" opacity="0.9" />
            </g>

            {/* Injury markers */}
            {injuries.map((injury) => {
              const pos = REGION_POS[injury.body_region];
              if (!pos) return null;
              const { fill, glow } = getSeverityColor(injury.severity);
              const isSelected = selected?.id === injury.id;
              const r = isSelected ? 9 : 6 + Math.min(injury.severity * 0.3, 3);

              return (
                <g
                  key={injury.id}
                  onClick={() => setSelected(isSelected ? null : injury)}
                  className="cursor-pointer"
                  filter="url(#markerGlow)"
                >
                  {/* Pulse ring for primary injuries */}
                  {injury.is_primary && (
                    <circle cx={pos.x} cy={pos.y} r={r} fill="none" stroke={fill} strokeWidth="1.5">
                      <animate attributeName="r" values={`${r};${r + 8};${r}`} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Marker dot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={r}
                    fill={fill}
                    opacity={isSelected ? 1 : 0.85}
                    stroke={isSelected ? "#fff" : "none"}
                    strokeWidth={isSelected ? 2 : 0}
                    style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
                  />
                  {/* Region label on hover/select */}
                  {isSelected && (
                    <text
                      x={pos.x}
                      y={pos.y - r - 6}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="8"
                      fontWeight="bold"
                    >
                      {getRegionLabel(injury.body_region)}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Injury cards */}
        <div className="flex-1 space-y-3">
          <h3 className="text-xs font-medium tracking-widest text-muted uppercase mb-4">主要な怪我</h3>
          {injuries.map((injury) => {
            const { fill, label } = getSeverityColor(injury.severity);
            const isSelected = selected?.id === injury.id;

            return (
              <button
                key={injury.id}
                onClick={() => setSelected(isSelected ? null : injury)}
                className={`flex w-full items-start gap-3 glass-card rounded-lg p-4 text-left text-sm transition-all ${
                  isSelected
                    ? "border-accent/40 bg-accent/5"
                    : "hover:border-accent/20"
                }`}
                style={
                  isSelected
                    ? { boxShadow: `0 0 20px ${fill}30` }
                    : undefined
                }
              >
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: fill,
                    boxShadow: `0 0 8px ${fill}80`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold">{injury.diagnosis}</p>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${fill}20`, color: fill }}
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
                    <p className="mt-2 text-foreground/80 leading-relaxed">
                      {injury.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}

          {/* Severity legend */}
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
