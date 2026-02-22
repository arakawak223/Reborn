"use client";

import TextToSpeech from "./TextToSpeech";
import type { Locale } from "@/lib/locale-context";

interface QuoteNarratorProps {
  quote: string;
  context?: string;
  locale?: Locale;
}

export function QuoteNarrator({ quote, context, locale = "ja" }: QuoteNarratorProps) {
  const sep = locale === "en" ? ". " : "\u3002";
  const text = context ? `${quote}${sep}${context}` : quote;
  return <TextToSpeech text={text} mode="emotional" compact locale={locale} />;
}

interface TestimonyNarratorProps {
  quote: string;
  speaker: string;
  role: string;
  locale?: Locale;
}

export function TestimonyNarrator({ quote, speaker, role, locale = "ja" }: TestimonyNarratorProps) {
  const text = locale === "en"
    ? `${speaker}, ${role}. ${quote}`
    : `${speaker}\u3001${role}\u3002${quote}`;
  return <TextToSpeech text={text} mode="emotional" compact locale={locale} />;
}

interface SectionNarratorProps {
  text: string;
  label?: string;
  locale?: Locale;
}

export function SectionNarrator({ text, label, locale = "ja" }: SectionNarratorProps) {
  return <TextToSpeech text={text} label={label} mode="normal" locale={locale} />;
}
