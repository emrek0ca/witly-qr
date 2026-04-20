import type { Metadata } from "next";
import Link from "next/link";
import { PublicLeadForm } from "@/components/public-lead-form";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "Pricing | Witly QR",
  description: "Pricing for Witly QR.",
};

const plans = [
  ["Starter", "$59", "1 branch"],
  ["Growth", "$129", "multi branch"],
  ["Scale", "Custom", "chain"],
];

export default function Page() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
        <Icon name="chart" className="size-3.5" />
        Pricing
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="surface-panel rounded-[1.75rem] p-5">
          <div className="grid gap-3 md:grid-cols-3">
            {plans.map(([name, price, note]) => (
              <div key={name} className="rounded-[1.5rem] border border-black/8 bg-black/[0.02] p-4">
                <div className="text-sm font-medium">{name}</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">{price}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-black/42">{note}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/sign-up"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-4 text-sm font-medium text-white"
            >
              <Icon name="plus" className="size-4" />
              Start
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-black/12 bg-white px-4 text-sm font-medium text-black"
            >
              <Icon name="home" className="size-4" />
              Home
            </Link>
          </div>
        </div>

        <PublicLeadForm source="pricing" ctaLabel="Request" />
      </div>
    </main>
  );
}
