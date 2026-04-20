import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createWorkspaceForUser } from "@/server/workspaces/service";

const schema = z.object({
  name: z.string().min(2),
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return Response.json({ error: "invalid_body" }, { status: 400 });

  const ws = await createWorkspaceForUser({
    clerkUserId: userId,
    name: parsed.data.name,
  });

  return Response.json({ workspace: ws });
}
