import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Company Profile");

export default function CompanyProfilePage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="company-profile" />
      <Footer />
    </>
  );
}
