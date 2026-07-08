import { randomUUID } from "node:crypto";

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD environment variables must be set");
  }

  return { username, password };
}

export function createSessionToken(): string {
  return randomUUID();
}

export const SESSION_COOKIE_NAME = "rc_admin_session";

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

export function getCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}
