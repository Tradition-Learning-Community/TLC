import { neonAuth } from "@/lib/neon-auth";
type Verb = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
async function serve(method: Verb, request: Request, context: { params: Promise<{ path: string[] }> }) {
  const auth = neonAuth();
  if (!auth) return Response.json({ error: "Authentification non configurée." }, { status: 503 });
  const handlers = auth.handler() as unknown as Record<Verb,
    (request: Request, context: { params: Promise<{ path: string[] }> }) => Response | Promise<Response>>;
  return handlers[method](request, context);
}
type Context = { params: Promise<{ path: string[] }> };
export const GET = (request: Request, context: Context) => serve("GET", request, context);
export const POST = (request: Request, context: Context) => serve("POST", request, context);
export const PUT = (request: Request, context: Context) => serve("PUT", request, context);
export const PATCH = (request: Request, context: Context) => serve("PATCH", request, context);
export const DELETE = (request: Request, context: Context) => serve("DELETE", request, context);
