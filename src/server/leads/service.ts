import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { marketingLeads } from "@/db/schema";

export type CaptureLeadInput = {
  email: string;
  companyName?: string | null;
  country?: string | null;
  source: string;
  referrerCode?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  landingPath?: string | null;
};

function scoreLead(input: CaptureLeadInput) {
  let score = 10;

  if (input.companyName?.trim()) score += 12;
  if (input.country?.trim()) score += 6;
  if (input.referrerCode?.trim()) score += 10;
  if (input.utmSource?.trim()) score += 4;
  if (input.utmMedium?.trim()) score += 3;
  if (input.utmCampaign?.trim()) score += 5;

  const domain = input.email.split("@")[1]?.toLowerCase() ?? "";
  if (domain && !domain.includes("gmail") && !domain.includes("yahoo")) {
    score += 8;
  }

  if (input.source.includes("pricing")) score += 6;
  if (input.source.includes("guest")) score += 3;

  return Math.min(score, 100);
}

export async function captureMarketingLead(input: CaptureLeadInput) {
  const db = getDb();
  const email = input.email.trim().toLowerCase();
  const leadScore = scoreLead(input);

  const [inserted] = await db
    .insert(marketingLeads)
    .values({
      email,
      companyName: input.companyName?.trim() || null,
      country: input.country?.trim() || null,
      source: input.source.trim(),
      referrerCode: input.referrerCode?.trim() || null,
      utmSource: input.utmSource?.trim() || null,
      utmMedium: input.utmMedium?.trim() || null,
      utmCampaign: input.utmCampaign?.trim() || null,
      landingPath: input.landingPath?.trim() || null,
      leadScore,
    })
    .onConflictDoNothing({ target: marketingLeads.email })
    .returning({
      id: marketingLeads.id,
      email: marketingLeads.email,
      companyName: marketingLeads.companyName,
      country: marketingLeads.country,
      source: marketingLeads.source,
      referrerCode: marketingLeads.referrerCode,
      utmSource: marketingLeads.utmSource,
      utmMedium: marketingLeads.utmMedium,
      utmCampaign: marketingLeads.utmCampaign,
      landingPath: marketingLeads.landingPath,
      leadScore: marketingLeads.leadScore,
      status: marketingLeads.status,
      createdAt: marketingLeads.createdAt,
    });

  if (inserted) return inserted;

  const [existing] = await db
    .select({
      id: marketingLeads.id,
      email: marketingLeads.email,
      companyName: marketingLeads.companyName,
      country: marketingLeads.country,
      source: marketingLeads.source,
      referrerCode: marketingLeads.referrerCode,
      utmSource: marketingLeads.utmSource,
      utmMedium: marketingLeads.utmMedium,
      utmCampaign: marketingLeads.utmCampaign,
      landingPath: marketingLeads.landingPath,
      leadScore: marketingLeads.leadScore,
      status: marketingLeads.status,
      createdAt: marketingLeads.createdAt,
    })
    .from(marketingLeads)
    .where(eq(marketingLeads.email, email))
    .limit(1);

  return existing ?? null;
}
