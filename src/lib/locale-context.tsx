"use client";

import { createContext, useContext } from "react";

export type Locale = "ja" | "en";

const LocaleContext = createContext<Locale>("ja");

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
