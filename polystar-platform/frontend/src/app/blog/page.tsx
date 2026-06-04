import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { BlogListPage } from "@/features/public/blog-list-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Blog", "POLYSTAR engineering articles on Industrial IoT, smart cities, embedded systems, AI in industry, and innovation in Rwanda.", "/blog");

export default function BlogPage() {
  return (
    <>
      <PublicHeader />
      <BlogListPage />
      <Footer />
    </>
  );
}
