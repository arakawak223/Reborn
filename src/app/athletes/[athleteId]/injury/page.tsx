"use client";

import { use, useState, useEffect } from "react";
import InjuryBodyMap from "@/components/body-model/InjuryBodyMap";
import type { InjuryRecord } from "@/lib/mock-data";

export default function InjuryPage({
  params,
}: {
  params: Promise<{ athleteId: string }>;
}) {
  const { athleteId } = use(params);
  const [injuries, setInjuries] = useState<InjuryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("@/lib/mock-data").then((mod) => {
      setInjuries(mod.getInjuriesByAthleteId(athleteId));
      setLoading(false);
    });
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
        人体シルエット上で怪我の部位と重症度を確認できます。マーカーやカードをクリックすると詳細が表示されます。
      </p>

      <div className="mt-6">
        <InjuryBodyMap injuries={injuries} />
      </div>
    </div>
  );
}
