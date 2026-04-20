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
  const density = prefs.compact ? "compact" : "roomy";

  const stats = [
    { icon: "grid" as IconName, value: growth?.publicSignals.branches ?? 0, label: "BR" },
    { icon: "table" as IconName, value: growth?.publicSignals.tables ?? 0, label: "TB" },
    { icon: "qr" as IconName, value: growth?.publicSignals.qrCodes ?? 0, label: "QR" },
  ];

  return (
    <main className="flex flex-col gap-4">
      <MotionShell enabled={prefs.motion}>
        <section className="surface-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
          <FloatingOrbs enabled={prefs.motion} />
          <div className="relative flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
              <Icon name="table" className="size-3.5" />
              Tables
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
              <Icon name="drag" className="size-3.5" />
              {density}
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
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <MotionItem enabled={prefs.motion}>
            <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                <Icon name="grid" className="size-3.5" />
                Branches
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                        <Icon name="grid" className="size-4" />
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-black/45">
                        <Icon name="check" className="size-3.5" />
                        {index + 1}
                      </div>
                    </div>
                    <div className="mt-4 h-3 w-24 rounded-full bg-black/5" />
                    <div className="mt-3 grid gap-2">
                      <div className="h-9 rounded-full bg-white/80" />
                      <div className="h-9 rounded-full bg-white/80" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionItem>

          <MotionItem enabled={prefs.motion}>
            <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                <Icon name="copy" className="size-3.5" />
                QR
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className={[
                      "aspect-square rounded-[1.25rem] border border-black/8",
                      index % 2 === 0 ? "bg-black/[0.03]" : "bg-white",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          </MotionItem>
        </section>
      </MotionStack>
    </main>
  );
}
