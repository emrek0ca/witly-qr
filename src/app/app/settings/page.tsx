"use client";

import { useEffect, useState } from "react";

type EnvStatus = {
  clerk: boolean;
  database: boolean;
  iyzico: boolean;
  appUrl: string | null;
};

function Pill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div
      className={
        ok
          ? "rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/70"
          : "rounded-full border border-black/10 bg-amber-500/10 px-3 py-1 text-xs text-amber-900"
      }
    >
      {label}: {ok ? "OK" : "Eksik"}
    </div>
  );
}

export default function Page() {
  const [status, setStatus] = useState<EnvStatus | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("/api/health/env", { cache: "no-store" });
      if (!mounted) return;
      if (!res.ok) return;
      const json = (await res.json()) as { status: EnvStatus };
      setStatus(json.status);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="flex flex-col gap-6">
      <div>
        <div className="text-xs text-black/50">Settings</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Ayarlar</h1>
        <p className="mt-2 max-w-2xl text-sm text-black/60">
          Ayarlanabilir her şeyi burada toplayacağız. Sırlar (.env) sadece backend
          tarafında kullanılır.
        </p>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="text-sm font-medium">Sistem Durumu</div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill ok={Boolean(status?.clerk)} label="Clerk" />
          <Pill ok={Boolean(status?.database)} label="Database" />
          <Pill ok={Boolean(status?.iyzico)} label="İyzico" />
        </div>
        <div className="mt-4 text-sm text-black/60">
          App URL: <span className="font-mono">{status?.appUrl ?? "—"}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="text-sm font-medium">Ödeme (İyzico)</div>
        <div className="mt-1 text-sm text-black/60">
          Link API entegrasyonu yalnızca backend endpoint’i üzerinden çalışır:
          <span className="ml-2 font-mono">/api/payments/iyzico/link</span>
        </div>
        <div className="mt-4 text-sm text-black/60">
          Anahtarlar proje içinde saklanmaz; <span className="font-mono">.env.local</span>
          ile yönetilir.
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="text-sm font-medium">Marka</div>
        <div className="mt-1 text-sm text-black/60">Yakında: logo, renk, tipografi.</div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="text-sm font-medium">Yetkiler</div>
        <div className="mt-1 text-sm text-black/60">Yakında: roller ve erişimler.</div>
      </div>
    </main>
  );
}
