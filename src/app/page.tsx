import Link from "next/link";
import { PublicLeadForm } from "@/components/public-lead-form";

const metrics = [
  { label: "Setup time", value: "< 1 day" },
  { label: "Payment safety", value: "Server-owned" },
  { label: "Growth loop", value: "QR share + launch pack" },
];

const pillars = [
  {
    title: "Launch faster",
    desc: "Give every branch a live QR menu without mobile app downloads or manual table handling.",
  },
  {
    title: "Sell more per table",
    desc: "Claimed items, split checkout, and table-aware history reduce friction at the moment of payment.",
  },
  {
    title: "Operate cleanly",
    desc: "Tenant-scoped data, snapshots, and server-owned payment flows keep the system stable as you scale.",
  },
];

const pricing = [
  { name: "Starter", price: "$59", note: "For one location, fast self-serve launch." },
  { name: "Growth", price: "$129", note: "For multi-branch teams that want stronger throughput." },
  { name: "Scale", price: "Custom", note: "For chains, franchises, and white-glove onboarding." },
];

const faq = [
  {
    q: "Do guests need an app?",
    a: "No. They scan a QR code and open a fast mobile web experience tied to the exact table session.",
  },
  {
    q: "How do you make money?",
    a: "Monthly SaaS pricing plus implementation and expansion fees for larger locations or brands.",
  },
  {
    q: "Is payment logic exposed to the client?",
    a: "No. iyzico signing and link creation stay on the server so secrets never reach the browser.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto flex min-h-[calc(100vh-0px)] max-w-7xl flex-col gap-16 px-6 py-8 sm:py-10 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70 shadow-sm backdrop-blur">
              Witly QR
              <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
              Built for high-volume dining growth
            </div>

            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
                Turn every table scan into a repeatable revenue engine.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-black/68 sm:text-lg">
                Witly QR is a multi-tenant dining OS for restaurants and cafes:
                branded QR menus, live table sessions, item-level claims, and
                secure split payments in one product built for scale.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="glass-panel rounded-[1.5rem] p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-black/42">
                    {metric.label}
                  </div>
                  <div className="mt-2 text-lg font-semibold tracking-tight">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-black/88"
              >
                Start free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/12 bg-white/80 px-5 text-sm font-medium text-black transition hover:bg-white"
              >
                View pricing
              </Link>
              <Link
                href="/app"
                className="inline-flex h-11 items-center justify-center rounded-full bg-black/5 px-5 text-sm font-medium text-black transition hover:bg-black/8"
              >
                Open dashboard
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="glass-panel rounded-[1.75rem] p-5">
                  <div className="text-sm font-medium">{pillar.title}</div>
                  <div className="mt-2 text-sm leading-6 text-black/60">{pillar.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <PublicLeadForm
            source="home-hero"
            title="Get the launch pack"
            description="Send us your restaurant details and we&apos;ll reply with pricing, launch steps, and the fastest path to go live."
            ctaLabel="Request launch pack"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-panel rounded-[2rem] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-black/45">
                  Why it spreads
                </div>
                <div className="mt-1 text-xl font-semibold tracking-tight">
                  Guests already know the QR motion
                </div>
              </div>
              <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                Web-first
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                "No download friction at the table",
                "Branded shareable links for every branch and table",
                "Clear guest value: browse, claim, and pay only your share",
                "Natural word-of-mouth through fast, easy ordering",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3 text-sm text-black/62"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-[2rem] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-black/45">
                  Monetization
                </div>
                <div className="mt-1 text-xl font-semibold tracking-tight">
                  Pricing that can scale with the brand
                </div>
              </div>
              <Link
                href="/pricing"
                className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60 transition hover:bg-black/[0.06]"
              >
                Full pricing
              </Link>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {pricing.map((plan) => (
                <div key={plan.name} className="glass-panel rounded-[1.5rem] p-4">
                  <div className="text-sm font-medium">{plan.name}</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight">
                    {plan.price}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-black/60">{plan.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="surface-panel rounded-[2rem] p-5 sm:p-6">
            <div className="text-sm font-medium">Launch sequence</div>
            <div className="mt-4 grid gap-3">
              {[
                ["1", "Create workspace", "Set the tenant root and staff boundaries."],
                ["2", "Add branches and tables", "Map each QR token to a specific seat."],
                ["3", "Publish menu", "Version prices and modifiers before going live."],
                ["4", "Start collecting revenue", "Handle claims and payments server-side."],
              ].map(([step, title, desc]) => (
                <div
                  key={step}
                  className="grid gap-4 rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3 sm:grid-cols-[auto_1fr]"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-black text-xs font-medium text-white">
                    {step}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{title}</div>
                    <div className="mt-1 text-sm leading-6 text-black/60">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-[2rem] p-5 sm:p-6">
            <div className="text-sm font-medium">FAQ</div>
            <div className="mt-4 grid gap-3">
              {faq.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3"
                >
                  <div className="text-sm font-medium">{item.q}</div>
                  <div className="mt-1 text-sm leading-6 text-black/60">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
