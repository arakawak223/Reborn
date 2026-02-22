import Link from "next/link";
import { getAthletes } from "@/lib/data";
import { getSportImage } from "@/lib/sport-images";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale-context";

export default async function AthletesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale === "en" ? "en" : "ja") as Locale;
  const dict = getDictionary(loc);
  const athletes = getAthletes(loc);
  const isJa = loc === "ja";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">
        <span className="gradient-text">{dict.athletesList.title}</span>
      </h1>
      <p className="mt-2 text-muted">{dict.athletesList.subtitle}</p>

      <div className="mt-10 space-y-12">
        {athletes.map((athlete, index) => (
          <Link
            key={athlete.id}
            href={`/${loc}/athletes/${athlete.id}`}
            className="group block"
          >
            <article className="glass-card relative rounded-xl p-6 overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.08)]">
              {/* Background Sport Image */}
              <div className="absolute right-0 top-0 h-full w-2/5 overflow-hidden">
                <img
                  src={getSportImage(athlete.sport)}
                  alt=""
                  className="h-full w-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--card)] via-[var(--card)]/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative">
                <p className="text-xs tracking-widest text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 text-xl font-bold group-hover:text-accent transition-colors">
                  {athlete.name}
                  <span className="ml-2 text-sm font-normal text-muted">
                    {athlete.name_en}
                  </span>
                </h2>
                <p className="mt-2 text-sm italic text-muted">
                  {isJa ? `\u300c${athlete.main_quote}\u300d` : `"${athlete.main_quote}"`}
                </p>
                <p className="mt-3 text-sm">
                  {athlete.sport} / {athlete.nationality}
                </p>
                <p className="mt-1 text-sm text-accent">
                  {athlete.injury_detail}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
