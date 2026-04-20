import type { Metadata } from "next";
import Link from "next/link";
import { PublicLeadForm } from "@/components/public-lead-form";

export const metadata: Metadata = {
  title: "Pricing | Witly QR",
  description:
    "Simple pricing for restaurants and cafes that want branded QR menus, live table sessions, and server-owned split payments.",
};

const plans = [
  {
    name: "Starter",
    price: "$59",
    desc: "Best for a single location that wants to go live fast.",
    features: ["1 branch", "Basic menu and table setup", "Lead capture and launch pack"],
  },
  {
    name: "Growth",
    price: "$129",
    desc: "Best for teams that need stronger operations and multi-branch control.",
    features: ["Multi-branch workspace", "Live sessions and claims", "Priority onboarding"],
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    desc: "Best for regional brands and groups that need rollout support.",
    features: ["Custom onboarding", "SLA and rollout planning", "Dedicated success support"],
  },
];

export default function Page() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="flex flex-col gap-4">
          <div className="text-xs uppercase tracking-[0.2em] text-black/45">Pricing</div>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Pricing built for fast launch, clear upgrade paths, and real margin.
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-black/60 sm:text-base">
            Keep the entry point simple. Expand into multi-location operations
            when the restaurant proves the flow and the table throughput grows.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-black/88"
            >
              Start free
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/12 bg-white/80 px-5 text-sm font-medium text-black transition hover:bg-white"
            >
              Back to home
            </Link>
          </div>
        </div>

        <PublicLeadForm
          source="pricing-page"
          title="Ask for a tailored proposal"
          description="If you run multiple branches, send your details and we&apos;ll reply with a rollout plan and commercial terms."
          ctaLabel="Request proposal"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={[
              "rounded-[2rem] border p-5 sm:p-6",
              plan.featured
                ? "border-black/15 bg-white shadow-[0_24px_60px_rgba(23,20,18,0.07)]"
                : "border-black/10 bg-white/70",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-medium">{plan.name}</div>
              {plan.featured ? (
                <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                  Most popular
                </div>
              ) : null}
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-tight">{plan.price}</div>
            <div className="mt-2 text-sm leading-6 text-black/60">{plan.desc}</div>
            <div className="mt-5 grid gap-2 text-sm text-black/65">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["No hidden fee traps", "Pricing stays simple so restaurants can understand ROI quickly."],
          ["Server-owned payments", "Split checkout and iyzico link creation stay off the client."],
          ["Built to expand", "The same workspace model supports one cafe or a chain rollout."],
        ].map(([title, desc]) => (
          <div key={title} className="glass-panel rounded-[1.75rem] p-5">
            <div className="text-sm font-medium">{title}</div>
            <div className="mt-2 text-sm leading-6 text-black/60">{desc}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
