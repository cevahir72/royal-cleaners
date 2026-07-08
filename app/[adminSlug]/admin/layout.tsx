import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/admin-path";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ adminSlug: string }>;
}) {
  const { adminSlug } = await params;

  if (adminSlug !== getAdminPath()) {
    notFound();
  }

  return <>{children}</>;
}
