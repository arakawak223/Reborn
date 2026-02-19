import Link from "next/link";
import { athletes } from "@/lib/mock-data";

export default function AthletesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">選手一覧</h1>
      <p className="mt-2 text-muted">収録アスリート</p>

      <div className="mt-10 space-y-12">
        {athletes.map((athlete, index) => (
          <Link
            key={athlete.id}
            href={`/athletes/${athlete.id}`}
            className="group block"
          >
            <article className="rounded-xl border border-border p-6 transition-all group-hover:border-accent/40 group-hover:shadow-sm">
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
                「{athlete.main_quote}」
              </p>
              <p className="mt-3 text-sm">
                {athlete.sport} / {athlete.nationality}
              </p>
              <p className="mt-1 text-sm text-accent">
                {athlete.injury_detail}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
