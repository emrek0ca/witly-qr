export default function Loading() {
  return (
    <main className="mx-auto max-w-md px-4 py-4 sm:px-6 sm:py-8">
      <div className="surface-panel rounded-[2rem] p-6">
        <div className="h-4 w-24 animate-pulse rounded-full bg-black/[0.06]" />
        <div className="mt-4 h-7 w-40 animate-pulse rounded-full bg-black/[0.06]" />
        <div className="mt-3 h-4 w-64 animate-pulse rounded-full bg-black/[0.06]" />
        <div className="mt-6 grid gap-3">
          <div className="h-20 animate-pulse rounded-2xl bg-black/[0.05]" />
          <div className="h-20 animate-pulse rounded-2xl bg-black/[0.05]" />
        </div>
      </div>
    </main>
  );
}
