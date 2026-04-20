export default function Page() {
  return (
    <main className="flex flex-col gap-6">
      <div>
        <div className="text-xs text-black/50">Launch Setup</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Yayına Hazırlık
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-black/60">
          Bu akış; şube, masa ve menü temelini kısa adımlarla tamamlamak için.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { t: "Şube", d: "İlk şubeyi oluştur" },
          { t: "Masalar", d: "Masa listesi + numaralandırma" },
          { t: "Menü", d: "Kategori + ürünleri ekle" },
        ].map((i) => (
          <div key={i.t} className="rounded-2xl border border-black/10 bg-white p-5">
            <div className="text-sm font-medium">{i.t}</div>
            <div className="mt-1 text-sm text-black/60">{i.d}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="text-sm font-medium">Durum</div>
        <div className="mt-1 text-sm text-black/60">Henüz bağlanmadı.</div>
      </div>
    </main>
  );
}
