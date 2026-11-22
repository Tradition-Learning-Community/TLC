import { afterEach, describe, expect, it } from "vitest";
import { checkLocalPassword, getLocalCookieVersion, hashLocalPassword, localAdminCookie,
  validNewPassword, validUsername, newLocalPasswordSalt } from "../lib/local-admin";
const initial=process.env.ADMIN_SESSION_SECRET;
afterEach(()=>{if(initial===undefined)delete process.env.ADMIN_SESSION_SECRET;else process.env.ADMIN_SESSION_SECRET=initial;});
describe("TLC primary administrator",()=>{
  it("hashes password with unique salt",()=>{
    const salt=newLocalPasswordSalt();
    const account={username:"admin",salt,passwordHash:hashLocalPassword("TemporaryTLC#2026",salt)};
    expect(checkLocalPassword("TemporaryTLC#2026",account as never)).toBe(true);
    expect(checkLocalPassword("different",account as never)).toBe(false);
    expect(hashLocalPassword("TemporaryTLC#2026",newLocalPasswordSalt())).not.toBe(account.passwordHash);
  });
  it("enforces strong replacement credentials",()=>{
    expect(validUsername("admin")).toBe(true);
    expect(validUsername("a")).toBe(false);
    expect(validNewPassword("admin","admin")).toBe(false);
    expect(validNewPassword("AdminTest2026","admin")).toBe(true);
    expect(validNewPassword("short1A","admin")).toBe(false);
  });
  it("signs versioned cookies and rejects tampering",()=>{
    process.env.ADMIN_SESSION_SECRET="local-test-secret-only-long-enough";
    const cookie=localAdminCookie({version:3} as never).split(";")[0];
    expect(getLocalCookieVersion(new Request("https://tlc.test/api/admin/verify",{headers:{cookie}}))).toBe(3);
    const tampered=cookie.replace(".3.",".4.");
    expect(getLocalCookieVersion(new Request("https://tlc.test/api/admin/verify",{headers:{cookie:tampered}}))).toBe(null);
  });
});
