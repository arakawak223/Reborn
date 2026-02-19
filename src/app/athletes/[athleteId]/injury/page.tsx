"use client";

import { use, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { BodyModelFallback } from "@/components/body-model/BodyModelFallback";
import type { InjuryRecord, BodyCoord } from "@/lib/mock-data";

const BodyModelViewer = dynamic(
  () =>
    import("@/components/body-model/BodyModelViewer").then(
      (mod) => mod.BodyModelViewer
    ),
  { ssr: false }
);

export default function InjuryPage({
  params,
}: {
  params: Promise<{ athleteId: string }>;
}) {
  const { athleteId } = use(params);
  const [injuries, setInjuries] = useState<InjuryRecord[]>([]);
  const [coordinates, setCoordinates] = useState<BodyCoord[]>([]);
  const [selectedInjury, setSelectedInjury] = useState<InjuryRecord | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("@/lib/mock-data").then((mod) => {
      setInjuries(mod.getInjuriesByAthleteId(athleteId));
      setCoordinates(mod.bodyRegionCoordinates);
      setLoading(false);
    });
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }
  }, [athleteId]);

  if (loading) {
    return <div className="py-8 text-center text-sm text-muted">読み込み中...</div>;
  }

  if (injuries.length === 0) {
    return <div className="py-8 text-center text-sm text-muted">怪我データがありません</div>;
  }

  return (
    <div>
      <h2 className="text-xs font-medium tracking-widest text-muted uppercase">怪我マップ</h2>
      <p className="mt-2 text-sm text-muted">
        人体モデル上で怪我の位置と重症度を確認できます
      </p>

      <div className="mt-6">
        {webglSupported ? (
          <BodyModelViewer
            injuries={injuries}
            coordinates={coordinates}
            selectedInjury={selectedInjury}
            onSelectInjury={setSelectedInjury}
          />
        ) : (
          <BodyModelFallback
            injuries={injuries}
            coordinates={coordinates}
            selectedInjury={selectedInjury}
            onSelectInjury={setSelectedInjury}
          />
        )}
      </div>

      {/* Injury List */}
      <div className="mt-8 space-y-3">
        {injuries.map((injury) => (
          <button
            key={injury.id}
            onClick={() => setSelectedInjury(selectedInjury?.id === injury.id ? null : injury)}
            className={`flex w-full items-start gap-3 glass-card rounded-lg p-4 text-left text-sm transition-all ${
              selectedInjury?.id === injury.id
                ? "border-accent/40 bg-accent/5"
                : "hover:border-accent/20"
            }`}
            style={
              selectedInjury?.id === injury.id
                ? { boxShadow: "0 0 20px rgba(239, 68, 68, 0.15)" }
                : undefined
            }
          >
            <span
              className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  injury.severity >= 9 ? "#ef4444" : injury.severity >= 7 ? "#f97316" : "#facc15",
                boxShadow:
                  injury.severity >= 9
                    ? "0 0 8px rgba(239,68,68,0.5)"
                    : injury.severity >= 7
                    ? "0 0 8px rgba(249,115,22,0.5)"
                    : "0 0 8px rgba(250,204,21,0.5)",
              }}
            />
            <div>
              <p className="font-medium">{injury.diagnosis}</p>
              <p className="text-muted">
                {injury.description} — {injury.year_occurred}年 / 回復{injury.recovery_months}ヶ月
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
