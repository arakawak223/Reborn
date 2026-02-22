"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";

export default function BackButton({ locale }: { locale: Locale }) {
  const router = useRouter();
  const dict = getDictionary(locale);

  return (
    <button
      onClick={() => router.back()}
      className="inline-block text-xs text-muted hover:text-foreground transition-colors"
    >
      {dict.back.label}
    </button>
  );
}
