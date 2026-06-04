import { z } from "zod";

export const objectIdSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB object id")
});

export const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1).optional(),
  limit: z.coerce.number().int().positive().max(100).default(20).optional(),
  status: z.string().optional(),
  q: z.string().optional(),
  locale: z.string().optional(),
  category: z.string().optional(),
  industry: z.string().optional(),
  tag: z.string().optional(),
  createdFrom: z.string().optional(),
  createdTo: z.string().optional(),
  sortBy: z.enum(["createdAt", "updatedAt", "title", "name", "status", "locale", "category", "industry"]).default("createdAt").optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc").optional()
});

export const entityBodySchema = z.object({
  title: z.string().min(2).optional(),
  name: z.string().min(2).optional(),
  slug: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["draft", "active", "archived", "closed", "published", "pending"]).optional(),
  locale: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional()
}).passthrough();

export const requestBodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  projectScope: z.string().optional(),
  preferredDate: z.coerce.date().optional(),
  location: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(5),
  metadata: z.record(z.string(), z.unknown()).optional()
}).passthrough();

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
  preferredLanguage: z.string().optional()
});

export const ticketReplySchema = z.object({
  message: z.string().min(2),
  attachments: z.array(z.string().url()).optional()
});

export const supportTicketCreateSchema = z.object({
  subject: z.string().min(2).max(180),
  message: z.string().min(5),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium").optional(),
  attachments: z.array(z.string().url()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional()
});

export const supportTicketUpdateSchema = z.object({
  subject: z.string().min(2).max(180).optional(),
  message: z.string().min(5).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  status: z.enum(["open", "pending", "closed"]).optional(),
  assignedTo: z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB object id").optional(),
  attachments: z.array(z.string().url()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional()
});

export const settingKeySchema = z.object({
  key: z.string().min(1).max(120).regex(/^[a-zA-Z0-9_.:-]+$/, "Invalid setting key")
});

export const settingBodySchema = z.object({
  value: z.unknown(),
  group: z.string().default("general").optional(),
  isPublic: z.boolean().default(false).optional(),
  description: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional()
});

export const translationBodySchema = z.object({
  locale: z.string().min(2).max(8),
  namespace: z.string().min(1).default("common").optional(),
  key: z.string().min(1),
  value: z.string().min(1),
  status: z.enum(["draft", "active", "archived"]).default("active").optional(),
  metadata: z.record(z.string(), z.unknown()).optional()
});

export const translationDeleteParamsSchema = z.object({
  locale: z.string().min(2).max(8),
  namespace: z.string().min(1),
  key: z.string().min(1)
});

export const analyticsEventSchema = z.object({
  event: z.string().min(2).max(120),
  path: z.string().optional(),
  locale: z.string().optional(),
  sessionId: z.string().optional(),
  properties: z.record(z.string(), z.unknown()).optional()
});
