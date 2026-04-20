import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { marketingLeads } from "@/db/schema";

export type CaptureLeadInput = {
  email: string;
  companyName?: string | null;
  country?: string | null;
  source: string;
};

export async function captureMarketingLead(input: CaptureLeadInput) {
  const db = getDb();
  const email = input.email.trim().toLowerCase();

  const [inserted] = await db
    .insert(marketingLeads)
    .values({
      email,
      companyName: input.companyName?.trim() || null,
      country: input.country?.trim() || null,
      source: input.source.trim(),
    })
    .onConflictDoNothing({ target: marketingLeads.email })
    .returning({
      id: marketingLeads.id,
      email: marketingLeads.email,
      companyName: marketingLeads.companyName,
      country: marketingLeads.country,
      source: marketingLeads.source,
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
      status: marketingLeads.status,
      createdAt: marketingLeads.createdAt,
    })
    .from(marketingLeads)
    .where(eq(marketingLeads.email, email))
    .limit(1);

  return existing ?? null;
}
