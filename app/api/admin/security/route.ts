import { authorizedLocalAdmin, changeLocalCredentials, localAdminCookie } from "@/lib/local-admin";
import { sameOrigin } from "@/lib/staff-utils";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const account = await authorizedLocalAdmin(request);
  if (!account) return Response.json({ error:"Compte administrateur requis." }, { status:401 });
  return Response.json({ username: account.username, mustChange:account.mustChange }, {headers:{"Cache-Control":"no-store"}});
}
export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return Response.json({error:"Origine non autorisée."},{status:403});
  const account = await authorizedLocalAdmin(request);
  if (!account) return Response.json({error:"Authentification requise."},{status:401});
  const body = await request.json().catch(()=>null);
  if (typeof body?.currentPassword !== "string" || typeof body?.newPassword !== "string" ||
      typeof body?.username !== "string") return Response.json({error:"Saisie invalide."},{status:400});
  const result = await changeLocalCredentials(account, body.currentPassword, body.newPassword, body.username.trim());
  if (!result.ok) {
    const error = result.reason === "invalid" ? "Mot de passe actuel incorrect." :
      result.reason === "conflict" ? "Le compte a été modifié. Reconnectez-vous." :
      "Identifiant invalide ou mot de passe trop faible (12 caractères minimum, majuscules, minuscules et chiffres).";
    return Response.json({error},{status:result.reason==="conflict"?409:400});
  }
  const response = Response.json({ok:true,username:result.account.username});
  response.headers.set("Set-Cookie",localAdminCookie(result.account));
  response.headers.set("Cache-Control","no-store");
  return response;
}
