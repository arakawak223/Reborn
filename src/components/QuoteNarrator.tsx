"use client";

import TextToSpeech from "./TextToSpeech";

interface QuoteNarratorProps {
  quote: string;
  context?: string;
}

export function QuoteNarrator({ quote, context }: QuoteNarratorProps) {
  const text = context ? `${quote}。${context}` : quote;
  return <TextToSpeech text={text} mode="emotional" compact />;
}

interface TestimonyNarratorProps {
  quote: string;
  speaker: string;
  role: string;
}

export function TestimonyNarrator({ quote, speaker, role }: TestimonyNarratorProps) {
  const text = `${speaker}、${role}。${quote}`;
  return <TextToSpeech text={text} mode="emotional" compact />;
}

interface SectionNarratorProps {
  text: string;
  label?: string;
}

export function SectionNarrator({ text, label = "読み上げ" }: SectionNarratorProps) {
  return <TextToSpeech text={text} label={label} mode="normal" />;
}
