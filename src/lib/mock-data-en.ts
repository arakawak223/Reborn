// ===================================================
// RE:BORN — English Content Aggregator
// ===================================================

import type {
  AthleteProfile,
  GoldenQuote,
  Testimony,
  StoryChapter,
  InjuryRecord,
  QuizQuestion,
  BodyCoord,
} from "./mock-data";

import { athletes } from "./mock-data-en-athletes";
import { goldenQuotes, testimonies } from "./mock-data-en-quotes";
import {
  athleteInjuries,
  quizQuestions,
  bodyRegionCoordinates,
} from "./mock-data-en-injuries";
import { storyChaptersPart1 } from "./mock-data-en-stories-1";
import { storyChaptersPart2 } from "./mock-data-en-stories-2";
import { storyChaptersPart3 } from "./mock-data-en-stories-3";
import { storyChaptersPart4 } from "./mock-data-en-stories-4";
import { storyChaptersPart5 } from "./mock-data-en-stories-5";

// Re-export data arrays
export {
  athletes,
  goldenQuotes,
  testimonies,
  athleteInjuries,
  quizQuestions,
  bodyRegionCoordinates,
};

// Combine story chapters from all parts
export const storyChapters: StoryChapter[] = [
  ...storyChaptersPart1,
  ...storyChaptersPart2,
  ...storyChaptersPart3,
  ...storyChaptersPart4,
  ...storyChaptersPart5,
];

// ===== Helper Functions =====
export function getAthleteById(id: string) {
  return athletes.find((a) => a.id === id) ?? null;
}

export function getQuotesByAthleteId(id: string) {
  return goldenQuotes.filter((q) => q.athlete_id === id);
}

export function getTestimoniesByAthleteId(id: string) {
  return testimonies.filter((t) => t.athlete_id === id);
}

export function getStoryByAthleteId(id: string) {
  return storyChapters
    .filter((s) => s.athlete_id === id)
    .sort((a, b) => a.order - b.order);
}

export function getInjuriesByAthleteId(id: string) {
  return athleteInjuries
    .filter((i) => i.athlete_id === id)
    .sort((a, b) => b.severity - a.severity);
}

export function getQuizById(id: string) {
  return quizQuestions.find((q) => q.id === id) ?? null;
}

export function getQuizzesByAthleteId(id: string | null) {
  if (!id) return quizQuestions;
  return quizQuestions.filter((q) => q.athlete_id === id);
}

export function searchInjuries(
  bodyRegion?: string | null,
  injuryType?: string | null,
) {
  let results = [...athleteInjuries];
  if (bodyRegion) results = results.filter((i) => i.body_region === bodyRegion);
  if (injuryType) results = results.filter((i) => i.injury_type === injuryType);
  return results
    .sort((a, b) => b.severity - a.severity)
    .map((injury) => ({
      ...injury,
      athletes: athletes.find((a) => a.id === injury.athlete_id)!,
    }));
}
