import {
  getAthleteById,
  getQuotesByAthleteId,
  getTestimoniesByAthleteId,
  getInjuriesByAthleteId,
} from "@/lib/data";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale-context";
import { notFound } from "next/navigation";
import { QuoteNarrator, TestimonyNarrator, SectionNarrator } from "@/components/QuoteNarrator";

export default async function AthleteProfilePage({
  params,
}: {
  params: Promise<{ locale: string; athleteId: string }>;
}) {
  const { locale, athleteId } = await params;
  const loc = (locale === "en" ? "en" : "ja") as Locale;
  const dict = getDictionary(loc);
  const isJa = loc === "ja";
  const athlete = getAthleteById(athleteId, loc);
  if (!athlete) return notFound();

  const quotes = getQuotesByAthleteId(athleteId, loc);
  const testimoniesList = getTestimoniesByAthleteId(athleteId, loc);
  const injuries = getInjuriesByAthleteId(athleteId, loc);

  const injuryText = [
    athlete.injury_detail,
    ...injuries.map(
      (inj) => isJa
        ? `${inj.diagnosis}\u3002${inj.description}\u3002${inj.year_occurred}\u5e74\u3001\u56de\u5fa9${inj.recovery_months}\u30f6\u6708`
        : `${inj.diagnosis}. ${inj.description}. ${inj.year_occurred}, ${inj.recovery_months} months recovery`
    ),
  ].join(isJa ? "\u3002\n" : ".\n");

  return (
    <div className="space-y-12">
      {/* Bio */}
      <section className="glass-card rounded-xl p-6">
        <h2 className="text-xs font-medium tracking-widest text-muted uppercase">{dict.profile.basicInfo}</h2>
        <dl className="mt-4 grid grid-cols-1 gap-y-3 text-sm sm:grid-cols-2 sm:gap-x-8">
          <div>
            <dt className="text-muted">{dict.profile.nationality}</dt>
            <dd className="mt-0.5 font-medium">{athlete.nationality}</dd>
          </div>
          <div>
            <dt className="text-muted">{dict.profile.birthplace}</dt>
            <dd className="mt-0.5 font-medium">{athlete.birthplace}</dd>
          </div>
          <div>
            <dt className="text-muted">{dict.profile.birthDateAge}</dt>
            <dd className="mt-0.5 font-medium">{athlete.birth_date}{isJa ? `\uff08${athlete.age}\u6b73\uff09` : ` (${athlete.age})`}</dd>
          </div>
          <div>
            <dt className="text-muted">{dict.profile.family}</dt>
            <dd className="mt-0.5 font-medium">{athlete.family}</dd>
          </div>
        </dl>
      </section>

      {/* Achievements */}
      <section className="glass-card rounded-xl p-6">
        <h2 className="text-xs font-medium tracking-widest text-muted uppercase">{dict.profile.achievements}</h2>
        <ul className="mt-4 space-y-1">
          {athlete.achievements.map((a, i) => (
            <li key={i} className="text-sm">
              <span className="mr-2 text-accent">\u2014</span>
              {a}
            </li>
          ))}
        </ul>
      </section>

      {/* Injury */}
      <section className="glass-card rounded-xl p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xs font-medium tracking-widest text-muted uppercase">{dict.profile.injuryDetail}</h2>
          <SectionNarrator text={injuryText} label={dict.profile.injuryNarrate} locale={loc} />
        </div>
        <p className="mt-4 text-sm font-medium text-accent leading-relaxed">
          {athlete.injury_detail}
        </p>
        {injuries.length > 0 && (
          <div className="mt-4 space-y-2">
            {injuries.map((inj) => (
              <div
                key={inj.id}
                className="flex items-start gap-3 glass-card rounded-lg p-3 text-sm"
              >
                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      inj.severity >= 9 ? "#ef4444" : inj.severity >= 7 ? "#f97316" : "#facc15",
                    boxShadow:
                      inj.severity >= 9
                        ? "0 0 8px rgba(239,68,68,0.5)"
                        : inj.severity >= 7
                        ? "0 0 8px rgba(249,115,22,0.5)"
                        : "0 0 8px rgba(250,204,21,0.5)",
                  }}
                />
                <div>
                  <p className="font-medium">{inj.diagnosis}</p>
                  <p className="text-muted">
                    {inj.description} {isJa ? "\u2014" : "\u2014"} {inj.year_occurred}{isJa ? `\u5e74 / \u56de\u5fa9${inj.recovery_months}\u30f6\u6708` : ` / ${inj.recovery_months} months recovery`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Golden Quotes */}
      {quotes.length > 0 && (
        <section>
          <h2 className="text-xs font-medium tracking-widest text-muted uppercase">{dict.profile.goldenQuotes}</h2>
          <div className="mt-4 space-y-6">
            {quotes.map((q) => (
              <blockquote
                key={q.id}
                className="glass-card rounded-lg p-4 border-l-2"
                style={{ borderImage: "linear-gradient(to bottom, #ef4444, #f97316) 1" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm italic leading-relaxed">
                    {isJa ? `\u300c${q.quote}\u300d` : `"${q.quote}"`}
                  </p>
                  <QuoteNarrator quote={q.quote} context={q.context ?? undefined} locale={loc} />
                </div>
                {q.context && (
                  <footer className="mt-1 text-xs text-muted">
                    \u2014 {q.context}
                  </footer>
                )}
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* Testimonies */}
      {testimoniesList.length > 0 && (
        <section>
          <h2 className="text-xs font-medium tracking-widest text-muted uppercase">{dict.profile.testimonies}</h2>
          <div className="mt-4 space-y-4">
            {testimoniesList.map((t) => (
              <blockquote
                key={t.id}
                className="glass-card rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm italic leading-relaxed">
                    {isJa ? `\u300c${t.quote}\u300d` : `"${t.quote}"`}
                  </p>
                  <TestimonyNarrator
                    quote={t.quote}
                    speaker={t.speaker_name}
                    role={t.speaker_role}
                    locale={loc}
                  />
                </div>
                <footer className="mt-2 text-xs text-muted">
                  \u2014 {t.speaker_name}{isJa ? `\uff08${t.speaker_role}\uff09` : ` (${t.speaker_role})`}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
