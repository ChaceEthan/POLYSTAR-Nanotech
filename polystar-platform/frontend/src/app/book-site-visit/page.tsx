import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Book Site Visit");

export default function BookSiteVisitPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="book-site-visit" />
      <Footer />
    </>
  );
}
