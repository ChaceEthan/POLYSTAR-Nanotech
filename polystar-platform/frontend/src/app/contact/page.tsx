import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Contact");

export default function ContactPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="contact" />
      <Footer />
    </>
  );
}
