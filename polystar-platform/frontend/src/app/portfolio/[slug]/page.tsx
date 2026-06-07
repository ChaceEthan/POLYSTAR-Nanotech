import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PortfolioDetailPage } from "@/features/public/portfolio-detail-page";
import { getCmsPortfolioItem } from "@/lib/cms-content";
import { portfolioItems } from "@/lib/public-content";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCmsPortfolioItem(slug);

  return item ? createMetadata(item.title, item.summary, `/portfolio/${item.slug}`) : createMetadata("Portfolio Item", undefined, "/portfolio");
}

export default async function PortfolioItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getCmsPortfolioItem(slug);

  if (!item) notFound();

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.website },
    { name: "Portfolio", url: `${siteConfig.website}/portfolio` },
    { name: item.title, url: `${siteConfig.website}/portfolio/${item.slug}` }
  ]);

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PublicHeader />
      <PortfolioDetailPage item={item} />
      <Footer />
    </>
  );
}
