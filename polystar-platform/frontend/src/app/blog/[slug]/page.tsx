import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { BlogArticlePage } from "@/features/public/blog-article-page";
import { blogArticles, getBlogArticle } from "@/lib/public-content";
import { articleJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  return article ? createMetadata(article.title, article.excerpt, `/blog/${article.slug}`) : createMetadata("Blog Article", undefined, "/blog");
}

export default async function BlogArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) notFound();

  const articleSchema = articleJsonLd(article);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.website },
    { name: "Blog", url: `${siteConfig.website}/blog` },
    { name: article.title, url: `${siteConfig.website}/blog/${article.slug}` }
  ]);

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PublicHeader />
      <BlogArticlePage article={article} />
      <Footer />
    </>
  );
}
