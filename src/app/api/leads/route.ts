import { z } from "zod";
import { captureMarketingLead } from "@/server/leads/service";

const bodySchema = z.object({
  email: z.string().email(),
  companyName: z.string().trim().min(2).max(120).optional(),
  country: z.string().trim().min(2).max(80).optional(),
  source: z.string().trim().min(2).max(80),
  referrerCode: z.string().trim().min(2).max(80).optional(),
  utmSource: z.string().trim().min(2).max(80).optional(),
  utmMedium: z.string().trim().min(2).max(80).optional(),
  utmCampaign: z.string().trim().min(2).max(120).optional(),
  landingPath: z.string().trim().min(1).max(200).optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const lead = await captureMarketingLead(parsed.data);

  return Response.json({ lead }, { status: 201 });
}
