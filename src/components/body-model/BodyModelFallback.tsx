import type { InjuryRecord, BodyCoord } from "@/lib/mock-data";

function getSeverityColor(severity: number): string {
  if (severity <= 3) return "#facc15";
  if (severity <= 6) return "#f97316";
  return "#ef4444";
}

export function BodyModelFallback({
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

  const toSvg = (x: number, y: number): { cx: number; cy: number } => ({
    cx: 200 + x * 300,
    cy: 400 - y * 220,
  });

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-slate-100 to-white p-4 dark:from-slate-900 dark:to-slate-800">
        <svg viewBox="0 50 400 400" className="mx-auto h-[500px] w-full max-w-xs">
          <ellipse cx="200" cy="95" rx="25" ry="30" fill="#d4a574" opacity="0.6" />
          <rect x="175" y="130" width="50" height="90" rx="10" fill="#4a90d9" opacity="0.4" />
          <rect x="180" y="220" width="40" height="30" rx="5" fill="#4a90d9" opacity="0.4" />
          <rect x="135" y="135" width="35" height="15" rx="5" fill="#d4a574" opacity="0.5" />
          <rect x="230" y="135" width="35" height="15" rx="5" fill="#d4a574" opacity="0.5" />
          <rect x="125" y="155" width="15" height="60" rx="5" fill="#d4a574" opacity="0.5" />
          <rect x="260" y="155" width="15" height="60" rx="5" fill="#d4a574" opacity="0.5" />
          <rect x="180" y="250" width="18" height="80" rx="5" fill="#4a6fa5" opacity="0.4" />
          <rect x="202" y="250" width="18" height="80" rx="5" fill="#4a6fa5" opacity="0.4" />
          <rect x="178" y="330" width="22" height="60" rx="5" fill="#4a6fa5" opacity="0.4" />
          <rect x="200" y="330" width="22" height="60" rx="5" fill="#4a6fa5" opacity="0.4" />
          {injuries.map((injury) => {
            const coord = coordMap.get(injury.body_region);
            if (!coord) return null;
            const { cx, cy } = toSvg(coord.x, coord.y);
            const color = getSeverityColor(injury.severity);
            const r = 6 + injury.severity;
            const isSelected = selectedInjury?.id === injury.id;
            return (
              <g key={injury.id} onClick={() => onSelectInjury(injury)} className="cursor-pointer">
                <circle cx={cx} cy={cy} r={r} fill={color} opacity={isSelected ? 0.9 : 0.6} stroke={isSelected ? "white" : "none"} strokeWidth={isSelected ? 2 : 0} />
                {injury.is_primary && (
                  <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke={color} strokeWidth={1} opacity={0.5}>
                    <animate attributeName="r" values={`${r + 2};${r + 8};${r + 2}`} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>
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
