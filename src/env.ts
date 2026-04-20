import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const optionalString = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().min(1).optional(),
);

export const env = createEnv({
  server: {
    CLERK_SECRET_KEY: optionalString,
    BACKEND_API_URL: optionalString,
    FRONTEND_APP_URL: optionalString,
    DATABASE_URL: optionalString,
    IYZICO_API_KEY: optionalString,
    IYZICO_SECRET_KEY: optionalString,
    IYZICO_BASE_URL: optionalString,
    AUTH_MODE: z.enum(["local", "clerk"]).optional(),
    APP_RUNTIME: z.enum(["backend", "frontend"]).optional(),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: optionalString,
  },
  runtimeEnv: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    FRONTEND_APP_URL: process.env.FRONTEND_APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    IYZICO_API_KEY: process.env.IYZICO_API_KEY,
    IYZICO_SECRET_KEY: process.env.IYZICO_SECRET_KEY,
    IYZICO_BASE_URL: process.env.IYZICO_BASE_URL,
    AUTH_MODE: process.env.AUTH_MODE,
    APP_RUNTIME: process.env.APP_RUNTIME,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});
