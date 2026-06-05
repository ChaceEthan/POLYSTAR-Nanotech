import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Contact Us", "Contact POLYSTAR Nanotech Ltd for engineering, software, infrastructure, training, and partnership requests.", "/contact-us");

export default function ContactUsPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="contact" />
      <Footer />
    </>
  );
}
