import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Software Development", undefined, "/software-development");

export default function SoftwareDevelopmentPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="software-development" />
      <Footer />
    </>
  );
}
