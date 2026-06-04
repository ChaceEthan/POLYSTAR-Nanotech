import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.polystar.rw";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/client"]
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
