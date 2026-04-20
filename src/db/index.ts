import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";

function requireEnv(value: string | undefined, key: string) {
  if (!value) throw new Error(`${key}_missing`);
  return value;
}

const client = postgres(requireEnv(env.DATABASE_URL, "DATABASE_URL"), { prepare: false });
export const db = drizzle(client);
