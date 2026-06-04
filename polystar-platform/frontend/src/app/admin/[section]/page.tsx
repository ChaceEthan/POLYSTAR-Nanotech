import { notFound } from "next/navigation";
import { adminSections } from "@/lib/navigation";
import { AdminSectionPage } from "@/features/admin/admin-section-page";

export function generateStaticParams() {
  return adminSections.map((section) => ({ section }));
}

export default async function AdminSectionRoute({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!adminSections.includes(section as any)) notFound();
  return <AdminSectionPage section={section} />;
}
