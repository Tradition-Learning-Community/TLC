import { describe, expect, it, vi } from "vitest";
import { storeMedia } from "../lib/media-store";
describe("media storage end-to-end logic", () => {
  it("uploads JPEG bytes and saves an unpublished metadata record", async () => {
    const file = new File([new Uint8Array([255,216,255,224])],"tlc.jpg",{type:"image/jpeg"});
    const upload = vi.fn().mockResolvedValue({url:"https://cdn.example.org/tlc/media.jpg"});
    const persist = vi.fn().mockResolvedValue(undefined);
    const record = await storeMedia(file, {title:"TLC photo",alt:"TLC group",credit:"TLC"},
      upload, persist);
    expect(upload).toHaveBeenCalledOnce();
    expect(upload.mock.calls[0][0]).toMatch(/^tlc\/.+\.jpg$/);
    expect(upload.mock.calls[0][2]).toBe("image/jpeg");
    expect(record.published).toBe(false);
    expect(record.url).toBe("https://cdn.example.org/tlc/media.jpg");
    expect(persist).toHaveBeenCalledWith(record);
  });
});
