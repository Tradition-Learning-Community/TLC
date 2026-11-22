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
  it("cleans the uploaded object when the database rejects its metadata", async () => {
    const file = new File([new Uint8Array([255,216,255,224])], "orphan.jpg", {type:"image/jpeg"});
    const upload = vi.fn().mockResolvedValue({url:"https://cdn.example.org/tlc/orphan.jpg"});
    const persist = vi.fn().mockRejectedValue(new Error("database unavailable"));
    const cleanup = vi.fn().mockResolvedValue(undefined);
    await expect(storeMedia(file, {title:"TLC",alt:"",credit:""}, upload, persist, cleanup))
      .rejects.toThrow("database unavailable");
    expect(cleanup).toHaveBeenCalledOnce();
    expect(cleanup.mock.calls[0][0]).toMatch(/^tlc\/.+\.jpg$/);
    expect(cleanup.mock.calls[0][1]).toBe("https://cdn.example.org/tlc/orphan.jpg");
  });
  it("preserves the original error even when remote cleanup also fails", async () => {
    const file = new File([new Uint8Array([255,216,255,224])], "orphan.jpg", {type:"image/jpeg"});
    const spy = vi.spyOn(console,"error").mockImplementation(()=>{});
    try {
      await expect(storeMedia(file, {title:"TLC",alt:"",credit:""},
        vi.fn().mockResolvedValue({url:"https://cdn.example.org/tlc/orphan.jpg"}),
        vi.fn().mockRejectedValue(new Error("database unavailable")),
        vi.fn().mockRejectedValue(new Error("storage unavailable"))))
        .rejects.toThrow("database unavailable");
      expect(spy).toHaveBeenCalledOnce();
    } finally { spy.mockRestore(); }
  });
});
