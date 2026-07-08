import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  getCookieOptions,
} from "@/lib/auth";

const BASE_OPTIONS = getCookieOptions();

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session?.value ?? null;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    ...BASE_OPTIONS,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    ...BASE_OPTIONS,
    maxAge: 0,
  });
}

export async function validateApiSession(): Promise<Response | undefined> {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return undefined;
}

export async function validatePageSession(adminSlug: string): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect(`/${adminSlug}/admin`);
  }
}
