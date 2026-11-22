/* eslint @typescript-eslint/no-require-imports: "off" */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");

const origin = process.env.E2E_BASE_URL || "http://127.0.0.1:3000";
const password = process.env.E2E_ADMIN_PASSWORD;
if (!password) throw new Error("E2E_ADMIN_PASSWORD is required");
const screenshots = "test-results";
fs.mkdirSync(screenshots, {recursive:true});

(async () => {
 const browser = await chromium.launch({headless:true, args:["--no-sandbox"]});
 const context = await browser.newContext({baseURL:origin, viewport:{width:1280,height:800}});
 const page = await context.newPage();
 const errors = [];
 page.on("pageerror", e => errors.push(e.message));
 try {
   // Real browser: legacy login -> signed cookie -> protected admin session.
   await page.goto("/admin/login");
   await page.getByRole("button", {name:"Ancien accès"}).click();
   await page.getByLabel("Mot de passe").fill(password);
   await page.getByRole("button", {name:"Se connecter"}).click();
   await page.waitForURL("**/admin", {timeout:20000});
   const who = await context.request.get("/api/admin/verify");
   assert.equal(who.status(),200,"admin session");
   const actor = (await who.json()).actor;
   assert.equal(actor.role,"owner");
   assert.equal(actor.kind,"legacy");
   // The legacy owner issues a one-use invite and the invited user claims it
   // against isolated Neon Auth, then receives an individual database-backed role.
   const staffEmail = "tlc-browser-" + Date.now() + "@example.org";
   const staffPassword = "TLC-e2e-Temporary-99!";
   await page.goto("/admin/staff");
   await page.getByLabel("Nom", {exact:true}).fill("Test Administration E2E");
   await page.getByLabel("Adresse e-mail").fill(staffEmail);
   await page.getByRole("button",{name:"Créer l'invitation"}).click();
   await page.getByText("Compte invité.",{exact:false}).waitFor();
   const link = await page.locator('input[readonly]').inputValue();
   assert.ok(link.includes("/admin/activate#token="));
   const accountsResponse = await context.request.get("/api/admin/staff");
   assert.equal(accountsResponse.status(),200);
   const accounts = await accountsResponse.json();
   console.log("Invitations saved:", accounts.length, "Expected:", staffEmail, "Data:", JSON.stringify(accounts).slice(0,800));
   assert.ok(accounts.some(account=>account.email===staffEmail), "account was not listed after HTTP 201");
   assert.ok(accounts.every(account=>!("inviteHash" in account)));
   await context.request.post("/api/admin/logout");
   await page.goto(link);
   await page.getByLabel("Nom complet").fill("Test Administration E2E");
   await page.getByLabel("Adresse e-mail invitée").fill(staffEmail);
   await page.getByLabel("Mot de passe").fill(staffPassword);
   await page.getByRole("button",{name:"Créer mon compte et activer"}).click();
   await page.waitForURL("**/admin",{timeout:30000});
   const nominated = await context.request.get("/api/admin/verify");
   assert.equal(nominated.status(),200,"nominated staff login");
   const namedActor = (await nominated.json()).actor;
   assert.equal(namedActor.kind,"staff");
   assert.equal(namedActor.role,"owner");
   // Visitor form writes a real inquiry and a durable alert to the test database.
   const visitor = await browser.newContext({baseURL:origin,viewport:{width:900,height:760}});
   const vpage = await visitor.newPage();
   await vpage.goto("/contact");
   await vpage.locator("#request-name").fill("E2E Contact TLC");
   await vpage.locator("#request-email").fill("e2e-request@example.org");
   await vpage.locator("#request-message").fill("Test de formulaire de contact depuis un navigateur automatisé.");
   await vpage.getByRole("checkbox").check();
   await vpage.getByRole("button",{name:"Envoyer ma demande"}).click();
   await vpage.getByText("Votre demande a été transmise à TLC.",{exact:false}).waitFor({timeout:15000});
   const unauth = await visitor.request.get("/api/admin/notifications");
   assert.equal(unauth.status(),401);
   const uploadDenied = await visitor.request.post("/api/media/upload");
   assert.equal(uploadDenied.status(),401);
   await visitor.close();
   // Back-office sees the new request and the pending email status.
   await page.goto("/admin/demandes");
   await page.getByText("E2E Contact TLC").first().waitFor();
   await page.screenshot({path:screenshots+"/requests.png",fullPage:true});
   const overview = await context.request.get("/api/admin/notifications");
   assert.equal(overview.status(),200);
   const notifications = await overview.json();
   assert.ok(notifications.unreadCount >= 1);
   assert.ok(notifications.jobs.length >= 1);
   // Authenticated upload: forged PNG is rejected before reaching Blob storage.
   const badImage = await context.request.post("/api/media/upload",{multipart:{
      file:{name:"fake.png",mimeType:"image/png",buffer:Buffer.from("not-a-real-image")},
      title:"Reject spoofed PNG",
   }});
   assert.equal(badImage.status(),400,"spoofed image rejected");
   // Logout clears legacy credential and protected resources are denied again.
   await page.getByRole("button",{name:"Se déconnecter"}).last().click();
   await page.waitForURL("**/admin/login",{timeout:15000});
   assert.equal((await context.request.get("/api/admin/verify")).status(),401);
   assert.equal((await context.request.get("/api/admin/staff")).status(),401);
   assert.equal(errors.length,0,"no uncaught browser JS errors: "+errors.join("; "));
   console.log("PASS browser E2E: login, invitation, form, alert, upload rejection, logout, access control");
 } finally { await context.close(); await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
