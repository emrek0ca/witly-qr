import { Icon, type IconName } from "@/components/icon";

function Chip({ icon, label }: { icon: IconName; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black">
      <Icon name={icon} className="size-4" />
      {label}
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
        <Icon name="menu" className="size-3.5" />
        Menu
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Chip icon="menu" label="0 categories" />
        <Chip icon="spark" label="0 items" />
        <Chip icon="shield" label="snapshots" />
      </div>

      <div className="surface-panel rounded-[1.75rem] p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-sm font-medium">
            <Icon name="menu" className="size-4" />
            Empty
          </div>
          <button className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-4 text-sm font-medium text-white">
            <Icon name="plus" className="size-4" />
            Add
          </button>
        </div>
      </div>
    </main>
  );
}
