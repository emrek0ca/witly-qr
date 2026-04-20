import { and, asc, desc, eq, inArray } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { getDb } from "@/db";
import {
  branches,
  diningTables,
  menuCategories,
  menuItems,
  menuItemSnapshots,
  qrCodes,
  tableSessions,
} from "@/db/schema";
import { isFrontendRuntime, proxyRequestToBackend } from "@/server/runtime";

type MenuItemRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  currency: string;
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ qr: string }> }) {
  if (isFrontendRuntime()) {
    return proxyRequestToBackend(req);
  }

  const { qr } = await params;
  const db = getDb();

  const [qrRow] = await db
    .select({
      token: qrCodes.token,
      workspaceId: qrCodes.workspaceId,
      branchId: qrCodes.branchId,
      diningTableId: qrCodes.diningTableId,
      branchName: branches.name,
      branchSlug: branches.slug,
      tableLabel: diningTables.label,
      tableNumber: diningTables.tableNumber,
    })
    .from(qrCodes)
    .innerJoin(branches, eq(qrCodes.branchId, branches.id))
    .innerJoin(diningTables, eq(qrCodes.diningTableId, diningTables.id))
    .where(and(eq(qrCodes.token, qr), eq(qrCodes.isActive, true)))
    .limit(1);

  if (!qrRow) {
    return Response.json({ found: false }, { status: 404 });
  }

  const [sessionRow] = await db
    .select({
      id: tableSessions.id,
      status: tableSessions.status,
      guestCount: tableSessions.guestCount,
      currentBillCents: tableSessions.currentBillCents,
      currency: tableSessions.currency,
      openedAt: tableSessions.openedAt,
    })
    .from(tableSessions)
    .where(
      and(
        eq(tableSessions.workspaceId, qrRow.workspaceId),
        eq(tableSessions.branchId, qrRow.branchId),
        eq(tableSessions.diningTableId, qrRow.diningTableId),
      ),
    )
    .orderBy(desc(tableSessions.openedAt))
    .limit(1);

  const categoryRows = await db
    .select({
      id: menuCategories.id,
      name: menuCategories.name,
      slug: menuCategories.slug,
      sortOrder: menuCategories.sortOrder,
    })
    .from(menuCategories)
    .where(
      and(
        eq(menuCategories.workspaceId, qrRow.workspaceId),
        eq(menuCategories.branchId, qrRow.branchId),
        eq(menuCategories.isVisible, true),
      ),
    )
    .orderBy(asc(menuCategories.sortOrder), asc(menuCategories.name));

  const itemRows = await db
    .select({
      id: menuItems.id,
      categoryId: menuItems.categoryId,
      name: menuItems.name,
      slug: menuItems.slug,
      description: menuItems.description,
      currentPriceCents: menuItems.currentPriceCents,
      currency: menuItems.currency,
      sortOrder: menuItems.sortOrder,
    })
    .from(menuItems)
    .where(
      and(
        eq(menuItems.workspaceId, qrRow.workspaceId),
        inArray(menuItems.categoryId, categoryRows.map((category) => category.id)),
        eq(menuItems.isAvailable, true),
      ),
    )
    .orderBy(asc(menuItems.sortOrder), asc(menuItems.name));

  const snapshotRows = itemRows.length
    ? await db
        .select({
          menuItemId: menuItemSnapshots.menuItemId,
          nameSnapshot: menuItemSnapshots.nameSnapshot,
          descriptionSnapshot: menuItemSnapshots.descriptionSnapshot,
          priceCents: menuItemSnapshots.priceCents,
          currency: menuItemSnapshots.currency,
          version: menuItemSnapshots.version,
        })
        .from(menuItemSnapshots)
        .where(
          and(
            eq(menuItemSnapshots.workspaceId, qrRow.workspaceId),
            inArray(menuItemSnapshots.menuItemId, itemRows.map((item) => item.id)),
          ),
        )
        .orderBy(asc(menuItemSnapshots.menuItemId), desc(menuItemSnapshots.version))
    : [];

  const latestSnapshots = new Map<string, (typeof snapshotRows)[number]>();
  for (const row of snapshotRows) {
    if (!latestSnapshots.has(row.menuItemId)) {
      latestSnapshots.set(row.menuItemId, row);
    }
  }

  const categories = categoryRows.map((category) => {
    const items = itemRows
      .filter((item) => item.categoryId === category.id)
      .map((item) => {
        const snapshot = latestSnapshots.get(item.id);
        const source = snapshot ?? null;

        const row: MenuItemRow = {
          id: item.id,
          name: source?.nameSnapshot ?? item.name,
          slug: item.slug,
          description: source?.descriptionSnapshot ?? item.description,
          priceCents: source?.priceCents ?? item.currentPriceCents,
          currency: source?.currency ?? item.currency,
        };

        return row;
      });

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      items,
    };
  });

  return Response.json({
    found: true,
    qr: qrRow.token,
    branch: {
      id: qrRow.branchId,
      name: qrRow.branchName,
      slug: qrRow.branchSlug,
    },
    table: {
      id: qrRow.diningTableId,
      label: qrRow.tableLabel,
      tableNumber: qrRow.tableNumber,
    },
    session: sessionRow
      ? {
          id: sessionRow.id,
          status: sessionRow.status,
          guestCount: sessionRow.guestCount,
          currentBillCents: sessionRow.currentBillCents,
          currency: sessionRow.currency,
          openedAt: sessionRow.openedAt,
        }
      : null,
    menu: {
      categories,
    },
  });
}
