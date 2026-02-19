import Link from "next/link";
import { athletes } from "@/lib/mock-data";
import { getSportImage } from "@/lib/sport-images";

export default function Home() {
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
          {/* 赤みのあるカラーオーバーレイ — 動画を暗く＋赤アクセント */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-red-950/30 to-black/60" />
        </div>

        {/* Particles & Glow */}
        <div className="particles" style={{ zIndex: 1 }} />
        <div className="glow-orb glow-orb-red -top-32 -left-32" style={{ zIndex: 1 }} />
        <div className="glow-orb glow-orb-blue -bottom-32 -right-32" style={{ zIndex: 1 }} />

        <div className="relative mx-auto max-w-3xl px-6 text-center" style={{ zIndex: 2 }}>
          <p className="text-sm font-medium tracking-[0.3em] text-muted uppercase fade-up">
            復活アスリート図鑑
          </p>
          <h1 className="mt-4 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="gradient-text">RE:BORN</span>
          </h1>
          <p className="mt-2 text-xl text-muted fade-up" style={{ animationDelay: "0.2s" }}>魂のアーカイブ</p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed font-medium fade-up" style={{ animationDelay: "0.25s" }}>
            覚悟の先に、本当の自分がいる。
            <br />
            その生きざまが、魂を揺さぶり、人の心を震わせる。
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted fade-up" style={{ animationDelay: "0.35s" }}>
            壊れた身体、折れかけた心——それでも立ち上がった人間の記録。
            <br />
            ここに収められた言葉と物語が、あなたの中の何かに届くことを願って。
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
                href={`/athletes/${athlete.id}`}
                className="group block"
              >
                <article className="glass-card rounded-xl p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.08)]">
                  <div className="flex gap-5 items-start">
                    {/* Sport Image */}
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
