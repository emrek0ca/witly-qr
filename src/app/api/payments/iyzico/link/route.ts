import { z } from "zod";
import { createPaymentLink } from "@/server/iyzico/link";
import { env } from "@/env";
import { getRequestUserId } from "@/server/auth";
import { isFrontendRuntime, proxyRequestToBackend } from "@/server/runtime";

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
});

export async function POST(req: Request) {
  if (isFrontendRuntime()) {
    return proxyRequestToBackend(req);
  }

  const userId = await getRequestUserId();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return Response.json({ error: "invalid_body" }, { status: 400 });

  const appUrl = env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;
  const callbackUrl = new URL("/app/settings", appUrl).toString();

  try {
    const result = await createPaymentLink({
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      currencyCode: "TRY",
      callbackUrl,
    });

    return Response.json(result);
  } catch {
    return Response.json({ error: "iyzico_link_failed" }, { status: 502 });
  }
}
