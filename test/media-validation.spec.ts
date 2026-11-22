import { describe, expect, it } from "vitest";
import { hasValidImageSignature } from "../lib/media-validation";
const file = (data: number[], type: string) => new File([new Uint8Array(data)], "sample", {type});
describe("media checks", () => {
  it("accepts correctly signed image data", async () => {
    expect(await hasValidImageSignature(file([0xff,0xd8,0xff,0x00],"image/jpeg"))).toBe(true);
    expect(await hasValidImageSignature(file([137,80,78,71,13,10,26,10],"image/png"))).toBe(true);
    expect(await hasValidImageSignature(new File([new Uint8Array([82,73,70,70,0,0,0,0,87,69,66,80])],"x.webp",{type:"image/webp"}))).toBe(true);
  });
  it("rejects spoofed MIME types, unsupported files and empty files", async () => {
    expect(await hasValidImageSignature(file([1,2,3],"image/png"))).toBe(false);
    expect(await hasValidImageSignature(file([0xff,0xd8,0xff],"text/plain"))).toBe(false);
    expect(await hasValidImageSignature(file([],"image/jpeg"))).toBe(false);
  });
});
