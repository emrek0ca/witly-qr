import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ qr: string }> }) {
  const { qr } = await params;

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-xs text-black/50">Guest</div>
        <div className="mt-2 text-lg font-semibold tracking-tight">
          Masa menüsü
        </div>
        <div className="mt-2 text-sm text-black/60">
          QR: <span className="font-mono">{qr}</span>
        </div>
        <div className="mt-6 text-sm text-black/60">
          Bir sonraki adım: QR → table resolve + session join.
        </div>
        <div className="mt-6 flex gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/15 bg-white px-4 text-sm font-medium text-black hover:bg-black/[0.03]"
          >
            Ana sayfa
          </Link>
          <Link
            href="/app"
            className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-black/90"
          >
            PaneL
          </Link>
        </div>
      </div>
    </main>
  );
}
