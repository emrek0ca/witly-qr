import Link from "next/link";
import { isClerkConfigured } from "@/server/auth";
import { Icon, type IconName } from "@/components/icon";

const nav: Array<{ href: string; label: string; icon: IconName }> = [
  { href: "/app", label: "Overview", icon: "chart" },
  { href: "/app/launch-setup", label: "Setup", icon: "plus" },
  { href: "/app/tables", label: "Tables", icon: "table" },
  { href: "/app/menu", label: "Menu", icon: "menu" },
  { href: "/app/live", label: "Live", icon: "users" },
  { href: "/app/settings", label: "Settings", icon: "settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const clerkEnabled = isClerkConfigured();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/8 bg-white/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/app" className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.22em] uppercase">
              <Icon name="qr" className="size-4" />
              Witly
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  className="inline-flex items-center justify-center rounded-full px-3.5 py-2 text-sm text-black/60 transition hover:bg-black/[0.04] hover:text-black"
                >
                  <Icon name={item.icon as IconName} className="size-4" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {clerkEnabled ? (
              <ClerkUserMenu />
            ) : (
              <div className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-black/55">
                <Icon name="shield" className="size-4" />
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
                aria-label={item.label}
                title={item.label}
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-medium text-black/62 shadow-sm"
              >
                <Icon name={item.icon as IconName} className="size-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

async function ClerkUserMenu() {
  const { UserButton } = await import("@clerk/nextjs");

  return (
    <>
      <Link
        href="/sign-out"
        aria-label="Sign out"
        title="Sign out"
        className="hidden size-9 items-center justify-center rounded-full border border-black/12 bg-white/70 text-black/60 transition hover:bg-white md:inline-flex"
      >
        <Icon name="arrow-right" className="size-4 rotate-180" />
      </Link>
      <UserButton appearance={{ variables: { colorPrimary: "#111111" } }} />
    </>
  );
}
