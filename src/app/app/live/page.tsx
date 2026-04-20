"use client";

import { Icon, type IconName } from "@/components/icon";
import { FloatingOrbs, MotionItem, MotionShell, MotionStack } from "@/components/motion";
import { usePersistedState } from "@/hooks/use-persisted-state";
import { useWorkspaceSummary } from "@/hooks/use-workspace-summary";

function Stat({ icon, value, label }: { icon: IconName; value: string | number; label: string }) {
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

  const stats = [
    { icon: "table" as IconName, value: growth?.publicSignals.tables ?? 0, label: "TB" },
    { icon: "users" as IconName, value: growth?.publicSignals.leads ?? 0, label: "GD" },
    { icon: "chart" as IconName, value: growth?.score ?? 15, label: "SC" },
  ];

  return (
    <main className="flex flex-col gap-4">
      <MotionShell enabled={prefs.motion}>
        <section className="surface-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
          <FloatingOrbs enabled={prefs.motion} />
          <div className="relative flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
              <Icon name="users" className="size-3.5" />
              Live
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
              <Icon name="spark" className="size-3.5" />
              {growth?.label ?? "—"}
            </div>
          </div>

          <div className="relative mt-5 grid gap-3 md:grid-cols-3">
            {stats.map((stat) => (
              <Stat key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
            ))}
          </div>
        </section>
      </MotionShell>

      <MotionStack enabled={prefs.motion}>
        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <MotionItem enabled={prefs.motion}>
            <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                <Icon name="table" className="size-3.5" />
                Sessions
              </div>

              <div className="mt-4 grid gap-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-full border border-black/8 bg-black/[0.02] px-4 py-3"
                  >
                    <div className="inline-flex items-center gap-3 min-w-0">
                      <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                        <Icon name="users" className="size-4" />
                      </span>
                      <span className="h-3 w-24 rounded-full bg-black/5" />
                    </div>
                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-black/10 bg-white text-black/30">
                      <Icon name="arrow-right" className="size-4" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </MotionItem>

          <MotionItem enabled={prefs.motion}>
            <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                <Icon name="chart" className="size-3.5" />
                Pulse
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                    <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                      <Icon name="spark" className="size-4" />
                    </div>
                    <div className="mt-4 h-3 w-20 rounded-full bg-black/5" />
                    <div className="mt-3 h-9 rounded-full bg-white/80" />
                  </div>
                ))}
              </div>
            </div>
          </MotionItem>
        </section>
      </MotionStack>
    </main>
  );
}
