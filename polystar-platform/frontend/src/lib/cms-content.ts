import { siteConfig } from "./constants";
import {
  blogArticles,
  portfolioItems,
  professionalImages,
  projects,
  type BlogArticle,
  type GalleryItem,
  type PortfolioItem,
  type ProjectDetail
} from "./public-content";

type CmsRecord = {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  slug?: string;
  summary?: string;
  description?: string;
  category?: string;
  industry?: string;
  imageUrl?: string;
  attachments?: string[];
  tags?: string[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
};

type ApiEnvelope<T> = {
  data?: T;
};

const publicStatuses = ["published", "active"] as const;

function titleOf(record: CmsRecord) {
  return record.title ?? record.name ?? "POLYSTAR engineering update";
}

function slugOf(record: CmsRecord) {
  return record.slug ?? titleOf(record).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function stringArray(value: unknown, fallback: string[] = []) {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return fallback;
}

function recordImage(record: CmsRecord, fallback: string = professionalImages.embeddedTechnology) {
  return record.imageUrl || record.attachments?.find((item) => /^https?:\/\//i.test(item)) || fallback;
}

function galleryFromRecord(record: CmsRecord, fallbackImage: string = professionalImages.embeddedTechnology): GalleryItem[] {
  const attachments = stringArray(record.attachments);
  const images = [record.imageUrl, ...attachments].filter((item): item is string => Boolean(item));
  const uniqueImages = Array.from(new Set(images));

  if (uniqueImages.length === 0) {
    return [{ title: titleOf(record), description: record.summary ?? "POLYSTAR engineering visual reference.", image: fallbackImage }];
  }

  return uniqueImages.slice(0, 6).map((image, index) => ({
    title: index === 0 ? titleOf(record) : `${titleOf(record)} visual ${index + 1}`,
    description: record.summary ?? record.description ?? "POLYSTAR engineering visual reference.",
    image
  }));
}

function mergeBySlug<T extends { slug: string }>(cmsItems: T[], fallbackItems: T[]) {
  const seen = new Set(cmsItems.map((item) => item.slug));
  return [...cmsItems, ...fallbackItems.filter((item) => !seen.has(item.slug))];
}

async function fetchRecords(path: string, params: Record<string, string> = {}) {
  const records: CmsRecord[] = [];

  for (const status of publicStatuses) {
    try {
      const url = new URL(`${siteConfig.apiBaseUrl}${path}`);
      url.searchParams.set("status", status);
      url.searchParams.set("limit", params.limit ?? "100");
      url.searchParams.set("sortBy", params.sortBy ?? "updatedAt");
      url.searchParams.set("sortOrder", params.sortOrder ?? "desc");
      for (const [key, value] of Object.entries(params)) {
        if (value) url.searchParams.set(key, value);
      }

      const response = await fetch(url, { next: { revalidate: 300 } });
      if (!response.ok) continue;
      const body = (await response.json()) as ApiEnvelope<CmsRecord[]>;
      if (Array.isArray(body.data)) records.push(...body.data);
    } catch {
      return [];
    }
  }

  const seen = new Set<string>();
  return records.filter((record) => {
    const key = record._id ?? record.id ?? slugOf(record);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mapBlog(record: CmsRecord): BlogArticle {
  const metadata = record.metadata ?? {};
  const sections = Array.isArray(metadata.sections)
    ? (metadata.sections as BlogArticle["sections"])
    : [
        {
          heading: "Engineering Perspective",
          body: record.description ?? record.summary ?? "POLYSTAR engineering article content."
        }
      ];

  return {
    slug: slugOf(record),
    title: titleOf(record),
    category: record.category ?? "Engineering",
    tags: stringArray(record.tags, [record.category ?? "Engineering"]).slice(0, 8),
    excerpt: record.summary ?? record.description ?? "POLYSTAR engineering insight for industry, infrastructure, and innovation.",
    publishedAt: record.createdAt ?? record.updatedAt ?? new Date().toISOString(),
    readingTime: typeof metadata.readingTime === "string" ? metadata.readingTime : "4 min read",
    author: typeof metadata.author === "string" ? metadata.author : "POLYSTAR Engineering Team",
    heroImage: recordImage(record, professionalImages.engineering),
    sections
  };
}

function mapProject(record: CmsRecord): ProjectDetail {
  const metadata = record.metadata ?? {};

  return {
    slug: slugOf(record),
    title: titleOf(record),
    sector: record.industry ?? record.category ?? "Engineering",
    summary: record.summary ?? "POLYSTAR engineering project.",
    overview: record.description ?? record.summary ?? "A POLYSTAR engineering project built for practical field value.",
    features: stringArray(metadata.features, stringArray(record.tags, ["System design", "Integration", "Commissioning"])),
    technologies: stringArray(metadata.technologies, ["Automation", "IoT", "Software", "Electrical engineering"]),
    benefits: stringArray(metadata.benefits, ["Operational visibility", "Maintainable delivery", "Reliable reporting"]),
    results: stringArray(metadata.results, ["Delivered technical architecture", "Prepared field-ready workflows"]),
    gallery: galleryFromRecord(record, professionalImages.smartFactory)
  };
}

function mapPortfolio(record: CmsRecord): PortfolioItem {
  const metadata = record.metadata ?? {};

  return {
    slug: slugOf(record),
    title: titleOf(record),
    category: record.category ?? "Engineering",
    sector: record.industry ?? "Industry and infrastructure",
    summary: record.summary ?? "POLYSTAR portfolio reference.",
    description: record.description ?? record.summary ?? "A POLYSTAR portfolio item covering engineering delivery and measurable impact.",
    services: stringArray(metadata.services, [record.category ?? "Engineering"]),
    technologies: stringArray(metadata.technologies, stringArray(record.tags, ["Automation", "IoT", "Software"])),
    impact: stringArray(metadata.impact, ["Improved visibility", "Better workflow control", "Maintainable technical delivery"]),
    tags: stringArray(record.tags, [record.category ?? "Engineering"]),
    gallery: galleryFromRecord(record, professionalImages.embeddedTechnology),
    relatedProjectSlug: typeof metadata.relatedProjectSlug === "string" ? metadata.relatedProjectSlug : undefined
  };
}

export async function getCmsBlogArticles() {
  const records = await fetchRecords("/blog-posts");
  return mergeBySlug(records.map(mapBlog), blogArticles);
}

export async function getCmsBlogArticle(slug: string) {
  const records = await fetchRecords("/blog-posts", { q: slug });
  const article = records.map(mapBlog).find((item) => item.slug === slug);
  return article ?? blogArticles.find((item) => item.slug === slug);
}

export async function getCmsProjects() {
  const records = await fetchRecords("/projects");
  return mergeBySlug(records.map(mapProject), projects);
}

export async function getCmsProject(slug: string) {
  const records = await fetchRecords("/projects", { q: slug });
  const project = records.map(mapProject).find((item) => item.slug === slug);
  return project ?? projects.find((item) => item.slug === slug);
}

export async function getCmsPortfolioItems() {
  const records = await fetchRecords("/portfolio");
  return mergeBySlug(records.map(mapPortfolio), portfolioItems);
}

export async function getCmsPortfolioItem(slug: string) {
  const records = await fetchRecords("/portfolio", { q: slug });
  const item = records.map(mapPortfolio).find((portfolioItem) => portfolioItem.slug === slug);
  return item ?? portfolioItems.find((portfolioItem) => portfolioItem.slug === slug);
}
