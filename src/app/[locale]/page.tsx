import Link from "next/link";
import { getAthletes } from "@/lib/data";
import { getSportImage } from "@/lib/sport-images";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale-context";

export default async function Home({
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
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/Reborn/videos/hero-particles.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-red-950/30 to-black/60" />
        </div>

        {/* Particles & Glow */}
        <div className="particles" style={{ zIndex: 1 }} />
        <div className="glow-orb glow-orb-red -top-32 -left-32" style={{ zIndex: 1 }} />
        <div className="glow-orb glow-orb-blue -bottom-32 -right-32" style={{ zIndex: 1 }} />

        <div className="relative mx-auto max-w-3xl px-6 text-center" style={{ zIndex: 2 }}>
          <p className="text-sm font-medium tracking-[0.3em] text-muted uppercase fade-up">
            {dict.home.tagline}
          </p>
          <h1 className="mt-4 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="gradient-text">RE:BORN</span>
          </h1>
          <p className="mt-2 text-xl text-muted fade-up" style={{ animationDelay: "0.2s" }}>{dict.home.subtitle}</p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed font-medium fade-up" style={{ animationDelay: "0.25s" }}>
            {dict.home.heroLine1}
            <br />
            {dict.home.heroLine2}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted fade-up" style={{ animationDelay: "0.35s" }}>
            {dict.home.heroLine3}
            <br />
            {dict.home.heroLine4}
          </p>
          <div className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>
      </section>

      {/* Athlete List */}
      <section className="relative">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="space-y-12">
            {athletes.map((athlete, index) => (
              <Link
                key={athlete.id}
                href={`/${loc}/athletes/${athlete.id}`}
                className="group block"
              >
                <article className="glass-card rounded-xl p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.08)]">
                  <div className="flex gap-5 items-start">
                    <div className="flex-shrink-0">
                      <img
                        src={getSportImage(athlete.sport)}
                        alt=""
                        className="w-24 h-16 sm:w-28 sm:h-20 rounded-lg object-cover opacity-80 group-hover:opacity-100 transition-opacity shadow-lg shadow-black/30"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium tracking-widest text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold group-hover:text-accent transition-colors">
                        {athlete.name}
                        <span className="ml-3 text-base font-normal text-muted">
                          {athlete.name_en}
                        </span>
                      </h2>
                    </div>
                  </div>

                  {/* Main Quote */}
                  <blockquote className="mt-4 border-l-2 border-accent/40 pl-4">
                    <p className="text-base italic leading-relaxed">
                      {isJa ? `\u300c${athlete.main_quote}\u300d` : `"${athlete.main_quote}"`}
                    </p>
                  </blockquote>
                  <blockquote className="mt-2 border-l-2 border-border pl-4">
                    <p className="text-sm italic leading-relaxed text-muted">
                      {isJa ? `\u300c${athlete.sub_quote}\u300d` : `"${athlete.sub_quote}"`}
                    </p>
                  </blockquote>

                  {/* Bio Summary */}
                  <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted">{dict.home.nationality}{isJa ? "\uff1a" : ": "}</span> {athlete.nationality}
                    </div>
                    <div>
                      <span className="text-muted">{dict.home.birthplace}{isJa ? "\uff1a" : ": "}</span> {athlete.birthplace}
                    </div>
                    <div>
                      <span className="text-muted">{dict.home.sport}{isJa ? "\uff1a" : ": "}</span> {athlete.sport}
                    </div>
                    <div>
                      <span className="text-muted">{dict.home.birthDate}{isJa ? "\uff1a" : ": "}</span> {athlete.birth_date}{isJa ? `\uff08${athlete.age}\u6b73\uff09` : ` (${athlete.age} ${dict.home.age})`}
                    </div>
                  </div>

                  <p className="mt-4 text-sm">
                    <span className="text-muted">{dict.home.achievements}{isJa ? "\uff1a" : ": "}</span>{" "}
                    {athlete.achievements.join(isJa ? "\u3001" : ", ")}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium text-accent">{dict.home.injuryDetail}{isJa ? "\uff1a" : ": "}</span>{" "}
                    {athlete.injury_detail}
                  </p>

                  <p className="mt-4 text-xs font-medium text-accent group-hover:underline">
                    {dict.home.readStory}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
