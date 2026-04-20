import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-2xl border border-black/10 p-6">
        <div className="text-sm font-medium">Çıkış</div>
        <div className="mt-1 text-sm text-black/60">
          Oturumunu kapatmak üzeresin.
        </div>
        <div className="mt-6 flex gap-3">
          <SignOutButton redirectUrl="/">
            <button className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-black/90">
              Çıkış yap
            </button>
          </SignOutButton>
          <Link
            href="/app"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/15 bg-white px-4 text-sm font-medium text-black hover:bg-black/[0.03]"
          >
            PaneLe dön
          </Link>
        </div>
      </div>
    </main>
  );
}
