import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Research & Innovation", undefined, "/research-innovation");

export default function ResearchInnovationPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="research-innovation" />
      <Footer />
    </>
  );
}
