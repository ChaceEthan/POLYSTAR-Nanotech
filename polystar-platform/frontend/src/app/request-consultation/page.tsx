import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Request Consultation", undefined, "/request-consultation");

export default function RequestConsultationPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="request-consultation" />
      <Footer />
    </>
  );
}
