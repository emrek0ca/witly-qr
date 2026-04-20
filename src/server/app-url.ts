import { env } from "@/env";

export function getFrontendAppUrl() {
  const value = env.FRONTEND_APP_URL ?? "http://localhost:3000";
  return value.trim().length > 0 ? value.replace(/\/+$/, "") : "http://localhost:3000";
}

export function getFrontendAppUrlFromRequest(req: Request) {
  const forwardedOrigin = req.headers.get("x-forwarded-origin") ?? req.headers.get("origin");
  if (forwardedOrigin) {
    try {
      const parsed = new URL(forwardedOrigin);
      return parsed.origin;
    } catch {
      // Fall through to env-based fallback.
    }
  }

  return getFrontendAppUrl();
}
