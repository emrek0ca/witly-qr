import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-0px)]">
      <div className="mx-auto max-w-md px-6 py-16">
        <SignIn appearance={{ variables: { colorPrimary: "#000000" } }} />
      </div>
    </main>
  );
}
