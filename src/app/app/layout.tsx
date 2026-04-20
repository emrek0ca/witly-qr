import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { isClerkConfigured } from "@/server/auth";

const nav = [
  { href: "/app", label: "Overview" },
  { href: "/app/launch-setup", label: "Launch Setup" },
  { href: "/app/tables", label: "Tables & QR" },
  { href: "/app/menu", label: "Menu" },
  { href: "/app/live", label: "Live Sessions" },
  { href: "/app/settings", label: "Settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const clerkEnabled = isClerkConfigured();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/8 bg-white/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/app" className="text-sm font-semibold tracking-[0.22em] uppercase">
              Witly
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3.5 py-1.5 text-sm text-black/60 transition hover:bg-black/[0.04] hover:text-black"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {clerkEnabled ? (
              <>
                <Link
                  href="/sign-out"
                  className="hidden rounded-full border border-black/12 bg-white/70 px-3.5 py-1.5 text-sm text-black/60 transition hover:bg-white md:inline-flex"
                >
                  Sign out
                </Link>
                <UserButton appearance={{ variables: { colorPrimary: "#111111" } }} />
              </>
            ) : (
              <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs text-black/60">
                Local mode
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="md:hidden">
          <div className="flex flex-wrap gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-black/62 shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
