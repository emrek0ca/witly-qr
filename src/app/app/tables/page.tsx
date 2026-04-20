export default function Page() {
  const tables = [
    { table: "A1", branch: "Bosphorus", qr: "qr-a1-91", status: "Live", session: "Open now" },
    { table: "A2", branch: "Bosphorus", qr: "qr-a2-13", status: "Idle", session: "No session" },
    { table: "B1", branch: "Garden", qr: "qr-b1-44", status: "Claiming", session: "Split checkout" },
  ];

  return (
    <main className="flex flex-col gap-6">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-black/45">
          Tables & QR
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Table registry and QR mapping
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
          Table identity, QR token lifecycle, and the live table session entry
          point are managed here.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-panel rounded-[1.75rem] p-5">
          <div className="text-sm font-medium">Coverage</div>
          <div className="mt-4 grid gap-3">
            {[
              ["2 branches", "Configured for live service"],
              ["3 tables", "Assigned and QR-ready"],
              ["1.0x", "One QR token per active table"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3"
              >
                <div className="text-sm text-black/60">{label}</div>
                <div className="text-sm font-medium">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel rounded-[1.75rem] p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Table state</div>
            <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
              QR-backed
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {tables.map((row) => (
              <div
                key={row.table}
                className="grid gap-3 rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-4 sm:grid-cols-[72px_1fr_auto]"
              >
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-black/42">
                    Table
                  </div>
                  <div className="mt-1 text-lg font-semibold">{row.table}</div>
                </div>
                <div className="grid gap-1 text-sm text-black/60">
                  <div>{row.branch}</div>
                  <div className="font-mono text-xs text-black/45">{row.qr}</div>
                </div>
                <div className="flex items-start gap-2 sm:flex-col sm:items-end">
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70">
                    {row.status}
                  </span>
                  <span className="text-xs text-black/50">{row.session}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
