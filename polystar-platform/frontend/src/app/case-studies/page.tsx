import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Case Studies", undefined, "/case-studies");

export default function CaseStudiesPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="case-studies" />
      <Footer />
    </>
  );
}
