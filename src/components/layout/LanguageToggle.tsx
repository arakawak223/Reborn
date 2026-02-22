"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/locale-context";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const otherLocale: Locale = locale === "ja" ? "en" : "ja";

  // Replace /ja/ or /en/ prefix with the other locale
  const switchedPath = pathname.replace(
    /^\/(ja|en)/,
    `/${otherLocale}`
  );

  return (
    <Link
      href={switchedPath}
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted hover:text-foreground hover:bg-white/10 transition-all"
      title={locale === "ja" ? "Switch to English" : "\u65e5\u672c\u8a9e\u306b\u5207\u308a\u66ff\u3048"}
    >
      <span className={locale === "ja" ? "text-foreground font-bold" : ""}>JA</span>
      <span className="text-muted/40">/</span>
      <span className={locale === "en" ? "text-foreground font-bold" : ""}>EN</span>
    </Link>
  );
}
