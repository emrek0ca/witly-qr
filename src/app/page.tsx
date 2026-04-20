import Link from "next/link";
import { PublicLeadForm } from "@/components/public-lead-form";
import { Icon, type IconName } from "@/components/icon";

const signalCards: Array<{ icon: IconName; label: string }> = [
  { icon: "shield", label: "safe" },
  { icon: "link", label: "share" },
  { icon: "table", label: "live" },
];

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

export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto flex min-h-[calc(100vh-0px)] max-w-7xl flex-col gap-8 px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-panel rounded-[2rem] p-5 sm:p-6 lg:p-8">
            <div className="flex items-center gap-2">
              <div className="inline-flex size-9 items-center justify-center rounded-2xl bg-black text-white">
                <Icon name="qr" className="size-4" />
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-black/42">
                Witly QR
              </div>
            </div>

            <h1 className="mt-8 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              QR dining, live sessions, split pay.
            </h1>

            <div className="mt-6 flex flex-wrap gap-2">
              <Action href="/sign-up" icon="plus" label="Start" />
              <Action href="/pricing" icon="chart" label="Pricing" tone="light" />
              <Action href="/app" icon="grid" label="App" tone="light" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["QR", "scan"],
                ["Live", "session"],
                ["Pay", "share"],
              ].map(([a, b]) => (
                <div key={a} className="rounded-[1.5rem] border border-black/8 bg-black/[0.02] p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/42">
                    <Icon name="spark" className="size-3.5" />
                    {a}
                  </div>
                  <div className="mt-2 text-sm text-black/60">{b}</div>
                </div>
              ))}
            </div>
          </div>

          <PublicLeadForm source="home" ctaLabel="Request" />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {signalCards.map(({ icon, label }) => (
            <div key={label} className="glass-panel rounded-[1.5rem] p-4">
              <div className="inline-flex size-9 items-center justify-center rounded-2xl border border-black/10 bg-white">
                <Icon name={icon} className="size-4" />
              </div>
              <div className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-black/55">
                {label}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
