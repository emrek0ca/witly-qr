import { and, asc, eq, like, or } from "drizzle-orm";
import { getDb } from "@/db";
import { members, workspaces } from "@/db/schema";

export type WorkspaceRole = "owner" | "admin" | "staff";

export async function getWorkspaceForUser(clerkUserId: string) {
  const db = getDb();

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

function slugifyWorkspaceName(name: string) {
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);

  return normalized.length > 0 ? normalized : "workspace";
}

async function getAvailableWorkspaceSlug(db: ReturnType<typeof getDb>, name: string) {
  const baseSlug = slugifyWorkspaceName(name);
  const existing = await db
    .select({ slug: workspaces.slug })
    .from(workspaces)
    .where(or(eq(workspaces.slug, baseSlug), like(workspaces.slug, `${baseSlug}-%`)))
    .orderBy(asc(workspaces.slug));

  if (!existing.some((row) => row.slug === baseSlug)) return baseSlug;

  let suffix = 2;
  while (existing.some((row) => row.slug === `${baseSlug}-${suffix}`)) suffix += 1;
  return `${baseSlug}-${suffix}`;
}

export async function createWorkspaceForUser(input: {
  clerkUserId: string;
  name: string;
}) {
  const db = getDb();
  const slug = await getAvailableWorkspaceSlug(db, input.name);

  const [ws] = await db
    .insert(workspaces)
    .values({ name: input.name.trim(), slug })
    .returning({ id: workspaces.id, name: workspaces.name, slug: workspaces.slug });

  await db.insert(members).values({
    workspaceId: ws.id,
    clerkUserId: input.clerkUserId,
    role: "owner",
  });

  return ws;
}
