import type { Locale } from "../locale-context";
import type { Dictionary } from "./ja";

const dictionaries: Record<Locale, () => Dictionary> = {
  ja: () => require("./ja").default,
  en: () => require("./en").default,
};

export function getDictionary(locale: Locale): Dictionary {
  return (dictionaries[locale] ?? dictionaries.ja)();
}

export type { Dictionary };
