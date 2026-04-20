import { auth } from "@clerk/nextjs/server";
import { env } from "@/env";

export const LOCAL_BOOTSTRAP_USER_ID = "local-bootstrap-user";

export function isClerkConfigured() {
  return Boolean(env.CLERK_SECRET_KEY && env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

export async function getRequestUserId() {
  if (!isClerkConfigured()) return LOCAL_BOOTSTRAP_USER_ID;

  const { userId } = await auth();
  return userId ?? null;
}
