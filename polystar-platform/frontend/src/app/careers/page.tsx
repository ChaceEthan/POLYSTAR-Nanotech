import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Careers");

export default function CareersPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="careers" />
      <Footer />
    </>
  );
}
