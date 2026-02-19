import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-accent">RE:</span>BORN
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            復活アスリート図鑑 — 魂のアーカイブ
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/athletes"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            選手一覧
          </Link>
          <Link
            href="/explore"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            探索
          </Link>
        </nav>
      </div>
    </header>
  );
}
