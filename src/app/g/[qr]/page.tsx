import Link from "next/link";
import { env } from "@/env";
import { Icon } from "@/components/icon";

type PublicQrPayload = {
  found: boolean;
  qr?: string;
  branch?: { id: string; name: string; slug: string };
  table?: { id: string; label: string; tableNumber: string };
  session?: {
    id: string;
    status: string;
    guestCount: number;
    currentBillCents: number;
    currency: string;
  } | null;
  menu?: {
    categories: Array<{
      id: string;
      name: string;
      slug: string;
      items: Array<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        priceCents: number;
        currency: string;
      }>;
    }>;
  };
};

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default async function Page({ params }: { params: Promise<{ qr: string }> }) {
  const { qr } = await params;
  const baseUrl = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(new URL(`/api/public/qr/${qr}`, baseUrl), { cache: "no-store" });
  const data = (res.ok ? await res.json() : null) as PublicQrPayload | null;
  const categories = data?.menu?.categories ?? [];
  const hasMenu = categories.length > 0;

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 py-4 sm:px-6 sm:py-8">
      <div className="surface-panel overflow-hidden rounded-[2rem]">
        <div className="border-b border-black/8 bg-white/75 px-5 py-5 backdrop-blur sm:px-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
              <Icon name="qr" className="size-3.5" />
              {qr}
            </div>
            <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-black/55">
              {data?.found ? "live" : "empty"}
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-black/8 bg-black/[0.02] p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-black/42">Table</div>
              <div className="mt-1 text-sm font-medium">{data?.table?.label ?? "—"}</div>
            </div>
            <div className="rounded-[1.25rem] border border-black/8 bg-black/[0.02] p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-black/42">Guests</div>
              <div className="mt-1 text-sm font-medium">{data?.session?.guestCount ?? 0}</div>
            </div>
            <div className="rounded-[1.25rem] border border-black/8 bg-black/[0.02] p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-black/42">Bill</div>
              <div className="mt-1 text-sm font-medium">
                {data?.session ? money(data.session.currentBillCents, data.session.currency) : "—"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-5 py-5 sm:px-6">
          {hasMenu ? (
            categories.map((section) => (
              <div key={section.id} className="grid gap-2">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-black/42">
                  <span>{section.name}</span>
                  <Icon name="menu" className="size-3.5" />
                </div>
                <div className="grid gap-2">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[1.25rem] border border-black/8 bg-white px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{item.name}</div>
                          {item.description ? (
                            <div className="mt-1 truncate text-xs text-black/45">{item.description}</div>
                          ) : null}
                        </div>
                        <div className="shrink-0 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                          {money(item.priceCents, item.currency)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[1.5rem] border border-black/8 bg-black/[0.02] p-5">
              <div className="flex items-center gap-3">
                <Icon name="table" className="size-5 text-black/45" />
                <div className="text-sm font-medium">No live menu</div>
              </div>
            </div>
          )}

          <div className="grid gap-3 pt-1">
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-medium text-white">
              <Icon name="arrow-right" className="size-4" />
              Join
            </button>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/12 bg-white px-4 text-sm font-medium text-black"
              >
                <Icon name="home" className="size-4" />
                Home
              </Link>
              <Link
                href="/pricing?utm_source=guest-menu&utm_medium=organic&utm_campaign=powered_by"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black/[0.04] px-4 text-sm font-medium text-black"
              >
                <Icon name="spark" className="size-4" />
                Witly
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
