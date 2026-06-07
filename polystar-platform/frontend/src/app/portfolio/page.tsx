import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PortfolioBrowser } from "@/features/public/portfolio-browser";
import { getCmsPortfolioItems } from "@/lib/cms-content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Portfolio", "Search and filter POLYSTAR portfolio work across automation, Industrial IoT, software, research, electrical engineering, and training.", "/portfolio");
export const revalidate = 300;

export default async function PortfolioPage() {
  const items = await getCmsPortfolioItems();

  return (
    <>
      <PublicHeader />
      <PortfolioBrowser items={items} />
      <Footer />
    </>
  );
}
