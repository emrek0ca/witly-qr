import { and, count, eq } from "drizzle-orm";
import { getDb } from "@/db";
import {
  branches,
  marketingLeads,
  menuItems,
  qrCodes,
  diningTables,
} from "@/db/schema";

export type GrowthSnapshot = {
  score: number;
  label: string;
  nextActions: string[];
  publicSignals: {
    branches: number;
    tables: number;
    menus: number;
    qrCodes: number;
    leads: number;
  };
};

function clampScore(score: number) {
  return Math.max(0, Math.min(100, score));
}

export function scoreGrowthSignals(input: GrowthSnapshot["publicSignals"]) {
  let score = 15;

  if (input.branches > 0) score += 18;
  if (input.tables >= 4) score += 18;
  if (input.menus >= 6) score += 18;
  if (input.qrCodes >= input.tables && input.tables > 0) score += 14;
  if (input.leads > 0) score += 12;
  if (input.leads >= 5) score += 5;

  return clampScore(score);
}

function labelGrowthScore(score: number) {
  if (score >= 85) return "growth ready";
  if (score >= 65) return "launching";
  if (score >= 45) return "foundation built";
  return "needs activation";
}

function buildNextActions(input: GrowthSnapshot["publicSignals"]) {
  const actions = [
    input.branches === 0 ? "Add a first branch and publish the live table flow." : null,
    input.tables === 0 ? "Register tables so QR scans map to real seats." : null,
    input.menus === 0 ? "Publish menu categories and snapshot-priced items." : null,
    input.qrCodes < input.tables ? "Mint QR codes for every active table." : null,
    input.leads === 0 ? "Capture the first lead with the public pricing page." : null,
    "Share the guest table link and product page with every launch.",
  ].filter(Boolean);

  return actions.slice(0, 4) as string[];
}

export async function getWorkspaceGrowthSnapshot(workspaceId: string): Promise<GrowthSnapshot> {
  const db = getDb();

  const [branchCountRow, tableCountRow, menuCountRow, qrCountRow, leadCountRow] =
    await Promise.all([
      db.select({ value: count() }).from(branches).where(eq(branches.workspaceId, workspaceId)),
      db.select({ value: count() }).from(diningTables).where(eq(diningTables.workspaceId, workspaceId)),
      db.select({ value: count() }).from(menuItems).where(eq(menuItems.workspaceId, workspaceId)),
      db.select({ value: count() }).from(qrCodes).where(eq(qrCodes.workspaceId, workspaceId)),
      db.select({ value: count() }).from(marketingLeads).where(
        and(eq(marketingLeads.source, "pricing-page"), eq(marketingLeads.status, "new")),
      ),
    ]);

  const publicSignals = {
    branches: Number(branchCountRow[0]?.value ?? 0),
    tables: Number(tableCountRow[0]?.value ?? 0),
    menus: Number(menuCountRow[0]?.value ?? 0),
    qrCodes: Number(qrCountRow[0]?.value ?? 0),
    leads: Number(leadCountRow[0]?.value ?? 0),
  };

  const score = scoreGrowthSignals(publicSignals);

  return {
    score,
    label: labelGrowthScore(score),
    nextActions: buildNextActions(publicSignals),
    publicSignals,
  };
}

export function getDefaultGrowthSnapshot(): GrowthSnapshot {
  const publicSignals = {
    branches: 0,
    tables: 0,
    menus: 0,
    qrCodes: 0,
    leads: 0,
  };

  const score = scoreGrowthSignals(publicSignals);

  return {
    score,
    label: labelGrowthScore(score),
    nextActions: buildNextActions(publicSignals),
    publicSignals,
  };
}
