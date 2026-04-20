import { auth } from "@clerk/nextjs/server";
import { env } from "@/env";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const status = {
    clerk: Boolean(env.CLERK_SECRET_KEY && env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
    database: Boolean(env.DATABASE_URL),
    iyzico: Boolean(env.IYZICO_API_KEY && env.IYZICO_SECRET_KEY && env.IYZICO_BASE_URL),
    appUrl: env.NEXT_PUBLIC_APP_URL ?? null,
  };

  return Response.json({ status });
}
