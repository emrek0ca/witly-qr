import { isClerkConfigured } from "@/server/auth";

export default async function Page() {
  if (!isClerkConfigured()) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <div className="surface-panel rounded-[1.75rem] p-6">
          <div className="text-sm font-medium">Local bootstrap mode</div>
          <p className="mt-2 text-sm leading-6 text-black/60">
            Clerk keys are not configured on this server yet. The app is running
            in local mode so the product can be exercised, and auth can be wired
            back without code changes once the keys are added.
          </p>
        </div>
      </main>
    );
  }

  const { SignIn } = await import("@clerk/nextjs");

  return (
    <main className="min-h-[calc(100vh-0px)]">
      <div className="mx-auto max-w-md px-6 py-16">
        <SignIn appearance={{ variables: { colorPrimary: "#000000" } }} />
      </div>
    </main>
  );
}
