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
        <div className="text-xs uppercase tracking-[0.2em] text-black/45">Settings</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">System configuration</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
          Secrets stay on the server. This screen is about verification, not
          exposing credentials or payment logic.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-panel rounded-[1.75rem] p-5">
          <div className="text-sm font-medium">Environment status</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill ok={Boolean(status?.clerk)} label="Clerk" />
            <Pill ok={Boolean(status?.database)} label="Database" />
            <Pill ok={Boolean(status?.iyzico)} label="iyzico" />
          </div>
          <div className="mt-5 rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3 text-sm text-black/60">
            App URL: <span className="font-mono">{status?.appUrl ?? "—"}</span>
          </div>
        </div>

        <div className="surface-panel rounded-[1.75rem] p-5">
          <div className="text-sm font-medium">Payment hardening</div>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-black/62">
            <div className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3">
              Payment link creation stays on the server-side route only.
            </div>
            <div className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3">
              Callback URLs are derived from trusted app origin data.
            </div>
            <div className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3">
              Client code never handles iyzico secrets or signatures.
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-panel rounded-[1.75rem] p-5">
          <div className="text-sm font-medium">Brand</div>
          <div className="mt-3 text-sm leading-6 text-black/60">
            Visual language, logo, and color system should stay calm, geometric,
            and high-trust.
          </div>
        </div>
        <div className="glass-panel rounded-[1.75rem] p-5">
          <div className="text-sm font-medium">Roles</div>
          <div className="mt-3 text-sm leading-6 text-black/60">
            Owner, admin, and staff boundaries are enforced in the server and the
            database layer.
          </div>
        </div>
      </div>
    </main>
  );
}
