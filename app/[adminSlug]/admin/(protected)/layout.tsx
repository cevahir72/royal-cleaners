import { validatePageSession } from "@/lib/session";

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ adminSlug: string }>;
}) {
  const { adminSlug } = await params;

  await validatePageSession(adminSlug);

  return <>{children}</>;
}
