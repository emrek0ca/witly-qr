import { Icon, type IconName } from "@/components/icon";

function Step({ icon, label }: { icon: IconName; label: string }) {
  return (
    <button className="flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-black/[0.03]">
      <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-black text-white">
        <Icon name={icon} className="size-4" />
      </span>
      {label}
    </button>
  );
}

export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
        <Icon name="spark" className="size-3.5" />
        Setup
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Step icon="grid" label="Workspace" />
        <Step icon="table" label="Tables" />
        <Step icon="menu" label="Menu" />
        <Step icon="shield" label="Pay" />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Step icon="plus" label="Branch" />
        <Step icon="qr" label="QR" />
      </div>
    </main>
  );
}
