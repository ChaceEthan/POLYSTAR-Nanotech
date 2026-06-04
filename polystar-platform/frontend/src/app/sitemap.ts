import type { MetadataRoute } from "next";
import { publicPages } from "@/lib/navigation";
import { blogArticles, portfolioItems, projects } from "@/lib/public-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.polystar.rw";
  const now = new Date();

  const publicRoutes = publicPages.map((page) => ({
    url: `${siteUrl}/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85
  }));

  const portfolioRoutes = portfolioItems.map((item) => ({
    url: `${siteUrl}/portfolio/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75
  }));

  const blogRoutes = blogArticles.map((article) => ({
    url: `${siteUrl}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...publicRoutes,
    ...projectRoutes,
    ...portfolioRoutes,
    ...blogRoutes
  ];
}
