"use client";

import { use, useState, useCallback } from "react";
import { getQuizzesByAthleteId, getAthleteById } from "@/lib/data";
import { useLocale } from "@/lib/locale-context";
import { getDictionary } from "@/lib/i18n";
import type { QuizQuestion } from "@/lib/mock-data";

export default function QuizPage({
  params,
}: {
  params: Promise<{ locale: string; athleteId: string }>;
}) {
  const { athleteId } = use(params);
  const locale = useLocale();
  const dict = getDictionary(locale);
  const athlete = getAthleteById(athleteId, locale);
  const allQuizzes = getQuizzesByAthleteId(athleteId, locale);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question: QuizQuestion | undefined = allQuizzes[currentIndex];

  const handleSelect = useCallback(
    (index: number) => {
      if (revealed) return;
      setSelectedAnswer(index);
      setRevealed(true);
      if (question && index === question.correct_index) {
        setCorrectCount((c) => c + 1);
      }
    },
    [revealed, question]
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= allQuizzes.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setRevealed(false);
    }
  }, [currentIndex, allQuizzes.length]);

  if (allQuizzes.length === 0) {
    return <p className="py-8 text-center text-sm text-muted">{dict.quiz.noData}</p>;
  }

  if (finished) {
    return (
      <div className="py-12 text-center">
        <p className="text-2xl font-bold">
          {correctCount}/{allQuizzes.length} {dict.quiz.correct}
        </p>
        <p className="mt-4 text-sm text-muted">
          {correctCount === allQuizzes.length
            ? dict.quiz.perfectMessage.replace("{name}", athlete?.name ?? "")
            : dict.quiz.retryMessage}
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setSelectedAnswer(null);
            setRevealed(false);
            setCorrectCount(0);
            setFinished(false);
          }}
          className="mt-6 rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
        >
          {dict.quiz.retry}
        </button>
      </div>
    );
  }

  if (!question) return null;

  const LETTERS = ["A", "B", "C", "D"];

  return (
    <div>
      <h2 className="text-xs font-medium tracking-widest text-muted uppercase">
        {question.quiz_type === "coffee_break" ? dict.quiz.coffeeBreak : dict.quiz.serious}
      </h2>

      {/* Progress */}
      <div className="mt-4 flex items-center gap-2">
        {allQuizzes.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < currentIndex ? "bg-accent" : i === currentIndex ? "bg-accent/40" : "bg-foreground/10"
            }`}
            style={
              i < currentIndex
                ? { background: "linear-gradient(90deg, #ef4444, #f97316)" }
                : undefined
            }
          />
        ))}
        <span className="ml-2 text-xs text-muted">
          {currentIndex + 1}/{allQuizzes.length}
        </span>
      </div>

      {/* Question */}
      <div className="mt-8">
        <p className="text-base font-medium leading-relaxed">
          {question.question_text}
        </p>

        <div className="mt-6 space-y-3">
          {question.choices.map((choice, i) => {
            let shadowStyle = {};
            let borderClass = "border-[var(--glass-border)]";
            let bgStyle = "var(--glass-bg)";

            if (revealed) {
              if (i === question.correct_index) {
                borderClass = "border-green-500";
                bgStyle = "rgba(34, 197, 94, 0.05)";
                shadowStyle = { boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)" };
              } else if (i === selectedAnswer) {
                borderClass = "border-red-500";
                bgStyle = "rgba(239, 68, 68, 0.05)";
                shadowStyle = { boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)" };
              }
            } else if (i === selectedAnswer) {
              borderClass = "border-accent";
              bgStyle = "rgba(239, 68, 68, 0.05)";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={revealed}
                className={`flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left text-sm transition-all backdrop-blur-sm ${borderClass} ${
                  !revealed ? "hover:border-accent/40" : ""
                } disabled:cursor-default`}
                style={{ background: bgStyle, ...shadowStyle }}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    revealed && i === question.correct_index
                      ? "bg-green-500 text-white"
                      : revealed && i === selectedAnswer
                      ? "bg-red-500 text-white"
                      : "border border-[var(--glass-border)]"
                  }`}
                >
                  {LETTERS[i]}
                </span>
                <span>{choice}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {revealed && (
        <div className="mt-8 space-y-4">
          <div className="glass-card rounded-lg p-4">
            <p className="text-xs font-medium tracking-widest text-muted uppercase">{dict.quiz.explanation}</p>
            <p className="mt-2 text-sm leading-relaxed">
              {question.rationale}
            </p>
          </div>
          <div className="glass-card rounded-lg p-4 border-l-2 border-accent/40">
            <p className="text-sm italic leading-relaxed text-accent">
              {question.encouragement}
            </p>
          </div>
          <button
            onClick={handleNext}
            className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
          >
            {currentIndex + 1 >= allQuizzes.length ? dict.quiz.showResults : dict.quiz.next}
          </button>
        </div>
      )}
    </div>
  );
}
