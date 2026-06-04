import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Get Quotation");

export default function GetQuotationPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="get-quotation" />
      <Footer />
    </>
  );
}
