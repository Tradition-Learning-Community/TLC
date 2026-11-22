import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("../lib/database", () => ({
  appendRecord: vi.fn(async (_collection, item) => item),
  updateRecord: vi.fn(async () => true),
  readCollection: vi.fn(async () => []),
}));
import { attemptDelivery, emailNotificationsConfigured, newNotification, notificationsOverview } from "../lib/notifications";
import { updateRecord, readCollection } from "../lib/database";
const env = { RESEND_API_KEY:process.env.RESEND_API_KEY, TLC_ALERT_FROM:process.env.TLC_ALERT_FROM, TLC_ALERT_TO:process.env.TLC_ALERT_TO };
afterEach(() => {
  for (const [key,value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
  vi.unstubAllGlobals(); vi.clearAllMocks();
});
const inquiry = { id:"inquiry-test-1", kind:"join", createdAt:"2026-11-22T11:00:00.000Z", status:"new" };
describe("inquiry notification outbox", () => {
  it("keeps a pending notification when email is unavailable", async () => {
    delete process.env.RESEND_API_KEY; delete process.env.TLC_ALERT_FROM; delete process.env.TLC_ALERT_TO;
    expect(emailNotificationsConfigured()).toBe(false);
    const job = newNotification(inquiry as never);
    expect((await attemptDelivery(job)).status).toBe("pending");
    expect(updateRecord).not.toHaveBeenCalled();
  });
  it("sends a deduplicated email without personal message content", async () => {
    process.env.RESEND_API_KEY="re_fake"; process.env.TLC_ALERT_FROM="TLC <hello@tlc.test>";
    process.env.TLC_ALERT_TO="manager@tlc.test";
    const fetchMock = vi.fn().mockResolvedValue({ok:true,json:async()=>({id:"resend-id"})});
    vi.stubGlobal("fetch",fetchMock);
    const result = await attemptDelivery(newNotification(inquiry as never));
    expect(result.status).toBe("sent");
    const [url,request] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(request.headers["Idempotency-Key"]).toBe("tlc-inquiry-inquiry-test-1");
    expect(JSON.parse(request.body).text).not.toContain("manager@tlc.test");
    expect(updateRecord).toHaveBeenCalled();
  });
  it("reports unread inquiries", async () => {
    vi.mocked(readCollection).mockImplementation(async collection => collection === "inquiries" ? [inquiry] as never : [] as never);
    const overview = await notificationsOverview();
    expect(overview.unreadCount).toBe(1);
  });
});
