"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-black/10 bg-white p-5 hover:border-black/20"
    >
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-1 text-sm text-black/60">{desc}</div>
      <div className="mt-4 text-xs text-black/50 group-hover:text-black/70">
        Aç →
      </div>
    </Link>
  );
}

type MeWorkspace = {
  id: string;
  name: string;
  slug: string;
  role: string;
};

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState<MeWorkspace | null>(null);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const canCreate = useMemo(() => name.trim().length >= 2 && !creating, [name, creating]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("/api/workspaces/me", { cache: "no-store" });
      if (!mounted) return;
      if (res.ok) {
        const json = (await res.json()) as { workspace: MeWorkspace | null };
        setWorkspace(json.workspace);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function onCreate() {
    if (!canCreate) return;
    setCreating(true);
    const res = await fetch("/api/workspaces/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setCreating(false);
    if (!res.ok) return;
    const json = (await res.json()) as { workspace: MeWorkspace };
    setWorkspace(json.workspace);
  }

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xs text-black/50">Overview</div>
        <h1 className="text-2xl font-semibold tracking-tight">Kontrol Paneli</h1>
        <p className="max-w-2xl text-sm text-black/60">
          Kurulum durumunu, canlı masa oturumlarını ve ödeme akışını buradan
          yöneteceğiz.
        </p>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-medium">Workspace</div>
            <div className="mt-1 text-sm text-black/60">
              {loading
                ? "Yükleniyor…"
                : workspace
                  ? `${workspace.name} · ${workspace.role}`
                  : "Henüz workspace yok."}
            </div>
          </div>

          {!loading && !workspace ? (
            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Workspace adı"
                className="h-10 w-full rounded-full border border-black/15 bg-white px-4 text-sm outline-none focus:border-black/30 md:w-64"
              />
              <button
                type="button"
                disabled={!canCreate}
                onClick={onCreate}
                className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white disabled:opacity-40"
              >
                {creating ? "Oluşturuluyor…" : "Workspace oluştur"}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card
          title="Launch Setup"
          desc="Şube, masa ve menü temelini tamamla."
          href="/app/launch-setup"
        />
        <Card
          title="Tables & QR"
          desc="Masaları, QR kodları ve çözümlemeyi yönet."
          href="/app/tables"
        />
        <Card
          title="Live Sessions"
          desc="Anlık oturumlar, claim ve ödeme durumu."
          href="/app/live"
        />
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="text-sm font-medium">Sıradaki</div>
        <div className="mt-2 grid gap-2 text-sm text-black/60">
          <div>• Branch/table/menu domain’lerini tamamla</div>
          <div>• QR → table resolve + session join</div>
          <div>• Claim + split + ödeme idempotency</div>
          <div>• İyzico Link API: /api/payments/iyzico/link</div>
        </div>
      </div>
    </main>
  );
}
