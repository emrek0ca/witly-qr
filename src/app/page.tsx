import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/70">
              Witly QR
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Premium QR menü ve masa oturumu
            </h1>
            <p className="max-w-2xl text-base text-black/70 sm:text-lg">
              İşletmeler için çok kiracılı panel, misafirler için masa-bağlamlı
              canlı oturum ve paylaştırmalı ödeme.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sign-in"
              className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
            >
              Giriş yap
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/15 bg-white px-5 text-sm font-medium text-black hover:bg-black/[0.03]"
            >
              Hesap oluştur
            </Link>
            <Link
              href="/app"
              className="inline-flex h-11 items-center justify-center rounded-full bg-black/[0.03] px-5 text-sm font-medium text-black hover:bg-black/[0.06]"
            >
              Panele git
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 p-5">
              <div className="text-sm font-medium">Çok kiracılı</div>
              <div className="mt-1 text-sm text-black/60">Postgres RLS</div>
            </div>
            <div className="rounded-2xl border border-black/10 p-5">
              <div className="text-sm font-medium">Masa-bağlamlı</div>
              <div className="mt-1 text-sm text-black/60">QR → Table → Session</div>
            </div>
            <div className="rounded-2xl border border-black/10 p-5">
              <div className="text-sm font-medium">Paylaştırmalı ödeme</div>
              <div className="mt-1 text-sm text-black/60">Claim + iyzico</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
