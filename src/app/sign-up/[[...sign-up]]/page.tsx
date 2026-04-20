import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main>
      <div className="mx-auto max-w-md px-6 py-16">
        <SignUp appearance={{ variables: { colorPrimary: "#000000" } }} />
      </div>
    </main>
  );
}
