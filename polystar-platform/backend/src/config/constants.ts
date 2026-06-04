export const API_VERSION = "/api/v1";

export const publicReadCollections = new Set([
  "services",
  "projects",
  "portfolio",
  "case_studies",
  "testimonials",
  "partners",
  "blog_posts",
  "downloads",
  "careers",
  "gallery",
  "videos"
]);

export const protectedCollections = new Set([
  "users",
  "admins",
  "roles",
  "permissions",
  "documents",
  "settings",
  "translations",
  "support_tickets",
  "ticket_messages",
  "clients",
  "reports",
  "notifications"
]);
