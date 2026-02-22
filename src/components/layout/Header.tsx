import Link from "next/link";
import type { Locale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 bg-[#05050a]/90 backdrop-blur-md gradient-line-bottom">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight gradient-text">
            RE:BORN
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            {dict.header.subtitle}
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href={`/${locale}/athletes`}
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            {dict.header.athletes}
          </Link>
          <Link
            href={`/${locale}/explore`}
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            {dict.header.explore}
          </Link>
          <LanguageToggle locale={locale} />
        </nav>
      </div>
    </header>
  );
}
