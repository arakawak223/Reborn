"use client";

import { use, useState, useEffect } from "react";
import InjuryBodyMap from "@/components/body-model/InjuryBodyMap";
import { useLocale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";
import type { InjuryRecord } from "@/lib/mock-data";

export default function InjuryPage({
  params,
}: {
  params: Promise<{ locale: string; athleteId: string }>;
}) {
  const { athleteId } = use(params);
  const locale = useLocale();
  const dict = getDictionary(locale);
  const [injuries, setInjuries] = useState<InjuryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("@/lib/data").then((mod) => {
      setInjuries(mod.getInjuriesByAthleteId(athleteId, locale));
      setLoading(false);
    });
  }, [athleteId, locale]);

  if (loading) {
    return <div className="py-8 text-center text-sm text-muted">{dict.injury.loading}</div>;
  }

  if (injuries.length === 0) {
    return <div className="py-8 text-center text-sm text-muted">{dict.injury.noData}</div>;
  }

  return (
    <div>
      <h2 className="text-xs font-medium tracking-widest text-muted uppercase">{dict.injury.title}</h2>
      <p className="mt-2 text-sm text-muted">
        {dict.injury.description}
      </p>

      <div className="mt-6">
        <InjuryBodyMap injuries={injuries} locale={locale} />
      </div>
    </div>
  );
}
