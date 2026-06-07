import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("About", undefined, "/about");

export default function AboutPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="about" />
      <Footer />
    </>
  );
}
