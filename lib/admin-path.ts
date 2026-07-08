export function getAdminPath(): string {
  const secret = process.env.SECRET_ADMIN_PATH;

  if (!secret) {
    throw new Error("SECRET_ADMIN_PATH environment variable is not set");
  }

  return secret;
}
