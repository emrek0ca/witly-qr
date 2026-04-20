"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-black/10 bg-white p-5 hover:border-black/20"
    >
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-1 text-sm text-black/60">{desc}</div>
      <div className="mt-4 text-xs text-black/50 group-hover:text-black/70">Aç →</div>
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

const quickLinks = [
  {
    title: "Launch Setup",
    desc: "Branch, tables, and menu foundation.",
    href: "/app/launch-setup",
  },
  {
    title: "Tables & QR",
    desc: "QR mapping, branch coverage, and live states.",
    href: "/app/tables",
  },
  {
    title: "Live Sessions",
    desc: "Claims, split views, and payment state.",
    href: "/app/live",
  },
];

const checkpoints = [
  ["Workspace", "Tenant root and staff roles"],
  ["Branches", "Location-level operations"],
  ["Menu", "Snapshot pricing and modifiers"],
  ["Payments", "Secure iyzico link flow"],
];

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

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xs uppercase tracking-[0.2em] text-black/45">Overview</div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Operations control room
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-black/60 sm:text-base">
          Central place for launch readiness, workspace status, and the live
          path from table scan to split payment.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-medium">Workspace</div>
              <div className="mt-1 text-sm leading-6 text-black/60">
                {loading
                  ? "Loading workspace..."
                  : workspace
                    ? `${workspace.name} · ${workspace.role}`
                    : "No workspace connected yet."}
              </div>
            </div>
            <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
              Tenant aware
            </div>
          </div>

          {!loading && !workspace ? (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Workspace name"
                className="h-11 flex-1 rounded-full border border-black/12 bg-white px-4 text-sm outline-none transition placeholder:text-black/32 focus:border-black/30"
              />
              <button
                type="button"
                disabled={!canCreate}
                onClick={onCreate}
                className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-black/88 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {creating ? "Creating..." : "Create workspace"}
              </button>
            </div>
          ) : (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {checkpoints.map(([title, desc]) => (
                <div key={title} className="glass-panel rounded-2xl p-4">
                  <div className="text-sm font-medium">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-black/60">{desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              label: "Launch readiness",
              value: "4 domains",
              hint: "Branch, tables, menu, payments",
            },
            {
              label: "Payment safety",
              value: "Server-owned",
              hint: "iyzico secrets never reach the client",
            },
            {
              label: "Guest flow",
              value: "QR → session",
              hint: "Open table context on scan",
            },
            {
              label: "Split billing",
              value: "Claims",
              hint: "Item-level ownership and reconciliation",
            },
          ].map((item) => (
            <div key={item.label} className="glass-panel rounded-[1.5rem] p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-black/42">
                {item.label}
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight">{item.value}</div>
              <div className="mt-2 text-sm leading-6 text-black/60">{item.hint}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
          <div className="text-sm font-medium">Growth engine</div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-black/42">Score</div>
              <div className="mt-2 text-4xl font-semibold tracking-tight">
                {growth?.score ?? 15}
              </div>
            </div>
            <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
              {growth?.label ?? "needs activation"}
            </div>
          </div>
          <div className="mt-4 grid gap-2 text-sm text-black/62">
            {[
              `Branches: ${growth?.publicSignals.branches ?? 0}`,
              `Tables: ${growth?.publicSignals.tables ?? 0}`,
              `Menu items: ${growth?.publicSignals.menus ?? 0}`,
              `QR codes: ${growth?.publicSignals.qrCodes ?? 0}`,
              `Leads captured: ${growth?.publicSignals.leads ?? 0}`,
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
          <div className="text-sm font-medium">Next best actions</div>
          <div className="mt-4 grid gap-3">
            {(growth?.nextActions ?? [
              "Create the first workspace and branch.",
              "Capture one lead from the pricing page.",
              "Share the public QR experience with guests.",
            ]).map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3 text-sm text-black/62"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((item) => (
          <Card key={item.href} title={item.title} desc={item.desc} href={item.href} />
        ))}
      </section>

      <section className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
        <div className="text-sm font-medium">What ships next</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "Workspace-scoped branch and table models",
            "QR resolution and session join flow",
            "Claim lifecycle with item snapshots",
            "iyzico payment link creation and reconciliation",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3 text-sm text-black/64"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
