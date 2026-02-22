import {
  getAthleteById,
  getQuotesByAthleteId,
  getTestimoniesByAthleteId,
  getInjuriesByAthleteId,
} from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { QuoteNarrator, TestimonyNarrator, SectionNarrator } from "@/components/QuoteNarrator";

export default async function AthleteProfilePage({
  params,
}: {
  params: Promise<{ athleteId: string }>;
}) {
  const { athleteId } = await params;
  const athlete = getAthleteById(athleteId);
  if (!athlete) return notFound();

  const quotes = getQuotesByAthleteId(athleteId);
  const testimoniesList = getTestimoniesByAthleteId(athleteId);
  const injuries = getInjuriesByAthleteId(athleteId);

  // Build full injury text for section-level TTS
  const injuryText = [
    athlete.injury_detail,
    ...injuries.map(
      (inj) => `${inj.diagnosis}。${inj.description}。${inj.year_occurred}年、回復${inj.recovery_months}ヶ月`
    ),
  ].join("。\n");

  return (
    <div className="space-y-12">
      {/* Bio */}
      <section className="glass-card rounded-xl p-6">
        <h2 className="text-xs font-medium tracking-widest text-muted uppercase">基本情報</h2>
        <dl className="mt-4 grid grid-cols-1 gap-y-3 text-sm sm:grid-cols-2 sm:gap-x-8">
          <div>
            <dt className="text-muted">国籍</dt>
            <dd className="mt-0.5 font-medium">{athlete.nationality}</dd>
          </div>
          <div>
            <dt className="text-muted">出身地</dt>
            <dd className="mt-0.5 font-medium">{athlete.birthplace}</dd>
          </div>
          <div>
            <dt className="text-muted">生年月日・年齢</dt>
            <dd className="mt-0.5 font-medium">{athlete.birth_date}（{athlete.age}歳）</dd>
          </div>
          <div>
            <dt className="text-muted">家族構成</dt>
            <dd className="mt-0.5 font-medium">{athlete.family}</dd>
          </div>
        </dl>
      </section>

      {/* Achievements */}
      <section className="glass-card rounded-xl p-6">
        <h2 className="text-xs font-medium tracking-widest text-muted uppercase">主な功績</h2>
        <ul className="mt-4 space-y-1">
          {athlete.achievements.map((a, i) => (
            <li key={i} className="text-sm">
              <span className="mr-2 text-accent">—</span>
              {a}
            </li>
          ))}
        </ul>
      </section>

      {/* Injury */}
      <section className="glass-card rounded-xl p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xs font-medium tracking-widest text-muted uppercase">負傷の詳細</h2>
          <SectionNarrator text={injuryText} label="怪我情報を読み上げ" />
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
                    {inj.description} — {inj.year_occurred}年 / 回復{inj.recovery_months}ヶ月
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
          <h2 className="text-xs font-medium tracking-widest text-muted uppercase">金言</h2>
          <div className="mt-4 space-y-6">
            {quotes.map((q) => (
              <blockquote
                key={q.id}
                className="glass-card rounded-lg p-4 border-l-2"
                style={{ borderImage: "linear-gradient(to bottom, #ef4444, #f97316) 1" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm italic leading-relaxed">
                    「{q.quote}」
                  </p>
                  <QuoteNarrator quote={q.quote} context={q.context ?? undefined} />
                </div>
                {q.context && (
                  <footer className="mt-1 text-xs text-muted">
                    — {q.context}
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
          <h2 className="text-xs font-medium tracking-widest text-muted uppercase">周囲の証言</h2>
          <div className="mt-4 space-y-4">
            {testimoniesList.map((t) => (
              <blockquote
                key={t.id}
                className="glass-card rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm italic leading-relaxed">
                    「{t.quote}」
                  </p>
                  <TestimonyNarrator
                    quote={t.quote}
                    speaker={t.speaker_name}
                    role={t.speaker_role}
                  />
                </div>
                <footer className="mt-2 text-xs text-muted">
                  — {t.speaker_name}（{t.speaker_role}）
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
