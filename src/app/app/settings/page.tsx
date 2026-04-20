"use client";

import * as Switch from "@radix-ui/react-switch";
import * as Tabs from "@radix-ui/react-tabs";
import { useMemo } from "react";
import { Icon, type IconName } from "@/components/icon";
import { FloatingOrbs, MotionItem, MotionShell, MotionStack } from "@/components/motion";
import { useEnvStatus } from "@/hooks/use-env-status";
import { usePersistedState } from "@/hooks/use-persisted-state";
import { useWorkspaceSummary } from "@/hooks/use-workspace-summary";

type UiPrefs = {
  compact: boolean;
  motion: boolean;
  accent: number;
};

function Pill({ icon, ok, label }: { icon: IconName; ok: boolean; label: string }) {
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

function ToggleRow({
  icon,
  title,
  checked,
  onCheckedChange,
}: {
  icon: IconName;
  title: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-black/8 bg-black/[0.02] px-4 py-3">
      <div className="inline-flex items-center gap-3">
        <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
          <Icon name={icon} className="size-4" />
        </span>
        <div className="text-sm font-medium text-black/72">{title}</div>
      </div>
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="relative h-7 w-12 rounded-full border border-black/10 bg-white data-[state=checked]:bg-black"
      >
        <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-black shadow-sm transition-transform will-change-transform data-[state=checked]:translate-x-6 data-[state=checked]:bg-white" />
      </Switch.Root>
    </div>
  );
}

export default function Page() {
  const status = useEnvStatus();
  const { workspace, growth } = useWorkspaceSummary();
  const [prefs, setPrefs] = usePersistedState<UiPrefs>("witly-ui-prefs", {
    compact: false,
    motion: true,
    accent: 0,
  });

  const accentSwatches = useMemo(
    () => [
      { value: 0, color: "#111111" },
      { value: 1, color: "#9d6b32" },
      { value: 2, color: "#2d6b6f" },
      { value: 3, color: "#6e4a92" },
    ],
    [],
  );

  return (
    <main className="flex flex-col gap-4">
      <MotionShell enabled={prefs.motion}>
        <section className="surface-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
          <FloatingOrbs enabled={prefs.motion} />
          <div className="relative flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
              <Icon name="settings" className="size-3.5" />
              Settings
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
              <Icon name="shield" className="size-3.5" />
              {workspace ? workspace.role : "local"}
            </div>
          </div>

          <div className="relative mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Pill icon="shield" ok={Boolean(status?.clerk)} label="Clerk" />
            <Pill icon="grid" ok={Boolean(status?.database)} label="DB" />
            <Pill icon="spark" ok={Boolean(status?.iyzico)} label="iyzico" />
            <Pill icon="link" ok={Boolean(status?.appUrl)} label="URL" />
          </div>
        </section>
      </MotionShell>

      <MotionStack enabled={prefs.motion}>
        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionItem enabled={prefs.motion}>
            <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                <Icon name="users" className="size-3.5" />
                Auth
              </div>

              <div className="mt-4 grid gap-3">
                <div className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-3">
                      <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                        <Icon name="shield" className="size-4" />
                      </span>
                      <div className="text-sm font-medium text-black/72">
                        {workspace ? workspace.slug : "bootstrap"}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-black/45">
                      <Icon name="check" className="size-3.5" />
                      {workspace ? "1" : "0"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                    <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                      <Icon name="chart" className="size-4" />
                    </div>
                    <div className="mt-4 text-2xl font-semibold tracking-tight">{growth?.score ?? 15}</div>
                  </div>
                  <div className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                    <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                      <Icon name="users" className="size-4" />
                    </div>
                    <div className="mt-4 text-2xl font-semibold tracking-tight">{status?.clerk ? "1" : "0"}</div>
                  </div>
                </div>
              </div>
            </div>
          </MotionItem>

          <MotionItem enabled={prefs.motion}>
            <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
              <Tabs.Root defaultValue="motion" className="grid gap-4">
                <Tabs.List className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-black/[0.02] p-1">
                  <Tabs.Trigger
                    value="motion"
                    aria-label="Motion"
                    className="inline-flex size-10 items-center justify-center rounded-full text-black/50 transition data-[state=active]:bg-white data-[state=active]:text-black"
                  >
                    <Icon name="switch" className="size-4" />
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="theme"
                    aria-label="Theme"
                    className="inline-flex size-10 items-center justify-center rounded-full text-black/50 transition data-[state=active]:bg-white data-[state=active]:text-black"
                  >
                    <Icon name="palette" className="size-4" />
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="profile"
                    aria-label="Profile"
                    className="inline-flex size-10 items-center justify-center rounded-full text-black/50 transition data-[state=active]:bg-white data-[state=active]:text-black"
                  >
                    <Icon name="user-check" className="size-4" />
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="motion" className="grid gap-3">
                  <ToggleRow
                    icon="switch"
                    title="Motion"
                    checked={prefs.motion}
                    onCheckedChange={(checked) => setPrefs((prev) => ({ ...prev, motion: checked }))}
                  />
                  <ToggleRow
                    icon="menu"
                    title="Compact"
                    checked={prefs.compact}
                    onCheckedChange={(checked) => setPrefs((prev) => ({ ...prev, compact: checked }))}
                  />
                </Tabs.Content>

                <Tabs.Content value="theme" className="grid gap-3">
                  <div className="grid gap-3 rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-black/42">
                      <Icon name="sun" className="size-3.5" />
                      Accent
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {accentSwatches.map((swatch) => (
                        <button
                          key={swatch.value}
                          type="button"
                          onClick={() => setPrefs((prev) => ({ ...prev, accent: swatch.value }))}
                          className={[
                            "size-11 rounded-full border transition",
                            prefs.accent === swatch.value ? "border-black/60 shadow-[0_0_0_4px_rgba(0,0,0,0.05)]" : "border-black/10",
                          ].join(" ")}
                          style={{ background: swatch.color }}
                          aria-label={`Accent ${swatch.value + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </Tabs.Content>

                <Tabs.Content value="profile" className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                      <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                        <Icon name="copy" className="size-4" />
                      </div>
                      <div className="mt-4 text-sm font-medium text-black/72">{status?.appUrl ?? "—"}</div>
                    </div>
                    <div className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                      <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                        <Icon name="eye" className="size-4" />
                      </div>
                      <div className="mt-4 text-sm font-medium text-black/72">{workspace?.name ?? "—"}</div>
                    </div>
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </MotionItem>
        </section>
      </MotionStack>
    </main>
  );
}
