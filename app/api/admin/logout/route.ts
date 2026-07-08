import { validateApiSession, clearSessionCookie } from "@/lib/session";

export async function POST() {
  const auth = await validateApiSession();
  if (auth) return auth;

  await clearSessionCookie();

  return Response.json({ success: true });
}
