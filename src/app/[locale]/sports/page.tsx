import Link from "next/link";
import { getAthletes } from "@/lib/data";
import { getSportImage } from "@/lib/sport-images";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale-context";
import type { AthleteProfile } from "@/lib/data";

// Sport → category key mapping
const SPORT_CATEGORY_MAP: Record<string, string> = {
  // Winter
  "スノーボード": "winter",
  "パラスノーボード": "winter",
  "スノーボード（ハーフパイプ）": "winter",
  "スキージャンプ": "winter",
  "フィギュアスケート": "winter",
  "Snowboard": "winter",
  "Para Snowboard": "winter",
  "Snowboard (Halfpipe)": "winter",
  "Ski Jumping": "winter",
  "Figure Skating": "winter",
  // Ball
  "野球": "ball",
  "ソフトボール": "ball",
  "サッカー": "ball",
  "バスケットボール": "ball",
  "車いすバスケットボール": "ball",
  "バレーボール": "ball",
  "ラグビー": "ball",
  "車いすラグビー": "ball",
  "ゴルフ": "ball",
  "Baseball": "ball",
  "Softball": "ball",
  "Soccer": "ball",
  "Basketball": "ball",
  "Wheelchair Basketball": "ball",
  "Volleyball": "ball",
  "Rugby": "ball",
  "Wheelchair Rugby": "ball",
  "Golf": "ball",
  // Racket
  "テニス": "racket",
  "車いすテニス": "racket",
  "卓球": "racket",
  "Tennis": "racket",
  "Wheelchair Tennis": "racket",
  "Table Tennis": "racket",
  // Combat
  "柔道": "combat",
  "ボクシング": "combat",
  "車いすフェンシング": "combat",
  "Judo": "combat",
  "Boxing": "combat",
  "Wheelchair Fencing": "combat",
  // Swimming
  "水泳": "swimming",
  "パラ水泳": "swimming",
  "Swimming": "swimming",
  "Para Swimming": "swimming",
  // Track
  "陸上": "track",
  "マラソン": "track",
  "Track and Field": "track",
  "Marathon": "track",
  // Gymnastics
  "体操": "gymnastics",
  "Gymnastics": "gymnastics",
};

const CATEGORY_ORDER = [
  "winter",
  "ball",
  "racket",
  "combat",
  "swimming",
  "track",
  "gymnastics",
  "other",
] as const;

function getCategoryKey(sport: string): string {
  // Exact match
  if (SPORT_CATEGORY_MAP[sport]) return SPORT_CATEGORY_MAP[sport];
  // Partial match
  for (const [key, cat] of Object.entries(SPORT_CATEGORY_MAP)) {
    if (sport.includes(key) || key.includes(sport)) return cat;
  }
  return "other";
}

type CategoryData = {
  key: string;
  sports: Map<string, AthleteProfile[]>;
};

function groupAthletesByCategory(athletes: AthleteProfile[]): CategoryData[] {
  const categoryMap = new Map<string, Map<string, AthleteProfile[]>>();

  for (const athlete of athletes) {
    const catKey = getCategoryKey(athlete.sport);
    if (!categoryMap.has(catKey)) {
      categoryMap.set(catKey, new Map());
    }
    const sportMap = categoryMap.get(catKey)!;
    if (!sportMap.has(athlete.sport)) {
      sportMap.set(athlete.sport, []);
    }
    sportMap.get(athlete.sport)!.push(athlete);
  }

  return CATEGORY_ORDER
    .filter((key) => categoryMap.has(key))
    .map((key) => ({
      key,
      sports: categoryMap.get(key)!,
    }));
}

export default async function SportsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale === "en" ? "en" : "ja") as Locale;
  const dict = getDictionary(loc);
  const athletes = getAthletes(loc);
  const categories = groupAthletesByCategory(athletes);

  const categoryNames = dict.sportIndex.categories as Record<string, string>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <h1 className="text-3xl font-bold">
        <span className="gradient-text">{dict.sportIndex.title}</span>
      </h1>
      <p className="mt-2 text-muted">{dict.sportIndex.subtitle}</p>

      {/* Category chips - horizontal scroll */}
      <nav className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(({ key }) => (
          <a
            key={key}
            href={`#cat-${key}`}
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            {categoryNames[key] || key}
          </a>
        ))}
      </nav>

      {/* Category sections */}
      <div className="mt-10 space-y-16">
        {categories.map(({ key, sports }) => {
          const totalAthletes = Array.from(sports.values()).reduce(
            (sum, arr) => sum + arr.length,
            0,
          );

          return (
            <section key={key} id={`cat-${key}`} className="scroll-mt-24">
              {/* Category heading */}
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-bold gradient-text">
                  {categoryNames[key] || key}
                </h2>
                <span className="text-sm text-muted">
                  {dict.sportIndex.athleteCount.replace(
                    "{n}",
                    String(totalAthletes),
                  )}
                </span>
              </div>

              {/* Sports within this category */}
              <div className="mt-6 space-y-8">
                {Array.from(sports.entries()).map(
                  ([sportName, sportAthletes]) => (
                    <div key={sportName}>
                      {/* Sport heading with image */}
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md">
                          <img
                            src={getSportImage(sportName)}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {sportName}
                        </h3>
                        <span className="text-xs text-muted">
                          ({sportAthletes.length})
                        </span>
                      </div>

                      {/* Athlete cards */}
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {sportAthletes.map((athlete) => (
                          <Link
                            key={athlete.id}
                            href={`/${loc}/athletes/${athlete.id}`}
                            className="group glass-card rounded-lg p-4 transition-all duration-200 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.06)]"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="font-semibold group-hover:text-accent transition-colors truncate">
                                  {athlete.name}
                                </p>
                                <p className="text-xs text-muted truncate">
                                  {athlete.name_en}
                                </p>
                              </div>
                              <span className="shrink-0 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                                {dict.sportIndex.viewProfile}
                              </span>
                            </div>
                            <p className="mt-2 text-xs text-muted line-clamp-2">
                              <span className="text-accent/70">
                                {dict.sportIndex.injuryLabel}:
                              </span>{" "}
                              {athlete.injury_detail}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
