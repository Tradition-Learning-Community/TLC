import { afterEach, describe, expect, it } from "vitest";
import { mediaDriver, mediaStorageConfigured } from "../lib/media-storage";
const saved = {MEDIA_STORAGE_DRIVER:process.env.MEDIA_STORAGE_DRIVER,BLOB_READ_WRITE_TOKEN:process.env.BLOB_READ_WRITE_TOKEN,S3_BUCKET:process.env.S3_BUCKET,S3_REGION:process.env.S3_REGION,S3_ACCESS_KEY_ID:process.env.S3_ACCESS_KEY_ID,S3_SECRET_ACCESS_KEY:process.env.S3_SECRET_ACCESS_KEY,MEDIA_PUBLIC_BASE_URL:process.env.MEDIA_PUBLIC_BASE_URL};
afterEach(()=>{for(const [key,value] of Object.entries(saved)){if(value===undefined)delete process.env[key];else process.env[key]=value;}});
describe("portable media provider configuration",()=>{
  it("uses Vercel Blob only when chosen and configured",()=>{
    delete process.env.MEDIA_STORAGE_DRIVER;delete process.env.BLOB_READ_WRITE_TOKEN;
    expect(mediaDriver()).toBe("vercel-blob");expect(mediaStorageConfigured()).toBe(false);
    process.env.BLOB_READ_WRITE_TOKEN="test-token";
    expect(mediaStorageConfigured()).toBe(true);
  });
  it("supports S3-compatible deployments without Vercel credentials",()=>{
    process.env.MEDIA_STORAGE_DRIVER="s3";delete process.env.BLOB_READ_WRITE_TOKEN;
    process.env.S3_BUCKET="tlc";process.env.S3_REGION="auto";process.env.S3_ACCESS_KEY_ID="test";
    process.env.S3_SECRET_ACCESS_KEY="test";process.env.MEDIA_PUBLIC_BASE_URL="https://cdn.example.org";
    expect(mediaDriver()).toBe("s3");expect(mediaStorageConfigured()).toBe(true);
  });
});
