import { sql } from "drizzle-orm";
import { env } from "@/env";
import { getDb } from "@/db";

export async function GET() {
  let database: "up" | "down" | "skipped" = "skipped";

  if (env.DATABASE_URL) {
    try {
      await getDb().execute(sql`select 1`);
      database = "up";
    } catch {
      database = "down";
    }
  }

  const status = {
    ok: database !== "down",
    database,
    runtime: "ok",
    appUrl: env.NEXT_PUBLIC_APP_URL ?? null,
  };

  return Response.json(status, { status: status.ok ? 200 : 503 });
}
