import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Industries");

export default function IndustriesPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="industries" />
      <Footer />
    </>
  );
}
