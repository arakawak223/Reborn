import { getAthleteById, getStoryByAthleteId } from "@/lib/mock-data";
import { notFound } from "next/navigation";

const STAGE_META: Record<string, { label: string; icon: string }> = {
  origin: { label: "根源", icon: "01" },
  despair: { label: "絶望", icon: "02" },
  void: { label: "空白", icon: "03" },
  awakening: { label: "覚醒", icon: "04" },
  rebirth: { label: "再誕", icon: "05" },
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
          const meta = STAGE_META[chapter.stage] ?? { label: chapter.stage, icon: "?" };
          return (
            <article key={chapter.id}>
              {/* Chapter Header */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-accent/20">
                  {meta.icon}
                </span>
                <div>
                  <p className="text-xs font-medium tracking-widest text-muted uppercase">
                    {meta.label}
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
                  // Detect quoted text
                  if (paragraph.startsWith("「") || paragraph.startsWith("『")) {
                    return (
                      <blockquote
                        key={i}
                        className="border-l-2 border-accent/30 pl-4"
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
