import { isClerkConfigured } from "@/server/auth";

export default async function Page() {
  if (!isClerkConfigured()) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <div className="surface-panel rounded-[1.75rem] p-6">
          <div className="text-sm font-medium">Local bootstrap mode</div>
          <p className="mt-2 text-sm leading-6 text-black/60">
            Clerk keys are not configured on this server yet. Add the real Clerk
            credentials to enable hosted sign-in and sign-up.
          </p>
        </div>
      </main>
    );
  }

  const { SignUp } = await import("@clerk/nextjs");

  return (
    <main>
      <div className="mx-auto max-w-md px-6 py-16">
        <SignUp appearance={{ variables: { colorPrimary: "#000000" } }} />
      </div>
    </main>
  );
}
