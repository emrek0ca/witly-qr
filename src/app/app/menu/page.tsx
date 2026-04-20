export default function Page() {
  const categories = [
    { name: "Starters", items: 6, snapshot: "Fresh", price: "120-260 TRY" },
    { name: "Mains", items: 9, snapshot: "Pinned", price: "240-520 TRY" },
    { name: "Desserts", items: 4, snapshot: "Visible", price: "90-180 TRY" },
  ];

  return (
    <main className="flex flex-col gap-6">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-black/45">Menu</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Menu, modifiers, and price snapshots
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
          Menu content must stay versioned so orders, claims, and payments can
          reference the exact price at the time of purchase.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <div key={category.name} className="surface-panel rounded-[1.75rem] p-5">
            <div className="text-sm font-medium">{category.name}</div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold tracking-tight">{category.items}</div>
                <div className="text-sm text-black/52">items</div>
              </div>
              <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                {category.snapshot}
              </div>
            </div>
            <div className="mt-4 text-sm leading-6 text-black/60">{category.price}</div>
          </div>
        ))}
      </div>

      <div className="surface-panel rounded-[1.75rem] p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Menu editing model</div>
          <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
            Snapshot first
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "Category visibility per branch",
            "Modifier groups preserved as item metadata",
            "Historical price revisions kept in snapshots",
            "Guest menu reads from the current active version",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3 text-sm text-black/62">
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
