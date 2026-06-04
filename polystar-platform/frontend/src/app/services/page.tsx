import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Services");

export default function ServicesPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="services" />
      <Footer />
    </>
  );
}
