import { notFound } from "next/navigation";
import { clientSections } from "@/lib/navigation";
import { ClientSectionPage } from "@/features/client/client-section-page";

export function generateStaticParams() {
  return clientSections.map((section) => ({ section }));
}

export default async function ClientSectionRoute({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!clientSections.includes(section as any)) notFound();
  return <ClientSectionPage section={section} />;
}
