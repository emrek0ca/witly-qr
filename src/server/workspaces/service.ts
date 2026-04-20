import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { members, workspaces } from "@/db/schema";

export type WorkspaceRole = "owner" | "admin" | "staff";

export async function getWorkspaceForUser(clerkUserId: string) {
  const rows = await db
    .select({
      id: workspaces.id,
      name: workspaces.name,
      slug: workspaces.slug,
      role: members.role,
    })
    .from(members)
    .innerJoin(workspaces, eq(members.workspaceId, workspaces.id))
    .where(and(eq(members.clerkUserId, clerkUserId), eq(members.isActive, true)))
    .limit(1);

  return rows[0] ?? null;
}

export async function createWorkspaceForUser(input: {
  clerkUserId: string;
  name: string;
  slug: string;
}) {
  const [ws] = await db
    .insert(workspaces)
    .values({ name: input.name, slug: input.slug })
    .returning({ id: workspaces.id, name: workspaces.name, slug: workspaces.slug });

  await db.insert(members).values({
    workspaceId: ws.id,
    clerkUserId: input.clerkUserId,
    role: "owner",
  });

  return ws;
}
