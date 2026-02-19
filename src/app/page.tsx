import Link from "next/link";
import { athletes } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-medium tracking-[0.3em] text-muted uppercase">
            復活アスリート図鑑
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-accent">RE:</span>BORN
          </h1>
          <p className="mt-2 text-lg text-muted">魂のアーカイブ</p>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted">
            壊れた身体、折れかけた心——それでも立ち上がった人間の記録。
            <br />
            ここに収められた言葉と物語が、あなたの中の何かに届くことを願って。
          </p>
        </div>
      </section>

      {/* Athlete List */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="space-y-16">
            {athletes.map((athlete, index) => (
              <Link
                key={athlete.id}
                href={`/athletes/${athlete.id}`}
                className="group block"
              >
                <article>
                  <p className="text-xs font-medium tracking-widest text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold group-hover:text-accent transition-colors">
                    {athlete.name}
                    <span className="ml-3 text-base font-normal text-muted">
                      {athlete.name_en}
                    </span>
                  </h2>

                  {/* Main Quote */}
                  <blockquote className="mt-4 border-l-2 border-accent/40 pl-4">
                    <p className="text-base italic leading-relaxed">
                      「{athlete.main_quote}」
                    </p>
                  </blockquote>
                  <blockquote className="mt-2 border-l-2 border-border pl-4">
                    <p className="text-sm italic leading-relaxed text-muted">
                      「{athlete.sub_quote}」
                    </p>
                  </blockquote>

                  {/* Bio Summary */}
                  <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted">国籍：</span> {athlete.nationality}
                    </div>
                    <div>
                      <span className="text-muted">出身地：</span> {athlete.birthplace}
                    </div>
                    <div>
                      <span className="text-muted">競技：</span> {athlete.sport}
                    </div>
                    <div>
                      <span className="text-muted">生年月日：</span> {athlete.birth_date}（{athlete.age}歳）
                    </div>
                  </div>

                  <p className="mt-4 text-sm">
                    <span className="text-muted">主な功績：</span>{" "}
                    {athlete.achievements.join("、")}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium text-accent">負傷の詳細：</span>{" "}
                    {athlete.injury_detail}
                  </p>

                  <p className="mt-4 text-xs font-medium text-accent group-hover:underline">
                    この物語を読む →
                  </p>
                </article>

                {index < athletes.length - 1 && (
                  <div className="mt-16 border-b border-border" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
