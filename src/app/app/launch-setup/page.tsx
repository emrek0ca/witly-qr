export default function Page() {
  const steps = [
    {
      stage: "01",
      title: "Workspace foundation",
      desc: "Create the tenant root, invite staff, and lock role boundaries.",
      status: "Ready first",
    },
    {
      stage: "02",
      title: "Branch + tables",
      desc: "Register branches, assign table labels, and mint QR tokens.",
      status: "Operational core",
    },
    {
      stage: "03",
      title: "Menu + pricing",
      desc: "Load categories, items, modifiers, and snapshot prices.",
      status: "Sales ready",
    },
  ];

  return (
    <main className="flex flex-col gap-6">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-black/45">
          Launch Setup
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Go-live preparation
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
          This flow is the shortest path to a usable restaurant setup: workspace,
          branch, tables, and menu.
        </p>
      </div>

      <div className="grid gap-4">
        {steps.map((step) => (
          <div
            key={step.stage}
            className="surface-panel grid gap-4 rounded-[1.75rem] p-5 sm:grid-cols-[auto_1fr_auto]"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-sm font-medium text-white">
              {step.stage}
            </div>
            <div>
              <div className="text-sm font-medium">{step.title}</div>
              <div className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
                {step.desc}
              </div>
            </div>
            <div className="self-start rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
              {step.status}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-panel rounded-[1.75rem] p-5">
          <div className="text-sm font-medium">Required before launch</div>
          <div className="mt-4 grid gap-2 text-sm text-black/62">
            <div>• At least one branch</div>
            <div>• One table set with QR mapping</div>
            <div>• A live menu snapshot with prices</div>
            <div>• Clerk and iyzico configured on the backend</div>
          </div>
        </div>
        <div className="glass-panel rounded-[1.75rem] p-5">
          <div className="text-sm font-medium">Operational checklist</div>
          <div className="mt-4 grid gap-2 text-sm text-black/62">
            <div>• Workspace role boundaries reviewed</div>
            <div>• Session and claim rules confirmed</div>
            <div>• Payment reconciliation path documented</div>
            <div>• Audit trail and snapshots preserved</div>
          </div>
        </div>
      </div>
    </main>
  );
}
