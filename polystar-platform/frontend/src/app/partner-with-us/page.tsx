import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Partner With Us", undefined, "/partner-with-us");

export default function PartnerWithUsPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="partner-with-us" />
      <Footer />
    </>
  );
}
