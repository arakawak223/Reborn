import { notFound } from "next/navigation";
import Link from "next/link";
import { athletes, getAthleteById } from "@/lib/mock-data";

export function generateStaticParams() {
  return athletes.map((a) => ({ athleteId: a.id }));
}

export default async function AthleteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ athleteId: string }>;
}) {
  const { athleteId } = await params;
  const athlete = getAthleteById(athleteId);

  if (!athlete) return notFound();

  const basePath = `/athletes/${athleteId}`;
  const navItems = [
    { href: basePath, label: "プロフィール" },
    { href: `${basePath}/story`, label: "物語" },
    { href: `${basePath}/injury`, label: "怪我マップ" },
    { href: `${basePath}/quiz`, label: "クイズ" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Back */}
      <Link
        href="/"
        className="inline-block text-xs text-muted hover:text-foreground transition-colors mb-8"
      >
        ← 図鑑トップへ戻る
      </Link>

      {/* Athlete Header */}
      <header className="mb-10">
        <p className="text-sm tracking-widest text-muted">{athlete.sport} / {athlete.nationality}</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{athlete.name}</h1>
        <p className="mt-1 text-lg text-muted">{athlete.name_en}</p>

        <blockquote className="mt-6 border-l-2 border-accent/40 pl-4">
          <p className="text-lg italic leading-relaxed">
            「{athlete.main_quote}」
          </p>
        </blockquote>
        <blockquote className="mt-3 border-l-2 border-border pl-4">
          <p className="text-sm italic leading-relaxed text-muted">
            「{athlete.sub_quote}」
          </p>
        </blockquote>
      </header>

      {/* Sub Nav */}
      <nav className="mb-10 flex gap-1 overflow-x-auto border-b border-border">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
