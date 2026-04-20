export default function Page() {
  const sessions = [
    { table: "A1", guest: "4 guests", status: "Claiming 3/6", payment: "Pending payment", total: "1,480 TRY" },
    { table: "B1", guest: "2 guests", status: "Balanced 2/2", payment: "Ready to pay", total: "620 TRY" },
  ];

  return (
    <main className="flex flex-col gap-6">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-black/45">
          Live Sessions
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Real-time table operation
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
          Monitor table session progress, item claims, and payment readiness
          without leaking split logic into the client.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="surface-panel rounded-[1.75rem] p-5">
          <div className="text-sm font-medium">Operational metrics</div>
          <div className="mt-4 grid gap-3">
            {[
              ["Open sessions", "2 active"],
              ["Claimed items", "5 / 8"],
              ["Payments", "1 ready, 1 pending"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3">
                <div className="text-sm text-black/60">{label}</div>
                <div className="text-sm font-medium">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {sessions.map((session) => (
            <div key={session.table} className="surface-panel rounded-[1.75rem] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">Table {session.table}</div>
                  <div className="mt-2 text-sm leading-6 text-black/60">{session.guest}</div>
                </div>
                <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                  {session.total}
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-sm text-black/62 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3">
                  {session.status}
                </div>
                <div className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3">
                  {session.payment}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
