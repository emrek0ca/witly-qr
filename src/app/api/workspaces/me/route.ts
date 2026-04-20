import { auth } from "@clerk/nextjs/server";
import { getWorkspaceForUser } from "@/server/workspaces/service";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const ws = await getWorkspaceForUser(userId);
  return Response.json({ workspace: ws });
}
