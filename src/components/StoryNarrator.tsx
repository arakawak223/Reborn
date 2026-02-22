"use client";

import TextToSpeech from "./TextToSpeech";

interface Chapter {
  id: string;
  title: string;
  body: string;
  stage: string;
  year_label?: string | null;
}

interface StoryNarratorProps {
  /** Read a single chapter */
  chapter: Chapter;
}

/** Per-chapter read-aloud button */
export function ChapterNarrator({ chapter }: StoryNarratorProps) {
  const stage = (["origin", "despair", "void", "awakening", "rebirth"].includes(chapter.stage)
    ? chapter.stage
    : null) as "origin" | "despair" | "void" | "awakening" | "rebirth" | null;

  return (
    <TextToSpeech
      text={`${chapter.title}。\n${chapter.body}`}
      label="この章を読み上げ"
      mode="emotional"
      compact={false}
      stage={stage}
    />
  );
}

interface FullStoryNarratorProps {
  chapters: Chapter[];
  athleteName: string;
}

/** Full story narration button */
export function FullStoryNarrator({ chapters, athleteName }: FullStoryNarratorProps) {
  const fullText = chapters
    .map((ch) => `${ch.title}。\n${ch.body}`)
    .join("\n\n");

  return (
    <TextToSpeech
      text={`${athleteName}の復活の物語。\n\n${fullText}`}
      label="全章を通して読み上げ"
      mode="emotional"
    />
  );
}
