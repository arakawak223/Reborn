"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-block text-xs text-muted hover:text-foreground transition-colors"
    >
      ← 1つ前に戻る
    </button>
  );
}
