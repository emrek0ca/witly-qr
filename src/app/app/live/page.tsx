export default function Page() {
  return (
    <main className="flex flex-col gap-6">
      <div>
        <div className="text-xs text-black/50">Live Sessions</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Canlı Oturumlar
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-black/60">
          Masa oturumları, siparişler, claim ve ödeme durumu.
        </p>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="text-sm font-medium">Boş durum</div>
        <div className="mt-1 text-sm text-black/60">Canlı oturum yok.</div>
      </div>
    </main>
  );
}
