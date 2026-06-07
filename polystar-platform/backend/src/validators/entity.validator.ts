import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);
const requiredText = (min = 2, max = 240) => z.string().trim().min(min).max(max);
const optionalText = (max = 240) => z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());
const optionalDate = z.preprocess(emptyToUndefined, z.coerce.date().optional());

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
  name: requiredText(2, 120),
  email: z.string().trim().email().max(180),
  phone: optionalText(60),
  company: optionalText(160),
  subject: optionalText(180),
  service: optionalText(160),
  projectScope: optionalText(1500),
  preferredDate: optionalDate,
  location: optionalText(240),
  budget: optionalText(120),
  message: requiredText(10, 4000),
  companyWebsite: z.string().trim().max(0, "Spam check failed").optional(),
  metadata: z.record(z.string(), z.unknown()).optional()
}).passthrough();

export const contactSchema = z.object({
  name: requiredText(2, 120),
  email: z.string().trim().email().max(180),
  phone: optionalText(60),
  company: optionalText(160),
  subject: requiredText(2, 180),
  message: requiredText(10, 4000),
  preferredLanguage: optionalText(24),
  companyWebsite: z.string().trim().max(0, "Spam check failed").optional()
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
