import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { isClerkConfigured } from "@/server/auth";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/g/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isClerkConfigured()) return;

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
