export const COMPANY = {
  name: "POLYSTAR Nanotech Ltd",
  platformName: "POLYSTAR Platform",
  location: "Kigali, Rwanda",
  tagline: "Engineering Smart Solutions for Industry, Infrastructure & Innovation",
  website: "https://www.polystar.rw",
  companyProfileUrl: "https://www.polystar.rw/company-profile"
} as const;

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", locale: "en-US" },
  { code: "rw", name: "Kinyarwanda", locale: "rw-RW" },
  { code: "fr", name: "Francais", locale: "fr-FR" },
  { code: "zh", name: "Chinese", locale: "zh-CN" },
  { code: "ru", name: "Russian", locale: "ru-RU" },
  { code: "hi", name: "Hindi", locale: "hi-IN" },
  { code: "ur", name: "Urdu", locale: "ur-PK" },
  { code: "sw", name: "Swahili", locale: "sw-KE" }
] as const;

export type SupportedLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  message?: string;
  meta?: Record<string, unknown>;
};

export type ApiErrorEnvelope = {
  success: false;
  message: string;
  code?: string;
  details?: unknown;
};

export const ENTITY_COLLECTIONS = [
  "users",
  "admins",
  "roles",
  "permissions",
  "services",
  "projects",
  "portfolio",
  "case_studies",
  "testimonials",
  "partners",
  "blog_posts",
  "downloads",
  "careers",
  "quotations",
  "consultations",
  "site_visits",
  "contacts",
  "gallery",
  "videos",
  "documents",
  "settings",
  "translations",
  "support_tickets",
  "ticket_messages",
  "clients",
  "reports",
  "notifications",
  "analytics_events"
] as const;

export type EntityCollection = (typeof ENTITY_COLLECTIONS)[number];

export type EntityStatus = "draft" | "active" | "archived" | "closed" | "published" | "pending";

export type PublicService = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  status: EntityStatus;
};

export type ProjectSummary = {
  id: string;
  title: string;
  client?: string;
  industry: string;
  status: EntityStatus;
  location?: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "partner" | "admin" | "editor" | "super_admin" | "client";
  permissions: string[];
};
