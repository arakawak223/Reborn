import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import BgmProvider from "@/components/BgmProvider";
import { LocaleProvider } from "@/lib/locale-context";
import type { Locale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "ja" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale === "en" ? "en" : "ja") as Locale;

  return (
    <LocaleProvider locale={loc}>
      <Header locale={loc} />
      <main className="flex-1">{children}</main>
      <Footer locale={loc} />
      <BgmProvider locale={loc} />
    </LocaleProvider>
  );
}
