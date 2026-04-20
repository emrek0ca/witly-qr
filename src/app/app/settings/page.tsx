"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/icon";

type EnvStatus = {
  clerk: boolean;
  database: boolean;
  iyzico: boolean;
  appUrl: string | null;
};

function Chip({ icon, ok, label }: { icon: IconName; ok: boolean; label: string }) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
        ok ? "border-black/10 bg-white text-black" : "border-amber-500/20 bg-amber-500/10 text-amber-900",
      ].join(" ")}
    >
      <Icon name={icon} className="size-4" />
      {label}
    </div>
  );
}

export default function Page() {
  const [status, setStatus] = useState<EnvStatus | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("/api/health/env", { cache: "no-store" });
      if (!mounted || !res.ok) return;
      const json = (await res.json()) as { status: EnvStatus };
      setStatus(json.status);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="flex flex-col gap-4">
      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
        <Icon name="settings" className="size-3.5" />
        Settings
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip icon="shield" ok={Boolean(status?.clerk)} label="Clerk" />
        <Chip icon="grid" ok={Boolean(status?.database)} label="DB" />
        <Chip icon="spark" ok={Boolean(status?.iyzico)} label="iyzico" />
      </div>

      <div className="surface-panel rounded-[1.75rem] p-5">
        <div className="inline-flex items-center gap-2 text-sm font-medium">
          <Icon name="link" className="size-4" />
          {status?.appUrl ?? "—"}
        </div>
      </div>
    </main>
  );
}
