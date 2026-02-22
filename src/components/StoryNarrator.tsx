"use client";

import TextToSpeech from "./TextToSpeech";
import type { Locale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";

interface Chapter {
  id: string;
  title: string;
  body: string;
  stage: string;
  year_label?: string | null;
}

interface StoryNarratorProps {
  chapter: Chapter;
  locale?: Locale;
}

export function ChapterNarrator({ chapter, locale = "ja" }: StoryNarratorProps) {
  const dict = getDictionary(locale);
  const stage = (["origin", "despair", "void", "awakening", "rebirth"].includes(chapter.stage)
    ? chapter.stage
    : null) as "origin" | "despair" | "void" | "awakening" | "rebirth" | null;

  const sep = locale === "en" ? ".\n" : "\u3002\n";

  return (
    <TextToSpeech
      text={`${chapter.title}${sep}${chapter.body}`}
      label={dict.story.narrateChapter}
      mode="emotional"
      compact={false}
      stage={stage}
      locale={locale}
    />
  );
}

interface FullStoryNarratorProps {
  chapters: Chapter[];
  athleteName: string;
  locale?: Locale;
}

export function FullStoryNarrator({ chapters, athleteName, locale = "ja" }: FullStoryNarratorProps) {
  const dict = getDictionary(locale);
  const sep = locale === "en" ? ".\n" : "\u3002\n";

  const fullText = chapters
    .map((ch) => `${ch.title}${sep}${ch.body}`)
    .join("\n\n");

  const prefix = dict.story.fullNarrationPrefix.replace("{name}", athleteName);

  return (
    <TextToSpeech
      text={`${prefix}\n\n${fullText}`}
      label={dict.story.narrateAll}
      mode="emotional"
      locale={locale}
    />
  );
}
