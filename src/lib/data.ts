import type { Locale } from "./locale-context";
import type {
  AthleteProfile,
  GoldenQuote,
  Testimony,
  StoryChapter,
  InjuryRecord,
  QuizQuestion,
} from "./mock-data";

// Re-export types for convenience
export type {
  AthleteProfile,
  GoldenQuote,
  Testimony,
  StoryChapter,
  InjuryRecord,
  QuizQuestion,
};

function getModule(locale: Locale) {
  if (locale === "en") {
    return require("./mock-data-en");
  }
  return require("./mock-data");
}

export function getAthletes(locale: Locale): AthleteProfile[] {
  return getModule(locale).athletes;
}

export function getAthleteById(
  id: string,
  locale: Locale,
): AthleteProfile | null {
  return getModule(locale).getAthleteById(id);
}

export function getQuotesByAthleteId(
  id: string,
  locale: Locale,
): GoldenQuote[] {
  return getModule(locale).getQuotesByAthleteId(id);
}

export function getTestimoniesByAthleteId(
  id: string,
  locale: Locale,
): Testimony[] {
  return getModule(locale).getTestimoniesByAthleteId(id);
}

export function getStoryByAthleteId(
  id: string,
  locale: Locale,
): StoryChapter[] {
  return getModule(locale).getStoryByAthleteId(id);
}

export function getInjuriesByAthleteId(
  id: string,
  locale: Locale,
): InjuryRecord[] {
  return getModule(locale).getInjuriesByAthleteId(id);
}

export function getQuizById(
  id: string,
  locale: Locale,
): QuizQuestion | null {
  return getModule(locale).getQuizById(id);
}

export function getQuizzesByAthleteId(
  id: string | null,
  locale: Locale,
): QuizQuestion[] {
  return getModule(locale).getQuizzesByAthleteId(id);
}

export function searchInjuries(
  bodyRegion: string | null | undefined,
  injuryType: string | null | undefined,
  locale: Locale,
) {
  return getModule(locale).searchInjuries(bodyRegion, injuryType);
}
