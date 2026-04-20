import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ qr: string }> }) {
  const { qr } = await params;
  const menuSections = [
    {
      title: "Starters",
      items: [
        { name: "Burnt butter hummus", price: "180 TRY", note: "served with warm pita" },
        { name: "Crisp potato croquettes", price: "220 TRY", note: "smoked aioli" },
      ],
    },
    {
      title: "Mains",
      items: [
        { name: "Chicken shawarma plate", price: "360 TRY", note: "pickled onions, herbs" },
        { name: "Charcoal aubergine bowl", price: "320 TRY", note: "tahini dressing" },
      ],
    },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 py-4 sm:px-6 sm:py-8">
      <div className="surface-panel overflow-hidden rounded-[2rem]">
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,241,232,0.94))] px-5 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-black/45">
                Guest table
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">
                Table menu
              </div>
            </div>
            <div className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/60">
              Live
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-black/8 bg-white/85 px-4 py-4">
            <div className="text-xs uppercase tracking-[0.18em] text-black/42">QR</div>
            <div className="mt-1 font-mono text-sm text-black/72">{qr}</div>
            <div className="mt-3 text-sm leading-6 text-black/60">
              You are connected to the exact table session. Order items, claim
              your share, and checkout only your part.
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-5 py-5 sm:px-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Table", "A12"],
              ["Guests", "4"],
              ["Session", "Open"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-3">
                <div className="text-xs uppercase tracking-[0.18em] text-black/42">
                  {label}
                </div>
                <div className="mt-1 text-lg font-semibold">{value}</div>
              </div>
            ))}
          </div>

          {menuSections.map((section) => (
            <div key={section.title} className="grid gap-3">
              <div className="text-sm font-medium">{section.title}</div>
              {section.items.map((item) => (
                <div key={item.name} className="rounded-2xl border border-black/8 bg-white px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="mt-1 text-sm leading-6 text-black/55">{item.note}</div>
                    </div>
                    <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                      {item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="grid gap-3 pt-1">
            <button className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white">
              Join table session
            </button>
            <div className="flex gap-3">
              <Link
                href="/"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-black/12 bg-white px-4 text-sm font-medium text-black"
              >
                Home
              </Link>
              <Link
                href="/app"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-black/[0.04] px-4 text-sm font-medium text-black"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
