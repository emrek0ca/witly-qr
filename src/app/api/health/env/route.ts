import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { env } from "@/env";
import { getRequestUserId } from "@/server/auth";
import { getFrontendAppUrl } from "@/server/app-url";
import { isFrontendRuntime, proxyRequestToBackend } from "@/server/runtime";

export async function GET(req: Request) {
  if (isFrontendRuntime()) {
    return proxyRequestToBackend(req);
  }

  const userId = await getRequestUserId();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  let databaseConnected = false;
  if (env.DATABASE_URL) {
    try {
      await getDb().execute(sql`select 1`);
      databaseConnected = true;
    } catch {
      databaseConnected = false;
    }
  }

  const status = {
    clerk: Boolean(env.CLERK_SECRET_KEY && env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
    database: databaseConnected,
    iyzico: Boolean(env.IYZICO_API_KEY && env.IYZICO_SECRET_KEY && env.IYZICO_BASE_URL),
    appUrl: getFrontendAppUrl(),
  };

  return Response.json({ status });
}
