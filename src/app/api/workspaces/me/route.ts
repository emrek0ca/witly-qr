import { getWorkspaceForUser } from "@/server/workspaces/service";
import { getRequestUserId } from "@/server/auth";

export async function GET() {
  const userId = await getRequestUserId();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const ws = await getWorkspaceForUser(userId);
  return Response.json({ workspace: ws });
}
