import type { Locale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="bg-[#05050a]/90 py-8 gradient-line-top">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted">
        <p>
          <span className="gradient-text font-medium">RE:BORN</span>
          {" \u2014 "}
          {dict.footer.subtitle}
        </p>
        <p className="mt-1">
          {dict.footer.description}
        </p>
      </div>
    </footer>
  );
}
