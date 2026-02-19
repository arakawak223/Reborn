"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { HumanBodyMesh } from "./HumanBodyMesh";
import { InjuryMarker } from "./InjuryMarker";
import type { InjuryRecord, BodyCoord } from "@/lib/mock-data";

export function BodyModelViewer({
  injuries,
  coordinates,
  selectedInjury,
  onSelectInjury,
}: {
  injuries: InjuryRecord[];
  coordinates: BodyCoord[];
  selectedInjury: InjuryRecord | null;
  onSelectInjury: (injury: InjuryRecord | null) => void;
}) {
  const coordMap = new Map(coordinates.map((c) => [c.region, c]));

  return (
    <div>
      <div className="relative h-[500px] w-full overflow-hidden rounded-xl border border-border bg-gradient-to-b from-slate-900 to-slate-800">
        <Canvas
          camera={{ position: [0, 1, 2.5], fov: 45 }}
          onClick={() => onSelectInjury(null)}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, 5, -5]} intensity={0.3} />
          <Suspense fallback={null}>
            <HumanBodyMesh />
            {injuries.map((injury) => {
              const coord = coordMap.get(injury.body_region);
              if (!coord) return null;
              return (
                <InjuryMarker
                  key={injury.id}
                  injury={injury}
                  position={[coord.x, coord.y, coord.z + 0.1]}
                  onClick={() => onSelectInjury(injury)}
                  isSelected={selectedInjury?.id === injury.id}
                />
              );
            })}
          </Suspense>
          <OrbitControls
            enablePan={false}
            minDistance={1.5}
            maxDistance={4}
            target={[0, 1, 0]}
          />
        </Canvas>
        <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-3 py-1.5 text-xs text-white">
          ドラッグで回転 / スクロールでズーム
        </div>
      </div>

      {selectedInjury && (
        <div className="mt-4 rounded-lg border border-border p-4 text-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold">{selectedInjury.diagnosis}</p>
              <p className="text-muted">
                {selectedInjury.description} — {selectedInjury.year_occurred}年 / 回復{selectedInjury.recovery_months}ヶ月
              </p>
            </div>
            <button onClick={() => onSelectInjury(null)} className="text-muted hover:text-foreground">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
