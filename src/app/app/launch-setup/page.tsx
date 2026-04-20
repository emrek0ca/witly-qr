"use client";

import { Icon, type IconName } from "@/components/icon";
import { FloatingOrbs, MotionItem, MotionShell, MotionStack } from "@/components/motion";
import { usePersistedState } from "@/hooks/use-persisted-state";
import { useWorkspaceSummary } from "@/hooks/use-workspace-summary";

function Tile({ icon, value, label }: { icon: IconName; value: string | number; label: string }) {
  return (
    <div className="rounded-[1.5rem] border border-black/8 bg-black/[0.02] p-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
          <Icon name={icon} className="size-4" />
        </div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-black/40">{label}</div>
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

export default function Page() {
  const { growth } = useWorkspaceSummary();
  const [prefs] = usePersistedState("witly-ui-prefs", { compact: false, motion: true, accent: 0 });

  const steps = [
    { icon: "grid" as IconName, value: growth?.publicSignals.branches ?? 0, label: "BR" },
    { icon: "table" as IconName, value: growth?.publicSignals.tables ?? 0, label: "TB" },
    { icon: "menu" as IconName, value: growth?.publicSignals.menus ?? 0, label: "MN" },
    { icon: "qr" as IconName, value: growth?.publicSignals.qrCodes ?? 0, label: "QR" },
    { icon: "users" as IconName, value: growth?.publicSignals.leads ?? 0, label: "LD" },
    { icon: "shield" as IconName, value: growth?.score ?? 15, label: "SC" },
  ];

  return (
    <main className="flex flex-col gap-4">
      <MotionShell enabled={prefs.motion}>
        <section className="surface-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
          <FloatingOrbs enabled={prefs.motion} />
          <div className="relative flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
              <Icon name="spark" className="size-3.5" />
              Setup
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
              <Icon name="check" className="size-3.5" />
              {growth?.label ?? "—"}
            </div>
          </div>

          <div className="relative mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {steps.map((step) => (
              <Tile key={step.label} icon={step.icon} value={step.value} label={step.label} />
            ))}
          </div>
        </section>
      </MotionShell>

      <MotionStack enabled={prefs.motion}>
        <section className="grid gap-3 md:grid-cols-2">
          {[
            ["grid", "BR"],
            ["table", "TB"],
            ["menu", "MN"],
            ["qr", "QR"],
          ].map(([icon, label]) => (
            <MotionItem key={label} enabled={prefs.motion}>
              <button className="flex items-center justify-between rounded-[1.5rem] border border-black/10 bg-white px-4 py-4 text-sm font-medium text-black transition hover:-translate-y-0.5">
                <span className="inline-flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-black text-white">
                    <Icon name={icon as IconName} className="size-4" />
                  </span>
                  {label}
                </span>
                <Icon name="arrow-right" className="size-4 text-black/35" />
              </button>
            </MotionItem>
          ))}
        </section>
      </MotionStack>
    </main>
  );
}
