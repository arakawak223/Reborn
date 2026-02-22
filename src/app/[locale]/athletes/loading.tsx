export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-foreground/10" />
        <div className="mt-2 h-4 w-48 animate-pulse rounded-lg bg-foreground/5" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl border border-border bg-card"
          />
        ))}
      </div>
    </div>
  );
}
