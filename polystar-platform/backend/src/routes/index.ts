import { Router } from "express";
import { getDatabaseHealth } from "../database/connection.js";
import { services } from "../services/index.js";
import { analyticsRoutes } from "./analytics.routes.js";
import { authRoutes } from "./auth.routes.js";
import { crudRoutes } from "./crud.routes.js";
import { dashboardRoutes } from "./dashboard.routes.js";
import { requestRoutes } from "./request.routes.js";
import { settingsRoutes } from "./settings.routes.js";
import { supportTicketRoutes } from "./support-ticket.routes.js";
import { translationsRoutes } from "./translations.routes.js";
import { uploadRoutes } from "./upload.routes.js";
import type { Request } from "express";

export const apiRoutes = Router();

apiRoutes.get("/health", (_req, res) => {
  const health = getDatabaseHealth();
  const connected = health.database === "connected";

  return res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "degraded",
    database: health.database,
    timestamp: new Date().toISOString(),
    ...(connected ? {} : { diagnostics: health.diagnostics })
  });
});

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/dashboard", dashboardRoutes);
apiRoutes.use("/", requestRoutes);

const partnerContentAccess = { readRoles: ["partner"], writeRoles: ["partner"] };

apiRoutes.use("/projects", crudRoutes(services.projects, { publicRead: true, writeRoles: ["partner"] }));
apiRoutes.use("/portfolio", crudRoutes(services.portfolio, { publicRead: true, writeRoles: ["partner"] }));
apiRoutes.use("/blog", crudRoutes(services.blog_posts, { publicRead: true, slugRoute: true, writeRoles: ["partner"] }));
apiRoutes.use("/blog-posts", crudRoutes(services.blog_posts, { publicRead: true, slugRoute: true, writeRoles: ["partner"] }));
apiRoutes.use("/services", crudRoutes(services.services, { publicRead: true }));
apiRoutes.use("/tickets", supportTicketRoutes);
apiRoutes.use("/support-tickets", supportTicketRoutes);
apiRoutes.use("/upload", uploadRoutes);
apiRoutes.use("/uploads", uploadRoutes);
apiRoutes.use("/settings", settingsRoutes);
apiRoutes.use("/translations", translationsRoutes);
apiRoutes.use("/analytics", analyticsRoutes);

const adminCollections = [
  "users",
  "admins",
  "roles",
  "permissions",
  "case_studies",
  "testimonials",
  "partners",
  "downloads",
  "careers",
  "quotations",
  "consultations",
  "site_visits",
  "contacts",
  "gallery",
  "videos",
  "documents",
  "clients",
  "reports",
  "notifications",
  "analytics_events"
] as const;

const staffRoles = new Set(["super_admin", "admin", "editor"]);

function isStaff(req: Request) {
  return Boolean(req.user?.permissions.includes("*") || (req.user?.role && staffRoles.has(req.user.role)));
}

function clientOwnedContentFilter(req: Request) {
  if (isStaff(req)) return {};
  const identifiers = [req.user?.id, req.user?.email].filter(Boolean);

  return {
    $or: [
      ...identifiers.map((identifier) => ({ client: identifier })),
      ...identifiers.map((identifier) => ({ owner: identifier })),
      ...(req.user?.id ? [{ createdBy: req.user.id }, { user: req.user.id }] : [])
    ]
  };
}

function clientNotificationFilter(req: Request) {
  if (isStaff(req)) return {};
  return { recipient: req.user?.id };
}

const clientReadableCollectionOptions: Partial<Record<(typeof adminCollections)[number], Parameters<typeof crudRoutes>[1]>> = {
  case_studies: partnerContentAccess,
  gallery: partnerContentAccess,
  videos: partnerContentAccess,
  documents: { readRoles: ["client"], readFilter: clientOwnedContentFilter },
  reports: { readRoles: ["client"], readFilter: clientOwnedContentFilter },
  notifications: { readRoles: ["client"], readFilter: clientNotificationFilter }
};

for (const collection of adminCollections) {
  apiRoutes.use(`/${collection.replaceAll("_", "-")}`, crudRoutes(services[collection], clientReadableCollectionOptions[collection]));
}
