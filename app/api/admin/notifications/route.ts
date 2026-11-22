import { deniedPermission } from "@/lib/staff-auth";
import { notificationsOverview, attemptDelivery, type NotificationJob } from "@/lib/notifications";
import { readCollection } from "@/lib/database";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const denied = await deniedPermission(request, "inquiries:read"); if (denied) return denied;
  return Response.json(await notificationsOverview(), { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: Request) {
  const denied = await deniedPermission(request, "notifications:manage"); if (denied) return denied;
  const body = await request.json().catch(() => null);
  if (typeof body?.id !== "string") return Response.json({ error: "Notification requise." }, { status: 400 });
  const jobs = await readCollection<NotificationJob>("notification_jobs");
  const job = jobs.find(item => item.id === body.id);
  if (!job) return Response.json({ error: "Notification introuvable." }, { status: 404 });
  const next = await attemptDelivery(job);
  return Response.json(next);
}
