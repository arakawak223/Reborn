import { getAthleteById, getStoryByAthleteId } from "@/lib/mock-data";
import { notFound } from "next/navigation";

const STAGE_META: Record<string, { label: string; icon: string; colorClass: string; color: string }> = {
  origin: { label: "根源", icon: "01", colorClass: "stage-origin", color: "#f59e0b" },
  despair: { label: "絶望", icon: "02", colorClass: "stage-despair", color: "#ef4444" },
  void: { label: "空白", icon: "03", colorClass: "stage-void", color: "#6b7280" },
  awakening: { label: "覚醒", icon: "04", colorClass: "stage-awakening", color: "#a855f7" },
  rebirth: { label: "再誕", icon: "05", colorClass: "stage-rebirth", color: "#10b981" },
};

export default async function StoryPage({
  params,
}: {
  params: Promise<{ athleteId: string }>;
}) {
  const { athleteId } = await params;
  const athlete = getAthleteById(athleteId);
  if (!athlete) return notFound();

  const chapters = getStoryByAthleteId(athleteId);

  return (
    <div>
      <h2 className="text-xs font-medium tracking-widest text-muted uppercase">
        復活の物語
      </h2>
      <p className="mt-2 text-sm text-muted">
        5つの章で紐解く、{athlete.name}の復活劇
      </p>

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
              {/* Chapter Header */}
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

              {/* Chapter Body */}
              <div className="mt-4 space-y-4 pl-0 sm:pl-14">
                {chapter.body.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("「") || paragraph.startsWith("『")) {
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
