import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const nav = [
  { href: "/app", label: "Overview" },
  { href: "/app/launch-setup", label: "Launch Setup" },
  { href: "/app/tables", label: "Tables & QR" },
  { href: "/app/menu", label: "Menu" },
  { href: "/app/live", label: "Live Sessions" },
  { href: "/app/settings", label: "Settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/app" className="text-sm font-semibold tracking-tight">
              Witly
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="rounded-full px-3 py-1.5 text-sm text-black/70 hover:bg-black/[0.04] hover:text-black"
                >
                  {i.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-out"
              className="hidden rounded-full border border-black/15 px-3 py-1.5 text-sm text-black/70 hover:bg-black/[0.04] md:inline-flex"
            >
              Çıkış
            </Link>
            <UserButton appearance={{ variables: { colorPrimary: "#000000" } }} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="md:hidden">
          <div className="flex flex-wrap gap-2">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs text-black/70"
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
