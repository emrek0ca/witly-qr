import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto flex min-h-[calc(100vh-0px)] max-w-7xl flex-col justify-between px-6 py-8 sm:py-10 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70 shadow-sm backdrop-blur">
              Witly QR
              <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
              Table-aware dining OS
            </div>
            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
                QR menu, live table sessions, and split payments in one system.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-black/68 sm:text-lg">
                Multi-tenant structure for restaurants and cafes, with secure
                iyzico payment flow, table-aware history, and item-based claims
                for fair checkout.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-in"
                className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-black/88"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/12 bg-white/80 px-5 text-sm font-medium text-black transition hover:bg-white"
              >
                Create account
              </Link>
              <Link
                href="/app"
                className="inline-flex h-11 items-center justify-center rounded-full bg-black/5 px-5 text-sm font-medium text-black transition hover:bg-black/8"
              >
                Open dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-black/10 bg-white/65 p-4 shadow-[0_24px_80px_rgba(23,20,18,0.08)] backdrop-blur sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-black/45">
                  Product surface
                </div>
                <div className="mt-1 text-base font-medium">Operations snapshot</div>
              </div>
              <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                Tenant-safe
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Overview", "Launch status, revenue, and live table health."],
                ["Launch Setup", "Guided onboarding for branch, tables, and menu."],
                ["Tables & QR", "QR assignment, status, and branch coverage."],
                ["Live Sessions", "Claims, orders, and payment reconciliation."],
              ].map(([title, desc]) => (
                <div key={title} className="surface-panel rounded-2xl p-4">
                  <div className="text-sm font-medium">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-black/60">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Multi-tenant core",
              desc: "Workspace-scoped data, roles, and clean server boundaries.",
            },
            {
              title: "Table-aware flow",
              desc: "QR resolves to the exact branch, table, and session context.",
            },
            {
              title: "Split checkout",
              desc: "Claims, totals, and iyzico payment links stay server-owned.",
            },
          ].map((item) => (
            <div key={item.title} className="glass-panel rounded-[1.75rem] p-5">
              <div className="text-sm font-medium">{item.title}</div>
              <div className="mt-2 text-sm leading-6 text-black/60">{item.desc}</div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
