import { appendRecord, readCollection, updateRecord } from "./database";
import type { Inquiry } from "./inquiries";

export type NotificationJob = {
  id: string;
  inquiryId: string;
  kind: Inquiry["kind"];
  createdAt: string;
  status: "pending" | "sent" | "failed";
  attempts: number;
  sentAt: string | null;
  providerId: string | null;
  lastError: string | null;
};
export function emailNotificationsConfigured(): boolean {
  return !!(process.env.RESEND_API_KEY && process.env.TLC_ALERT_FROM && process.env.TLC_ALERT_TO);
}
export function newNotification(inquiry: Inquiry): NotificationJob {
  return { id: inquiry.id, inquiryId: inquiry.id, kind: inquiry.kind, createdAt: inquiry.createdAt,
    status: "pending", attempts: 0, sentAt: null, providerId: null, lastError: null };
}
export async function queueNotification(inquiry: Inquiry) {
  const event = newNotification(inquiry);
  await appendRecord("notification_jobs", event, "notification");
  return event;
}
type ResendResult = { id?: string; message?: string; name?: string };
export async function deliverNotification(job: NotificationJob): Promise<NotificationJob> {
  if (job.status === "sent") return job;
  if (!emailNotificationsConfigured()) return job;
  const recipients = (process.env.TLC_ALERT_TO || "").split(",").map(s=>s.trim()).filter(Boolean);
  if (!recipients.length) return job;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.RESEND_API_KEY,
      "Idempotency-Key": "tlc-inquiry-" + job.id,
    },
    body: JSON.stringify({
      from: process.env.TLC_ALERT_FROM,
      to: recipients,
      subject: "TLC : nouvelle demande (" + job.kind + ")",
      text: "Une nouvelle demande a été enregistrée. Référence : " + job.inquiryId +
        "\nConsultez la boîte de réception : https://tlc-ruby.vercel.app/admin/demandes",
    }),
    signal: AbortSignal.timeout(7000),
  }).catch(error => { throw new Error(error instanceof Error ? error.message : "Service indisponible"); });
  const result = await response.json().catch(() => ({} as ResendResult)) as ResendResult;
  if (!response.ok) throw new Error("Service e-mail : HTTP " + response.status +
    (typeof result.message === "string" ? " " + result.message.slice(0, 100) : ""));
  const next: NotificationJob = { ...job, status: "sent", attempts: job.attempts + 1,
    sentAt: new Date().toISOString(), providerId: result.id || null, lastError: null };
  await updateRecord("notification_jobs", next);
  return next;
}
export async function attemptDelivery(job: NotificationJob): Promise<NotificationJob> {
  if (!emailNotificationsConfigured()) return job;
  try { return await deliverNotification(job); }
  catch (error) {
    const next: NotificationJob = { ...job, status: "failed", attempts: job.attempts + 1,
      lastError: error instanceof Error ? error.message.slice(0,180) : "Erreur inconnue" };
    await updateRecord("notification_jobs", next);
    return next;
  }
}
export async function notificationsOverview() {
  const [jobs, inquiries] = await Promise.all([
    readCollection<NotificationJob>("notification_jobs"), readCollection<Inquiry>("inquiries"),
  ]);
  return {
    unreadCount: inquiries.filter(item=>item.status === "new").length,
    configured: emailNotificationsConfigured(),
    jobs: jobs.sort((a,b) => b.createdAt.localeCompare(a.createdAt)),
  };
}
