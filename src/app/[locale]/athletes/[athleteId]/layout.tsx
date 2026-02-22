import { notFound } from "next/navigation";
import Link from "next/link";
import { getAthletes, getAthleteById } from "@/lib/data";
import { getSportImage } from "@/lib/sport-images";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale-context";
import BackButton from "@/components/layout/BackButton";

export function generateStaticParams() {
  // Use Japanese data for the canonical list of athlete IDs
  const jaAthletes = require("@/lib/mock-data").athletes;
  const locales = ["ja", "en"];
  return locales.flatMap((locale) =>
    jaAthletes.map((a: { id: string }) => ({ locale, athleteId: a.id }))
  );
}

export default async function AthleteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; athleteId: string }>;
}) {
  const { locale, athleteId } = await params;
  const loc = (locale === "en" ? "en" : "ja") as Locale;
  const dict = getDictionary(loc);
  const athlete = getAthleteById(athleteId, loc);
  const isJa = loc === "ja";

  if (!athlete) return notFound();

  const basePath = `/${loc}/athletes/${athleteId}`;
  const navItems = [
    { href: basePath, label: dict.athleteLayout.profile, highlight: false },
    { href: `${basePath}/story`, label: dict.athleteLayout.story, highlight: true },
    { href: `${basePath}/injury`, label: dict.athleteLayout.injuryMap, highlight: false },
    { href: `${basePath}/quiz`, label: dict.athleteLayout.quiz, highlight: false },
  ];

  const sportImageUrl = getSportImage(athlete.sport);

  return (
    <div className="relative mx-auto max-w-3xl px-6 py-12">
      {/* Background Sport Image */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <img
          src={sportImageUrl}
          alt=""
          className="h-full w-full object-cover opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/85 to-[var(--background)]" />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Back */}
        <div className="flex items-center gap-4 mb-8">
          <BackButton locale={loc} />
          <span className="text-xs text-muted/40">|</span>
          <Link
            href={`/${loc}`}
            className="inline-block text-xs text-muted hover:text-foreground transition-colors"
          >
            {dict.athleteLayout.backToTop}
          </Link>
        </div>

        {/* Athlete Header */}
        <header className="mb-10">
          <p className="text-sm tracking-widest text-muted">{athlete.sport} / {athlete.nationality}</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl" style={{ textShadow: "0 0 40px rgba(239, 68, 68, 0.15)" }}>
            {athlete.name}
          </h1>
          <p className="mt-1 text-lg text-muted">{athlete.name_en}</p>

          <blockquote className="mt-6 border-l-2 border-accent/40 pl-4" style={{ borderImage: "linear-gradient(to bottom, #ef4444, #f97316) 1" }}>
            <p className="text-lg italic leading-relaxed">
              {isJa ? `\u300c${athlete.main_quote}\u300d` : `"${athlete.main_quote}"`}
            </p>
          </blockquote>
          <blockquote className="mt-3 border-l-2 border-border pl-4">
            <p className="text-sm italic leading-relaxed text-muted">
              {isJa ? `\u300c${athlete.sub_quote}\u300d` : `"${athlete.sub_quote}"`}
            </p>
          </blockquote>
        </header>

        {/* Sub Nav */}
        <nav className="mb-10 flex gap-2 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                item.highlight
                  ? "nav-story-highlight hover:brightness-110"
                  : "text-muted hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {children}
      </div>
    </div>
  );
}
