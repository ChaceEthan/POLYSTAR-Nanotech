import type { Metadata } from "next";
import { brandAssets } from "./brand";
import { siteConfig } from "./constants";
import type { BlogArticle } from "./public-content";

export function createMetadata(title?: string, description = siteConfig.description, path = "/"): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.platformName}` : `${siteConfig.platformName} | ${siteConfig.tagline}`;
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.polystar.rw";
  const canonical = new URL(path, url).toString();

  return {
    metadataBase: new URL(url),
    applicationName: siteConfig.platformName,
    title: pageTitle,
    description,
    keywords: [
      "POLYSTAR Nanotech Ltd",
      "industrial automation Rwanda",
      "embedded systems Kigali",
      "industrial IoT",
      "smart infrastructure",
      "software development Rwanda",
      "engineering consultancy"
    ],
    authors: [{ name: siteConfig.name, url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "Engineering Technology",
    alternates: {
      canonical,
      languages: {
        "en-US": canonical
      }
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: brandAssets.favicon16, sizes: "16x16", type: "image/png" },
        { url: brandAssets.favicon, sizes: "32x32", type: "image/png" },
        { url: brandAssets.favicon48, sizes: "48x48", type: "image/png" },
        { url: brandAssets.appIcon, sizes: "192x192", type: "image/png" },
        { url: brandAssets.appIconLarge, sizes: "512x512", type: "image/png" }
      ],
      shortcut: [{ url: "/favicon.ico", sizes: "any" }],
      apple: [{ url: brandAssets.appleIcon, sizes: "180x180", type: "image/png" }]
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: siteConfig.platformName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: brandAssets.openGraph,
          width: 3000,
          height: 900,
          alt: "POLYSTAR Nanotech Ltd"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [brandAssets.openGraph]
    },
    verification: {
      google: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.platformName,
    url: siteConfig.website,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.website}/portfolio?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.website,
    logo: `${siteConfig.website}${brandAssets.footerLogo}`,
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW"
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: "customer service",
        areaServed: ["RW", "EA"],
        availableLanguage: ["English", "Kinyarwanda", "French", "Swahili"]
      }
    ],
    sameAs: ["https://www.polystar.rw"]
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function articleJsonLd(article: BlogArticle) {
  const url = `${siteConfig.website}/blog/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${siteConfig.website}${article.heroImage}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.website}${brandAssets.footerLogo}`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };
}
