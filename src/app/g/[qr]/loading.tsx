export default function Loading() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="h-4 w-24 animate-pulse rounded bg-black/[0.06]" />
        <div className="mt-4 h-6 w-40 animate-pulse rounded bg-black/[0.06]" />
        <div className="mt-3 h-4 w-64 animate-pulse rounded bg-black/[0.06]" />
      </div>
    </main>
  );
}
