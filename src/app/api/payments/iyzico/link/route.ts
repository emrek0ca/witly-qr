import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createPaymentLink } from "@/server/iyzico/link";
import { env } from "@/env";

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.string().min(1),
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return Response.json({ error: "invalid_body" }, { status: 400 });

  const appUrl = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const callbackUrl = `${appUrl}/app/settings`;

  const result = await createPaymentLink({
    name: parsed.data.name,
    description: parsed.data.description,
    price: parsed.data.price,
    currencyCode: "TRY",
    callbackUrl,
  });

  return Response.json(result);
}
