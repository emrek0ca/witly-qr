import { getWorkspaceForUser } from "@/server/workspaces/service";
import { getRequestUserId } from "@/server/auth";
import {
  getDefaultGrowthSnapshot,
  getWorkspaceGrowthSnapshot,
} from "@/server/growth/service";

export async function GET() {
  const userId = await getRequestUserId();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const ws = await getWorkspaceForUser(userId);
  const growth = ws ? await getWorkspaceGrowthSnapshot(ws.id) : getDefaultGrowthSnapshot();

  return Response.json({ workspace: ws, growth });
}
