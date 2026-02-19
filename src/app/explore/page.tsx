"use client";

import { useState } from "react";
import Link from "next/link";
import { searchInjuries } from "@/lib/mock-data";
import type { InjuryRecord, AthleteProfile } from "@/lib/mock-data";

const BODY_GROUPS: Record<string, { label: string; regions: string[] }> = {
  head: { label: "頭・首", regions: ["head", "neck"] },
  upper: { label: "上半身", regions: ["chest", "upper_back", "lower_back", "abdomen", "shoulder_left", "shoulder_right", "upper_arm_left", "upper_arm_right", "elbow_left", "elbow_right", "forearm_left", "forearm_right"] },
  lower: { label: "下半身", regions: ["hip_left", "hip_right", "thigh_left", "thigh_right", "knee_left", "knee_right", "ankle_left", "ankle_right", "foot_left", "foot_right"] },
};

const INJURY_TYPES = [
  { value: "fracture", label: "骨折" },
  { value: "tear", label: "断裂" },
  { value: "rupture", label: "破裂" },
  { value: "sprain", label: "捻挫" },
  { value: "other", label: "その他" },
];

type SearchResult = InjuryRecord & { athletes: AthleteProfile };

export default function ExplorePage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    setSearched(true);
    setResults(searchInjuries(selectedRegion, selectedType) as SearchResult[]);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">
        <span className="gradient-text">探索</span>
      </h1>
      <p className="mt-2 text-muted">
        怪我の部位や種類から、同じ困難を乗り越えたアスリートを探す
      </p>

      {/* Filters */}
      <div className="mt-8 space-y-6">
        <div>
          <p className="text-xs font-medium tracking-widest text-muted uppercase">怪我の部位</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(BODY_GROUPS).map(([key, { label, regions }]) => (
              <button
                key={key}
                onClick={() => {
                  const first = regions[0];
                  setSelectedRegion(selectedRegion && regions.includes(selectedRegion) ? null : first);
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedRegion && BODY_GROUPS[key].regions.includes(selectedRegion)
                    ? "text-white"
                    : "glass-card text-muted hover:text-foreground"
                }`}
                style={
                  selectedRegion && BODY_GROUPS[key].regions.includes(selectedRegion)
                    ? { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                    : undefined
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium tracking-widest text-muted uppercase">怪我の種類</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {INJURY_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setSelectedType(selectedType === t.value ? null : t.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedType === t.value
                    ? "text-white"
                    : "glass-card text-muted hover:text-foreground"
                }`}
                style={
                  selectedType === t.value
                    ? { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                    : undefined
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={!selectedRegion && !selectedType}
          className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors disabled:opacity-40"
        >
          検索する
        </button>
      </div>

      {/* Results */}
      {searched && (
        <div className="mt-10">
          {results.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">
              条件に一致するアスリートが見つかりませんでした
            </p>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-muted">{results.length}件の結果</p>
              {results.map((r) => (
                <Link key={r.id} href={`/athletes/${r.athletes.id}`} className="group block">
                  <article className="glass-card rounded-xl p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.08)]">
                    <h3 className="text-lg font-bold group-hover:text-accent transition-colors">
                      {r.athletes.name}
                      <span className="ml-2 text-sm font-normal text-muted">{r.athletes.name_en}</span>
                    </h3>
                    <p className="mt-1 text-sm italic text-muted">「{r.athletes.main_quote}」</p>
                    <div className="mt-3 flex items-start gap-2 text-sm">
                      <span
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            r.severity >= 9 ? "#ef4444" : r.severity >= 7 ? "#f97316" : "#facc15",
                          boxShadow:
                            r.severity >= 9
                              ? "0 0 8px rgba(239,68,68,0.5)"
                              : r.severity >= 7
                              ? "0 0 8px rgba(249,115,22,0.5)"
                              : "0 0 8px rgba(250,204,21,0.5)",
                        }}
                      />
                      <div>
                        <p className="font-medium">{r.diagnosis}</p>
                        <p className="text-muted">{r.description}</p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
