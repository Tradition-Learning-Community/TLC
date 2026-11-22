export const mediaMimeTypes: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif",
};
export const MAX_MEDIA_BYTES = 4_000_000;
export async function hasValidImageSignature(file: File): Promise<boolean> {
  if (!mediaMimeTypes[file.type] || file.size === 0 || file.size > MAX_MEDIA_BYTES) return false;
  const bytes = new Uint8Array(await file.slice(0,16).arrayBuffer());
  const text = (begin: number,end: number) => new TextDecoder().decode(bytes.slice(begin,end));
  switch (file.type) {
    case "image/jpeg": return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    case "image/png": return [137,80,78,71,13,10,26,10].every((v,i) => bytes[i] === v);
    case "image/webp": return text(0,4) === "RIFF" && text(8,12) === "WEBP";
    case "image/avif": return text(4,12).includes("ftypavif") || text(4,12).includes("ftypavis");
    default: return false;
  }
}
