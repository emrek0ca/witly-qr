"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/icon";
import { FloatingOrbs, MotionItem, MotionShell, MotionStack } from "@/components/motion";
import { usePersistedState } from "@/hooks/use-persisted-state";
import { useWorkspaceSummary } from "@/hooks/use-workspace-summary";

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
        "inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition will-change-transform",
        tone === "dark"
          ? "bg-black text-white hover:-translate-y-0.5 hover:bg-black/88"
          : "border border-black/12 bg-white/80 text-black hover:-translate-y-0.5 hover:bg-white",
      ].join(" ")}
    >
      <Icon name={icon} className="size-4" />
      {label}
    </Link>
  );
}

function Ring({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  const fill = `conic-gradient(#111111 ${clamped}%, rgba(17,17,17,0.08) 0)`;

  return (
    <div
      className="relative grid size-28 place-items-center rounded-full border border-black/8 bg-white shadow-[0_16px_36px_rgba(23,20,18,0.05)]"
      style={{ backgroundImage: fill }}
    >
      <div className="grid size-20 place-items-center rounded-full bg-[var(--surface-strong)]">
        <div className="text-2xl font-semibold tracking-tight">{clamped}</div>
      </div>
    </div>
  );
}

export default function Page() {
  const { loading, workspace, growth, setWorkspace, setGrowth } = useWorkspaceSummary();
  const [prefs] = usePersistedState("witly-ui-prefs", { compact: false, motion: true, accent: 0 });
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const canCreate = useMemo(() => name.trim().length >= 2 && !creating, [name, creating]);

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
    const json = (await res.json()) as { workspace: typeof workspace };
    setWorkspace(json.workspace);
    setGrowth(null);
    setName("");
  }

  const metrics = [
    { icon: "grid" as IconName, value: growth?.publicSignals.branches ?? 0, label: "BR" },
    { icon: "table" as IconName, value: growth?.publicSignals.tables ?? 0, label: "TB" },
    { icon: "menu" as IconName, value: growth?.publicSignals.menus ?? 0, label: "MN" },
    { icon: "qr" as IconName, value: growth?.publicSignals.qrCodes ?? 0, label: "QR" },
  ];

  const compactActions = (growth?.nextActions ?? []).map((item) =>
    item
      .split(" ")
      .slice(0, 3)
      .join(" "),
  );

  return (
    <main className="flex flex-col gap-6">
      <MotionShell enabled={prefs.motion}>
        <section className="surface-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6 lg:p-7">
          <FloatingOrbs enabled={prefs.motion} />
          <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-5">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                  <Icon name="spark" className="size-3.5" />
                  Overview
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                  <Icon name="shield" className="size-3.5" />
                  {loading ? "..." : workspace ? workspace.role : "guest"}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <label className="flex h-12 items-center gap-2 rounded-full border border-black/12 bg-white px-4">
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
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black/88 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Icon name="arrow-right" className="size-4" />
                  {creating ? "..." : "Create"}
                </button>
              </div>

              <MotionStack enabled={prefs.motion}>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {metrics.map((metric) => (
                    <MotionItem key={metric.label} enabled={prefs.motion}>
                      <div className="rounded-[1.5rem] border border-black/8 bg-black/[0.02] p-4">
                        <div className="flex items-center justify-between">
                          <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                            <Icon name={metric.icon} className="size-4" />
                          </div>
                          <div className="text-[11px] uppercase tracking-[0.18em] text-black/40">
                            {metric.label}
                          </div>
                        </div>
                        <div className="mt-4 text-3xl font-semibold tracking-tight">{metric.value}</div>
                      </div>
                    </MotionItem>
                  ))}
                </div>
              </MotionStack>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[1.75rem] border border-black/8 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                    <Icon name="chart" className="size-3.5" />
                    Growth
                  </div>
                  <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                    {growth?.label ?? "needs activation"}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-5">
                  <Ring value={growth?.score ?? 15} />
                  <div className="grid flex-1 gap-2">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-black/42">score</div>
                    <div className="text-5xl font-semibold tracking-tight">{growth?.score ?? 15}</div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Action href="/app/launch-setup" icon="spark" label="Setup" tone="light" />
                      <Action href="/app/menu" icon="menu" label="Menu" tone="light" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 rounded-[1.75rem] border border-black/8 bg-black/[0.02] p-4">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                  <Icon name="link" className="size-3.5" />
                  Next
                </div>
                <div className="grid gap-2">
                  {compactActions.length ? (
                    compactActions.slice(0, 4).map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-full border border-black/8 bg-white px-4 py-3 text-sm text-black/62"
                      >
                        <Icon name="arrow-right" className="size-4 text-black/35" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-3 rounded-full border border-black/8 bg-white px-4 py-3 text-sm text-black/42">
                      <Icon name="spark" className="size-4 text-black/35" />
                      <span className="truncate">—</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </MotionShell>

      <MotionStack enabled={prefs.motion}>
        <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <MotionItem enabled={prefs.motion}>
            <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                  <Icon name="users" className="size-3.5" />
                  Auth
                </div>
                <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                  {workspace ? workspace.slug : "local"}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                  <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                    <Icon name="shield" className="size-4" />
                  </div>
                  <div className="mt-4 text-2xl font-semibold tracking-tight">{workspace ? "1" : "0"}</div>
                </div>
                <div className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                  <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                    <Icon name="check" className="size-4" />
                  </div>
                  <div className="mt-4 text-2xl font-semibold tracking-tight">{loading ? "..." : "ok"}</div>
                </div>
              </div>
            </div>
          </MotionItem>

          <MotionItem enabled={prefs.motion}>
            <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                <Icon name="stack" className="size-3.5" />
                Stack
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Action href="/app/tables" icon="table" label="Tables" tone="light" />
                <Action href="/app/live" icon="users" label="Live" tone="light" />
                <Action href="/app/settings" icon="settings" label="Settings" tone="light" />
                <Action href="/app/launch-setup" icon="plus" label="Launch" tone="light" />
              </div>
            </div>
          </MotionItem>
        </section>
      </MotionStack>
    </main>
  );
}
