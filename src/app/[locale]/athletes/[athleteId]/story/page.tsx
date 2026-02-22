import { getAthleteById, getStoryByAthleteId } from "@/lib/data";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale-context";
import { notFound } from "next/navigation";
import { ChapterNarrator, FullStoryNarrator } from "@/components/StoryNarrator";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string; athleteId: string }>;
}) {
  const { locale, athleteId } = await params;
  const loc = (locale === "en" ? "en" : "ja") as Locale;
  const dict = getDictionary(loc);
  const athlete = getAthleteById(athleteId, loc);
  if (!athlete) return notFound();

  const chapters = getStoryByAthleteId(athleteId, loc);

  const STAGE_META: Record<string, { label: string; icon: string; colorClass: string; color: string }> = {
    origin: { label: dict.story.stageOrigin, icon: "01", colorClass: "stage-origin", color: "#f59e0b" },
    despair: { label: dict.story.stageDespair, icon: "02", colorClass: "stage-despair", color: "#ef4444" },
    void: { label: dict.story.stageVoid, icon: "03", colorClass: "stage-void", color: "#6b7280" },
    awakening: { label: dict.story.stageAwakening, icon: "04", colorClass: "stage-awakening", color: "#a855f7" },
    rebirth: { label: dict.story.stageRebirth, icon: "05", colorClass: "stage-rebirth", color: "#10b981" },
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xs font-medium tracking-widest text-muted uppercase">
            {dict.story.title}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {dict.story.subtitle.replace("{name}", athlete.name)}
          </p>
        </div>
        <FullStoryNarrator
          chapters={chapters.map((ch) => ({
            id: ch.id,
            title: ch.title,
            body: ch.body,
            stage: ch.stage,
            year_label: ch.year_label,
          }))}
          athleteName={athlete.name}
          locale={loc}
        />
      </div>

      <div className="mt-10 space-y-16">
        {chapters.map((chapter) => {
          const meta = STAGE_META[chapter.stage] ?? { label: chapter.stage, icon: "?", colorClass: "", color: "#6b7280" };
          return (
            <article
              key={chapter.id}
              className={`relative rounded-xl p-6 ${meta.colorClass}`}
              style={{
                background: `radial-gradient(ellipse at 0% 0%, ${meta.color}08 0%, transparent 60%), var(--glass-bg)`,
                border: "1px solid var(--glass-border)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-baseline gap-4">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: meta.color, opacity: 0.4 }}
                  >
                    {meta.icon}
                  </span>
                  <div>
                    <p className="text-xs font-medium tracking-widest text-muted uppercase">
                      <span style={{ color: meta.color }}>{meta.label}</span>
                      {chapter.year_label && (
                        <span className="ml-2 normal-case">{chapter.year_label}</span>
                      )}
                    </p>
                    <h3 className="mt-1 text-xl font-bold">{chapter.title}</h3>
                  </div>
                </div>
                <ChapterNarrator
                  chapter={{
                    id: chapter.id,
                    title: chapter.title,
                    body: chapter.body,
                    stage: chapter.stage,
                    year_label: chapter.year_label,
                  }}
                  locale={loc}
                />
              </div>

              <div className="mt-4 space-y-4 pl-0 sm:pl-14">
                {chapter.body.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("\u300c") || paragraph.startsWith("\u300e") || paragraph.startsWith("\"")) {
                    return (
                      <blockquote
                        key={i}
                        className="border-l-2 pl-4"
                        style={{ borderColor: `${meta.color}60` }}
                      >
                        <p className="text-sm italic leading-[1.9]">
                          {paragraph}
                        </p>
                      </blockquote>
                    );
                  }
                  return (
                    <p key={i} className="text-sm leading-[1.9]">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
