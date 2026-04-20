"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/icon";

function Action({
  href,
  icon,
  label,
  tone = "dark",
}: {
  href: string;
  icon: IconName;
  label: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition",
        tone === "dark"
          ? "bg-black text-white hover:bg-black/88"
          : "border border-black/12 bg-white/80 text-black hover:bg-white",
      ].join(" ")}
    >
      <Icon name={icon} className="size-4" />
      {label}
    </Link>
  );
}

type MeWorkspace = {
  id: string;
  name: string;
  slug: string;
  role: string;
};

type GrowthSnapshot = {
  score: number;
  label: string;
  nextActions: string[];
  publicSignals: {
    branches: number;
    tables: number;
    menus: number;
    qrCodes: number;
    leads: number;
  };
};

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState<MeWorkspace | null>(null);
  const [growth, setGrowth] = useState<GrowthSnapshot | null>(null);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const canCreate = useMemo(() => name.trim().length >= 2 && !creating, [name, creating]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("/api/workspaces/me", { cache: "no-store" });
      if (!mounted) return;
      if (res.ok) {
        const json = (await res.json()) as {
          workspace: MeWorkspace | null;
          growth: GrowthSnapshot;
        };
        setWorkspace(json.workspace);
        setGrowth(json.growth);
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
    setGrowth(null);
  }

  const tiles = [
    { icon: "grid" as IconName, value: growth?.publicSignals.branches ?? 0, label: "BR" },
    { icon: "table" as IconName, value: growth?.publicSignals.tables ?? 0, label: "TB" },
    { icon: "menu" as IconName, value: growth?.publicSignals.menus ?? 0, label: "MN" },
    { icon: "qr" as IconName, value: growth?.publicSignals.qrCodes ?? 0, label: "QR" },
  ];

  return (
    <main className="flex flex-col gap-6">
      <section className="surface-panel rounded-[2rem] p-5 sm:p-6 lg:p-7">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
            <Icon name="spark" className="size-3.5" />
            Overview
          </div>
          <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
            {loading ? "..." : workspace ? workspace.role : "guest"}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="flex h-11 flex-1 items-center gap-2 rounded-full border border-black/12 bg-white px-4">
            <Icon name="plus" className="size-4 text-black/35" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={workspace ? workspace.name : "Workspace"}
              className="w-full bg-transparent text-sm outline-none placeholder:text-black/28"
            />
          </label>
          <button
            type="button"
            disabled={!canCreate}
            onClick={onCreate}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-4 text-sm font-medium text-white transition hover:bg-black/88 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Icon name="arrow-right" className="size-4" />
            {creating ? "..." : "Create"}
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {tiles.map((tile) => (
            <div key={tile.label} className="rounded-[1.5rem] border border-black/8 bg-black/[0.02] p-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                  <Icon name={tile.icon} className="size-4" />
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/40">
                  {tile.label}
                </div>
              </div>
              <div className="mt-4 text-3xl font-semibold tracking-tight">{tile.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
              <Icon name="chart" className="size-3.5" />
              Growth
            </div>
            <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
              {growth?.label ?? "needs activation"}
            </div>
          </div>
          <div className="mt-5 flex items-end gap-4">
            <div className="text-5xl font-semibold tracking-tight">{growth?.score ?? 15}</div>
            <div className="pb-1 text-xs uppercase tracking-[0.18em] text-black/42">score</div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Action href="/app/launch-setup" icon="spark" label="Setup" tone="light" />
            <Action href="/app/tables" icon="table" label="Tables" tone="light" />
            <Action href="/app/live" icon="users" label="Live" tone="light" />
          </div>
        </div>

        <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
            <Icon name="link" className="size-3.5" />
            Next
          </div>
          <div className="mt-5 grid gap-2">
            {growth?.nextActions?.length ? (
              growth.nextActions.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-full border border-black/8 bg-black/[0.02] px-4 py-3 text-sm text-black/62"
                >
                  <Icon name="arrow-right" className="size-4 text-black/35" />
                  <span className="truncate">{item}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3 rounded-full border border-black/8 bg-black/[0.02] px-4 py-3 text-sm text-black/42">
                <Icon name="spark" className="size-4 text-black/35" />
                <span className="truncate">—</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <Action href="/app/launch-setup" icon="plus" label="Launch" tone="light" />
        <Action href="/app/menu" icon="menu" label="Menu" tone="light" />
        <Action href="/app/settings" icon="settings" label="Settings" tone="light" />
      </section>
    </main>
  );
}
