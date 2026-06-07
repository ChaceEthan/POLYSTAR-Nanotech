import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { BlogListPage } from "@/features/public/blog-list-page";
import { getCmsBlogArticles } from "@/lib/cms-content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Blog", "POLYSTAR engineering articles on Industrial IoT, smart cities, embedded systems, AI in industry, and innovation in Rwanda.", "/blog");
export const revalidate = 300;

export default async function BlogPage() {
  const articles = await getCmsBlogArticles();

  return (
    <>
      <PublicHeader />
      <BlogListPage articles={articles} />
      <Footer />
    </>
  );
}
