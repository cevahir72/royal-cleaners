import {
  getAdminCredentials,
  createSessionToken,
} from "@/lib/auth";
import { setSessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return Response.json({ error: "Username and password are required" }, { status: 400 });
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const admin = getAdminCredentials();

  if (username !== admin.username || password !== admin.password) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createSessionToken();
  await setSessionCookie(token);

  return Response.json({ success: true });
}
