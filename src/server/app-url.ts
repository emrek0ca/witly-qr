import { env } from "@/env";

export function getFrontendAppUrl() {
  const value = env.FRONTEND_APP_URL ?? "http://localhost:3000";
  return value.trim().length > 0 ? value.replace(/\/+$/, "") : "http://localhost:3000";
}
