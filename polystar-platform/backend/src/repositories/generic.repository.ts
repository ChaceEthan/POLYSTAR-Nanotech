import mongoose, { type Model } from "mongoose";
import { AppError } from "../middleware/error.js";

export type ListOptions = {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
  locale?: string;
  category?: string;
  industry?: string;
  tag?: string;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filter?: Record<string, any>;
};

const allowedSortFields = new Set(["createdAt", "updatedAt", "title", "name", "status", "locale", "category", "industry"]);
const searchableFields = [
  "title",
  "name",
  "summary",
  "description",
  "subject",
  "message",
  "email",
  "company",
  "service",
  "projectScope",
  "client",
  "category",
  "industry",
  "location"
];

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export class GenericRepository<T = any> {
  readonly collectionName: string;

  constructor(private readonly model: Model<any>) {
    this.collectionName = model.collection.name;
  }

  private ensureDatabaseReady() {
    if (mongoose.connection.readyState !== 1) {
      throw new AppError("Database connection is unavailable. Please try again shortly.", 503, "DATABASE_UNAVAILABLE", {
        readyState: mongoose.connection.readyState,
        collection: this.collectionName
      });
    }
  }

  async list(options: ListOptions = {}) {
    this.ensureDatabaseReady();
    const page = Math.max(Number(options.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(options.limit ?? 20), 1), 100);
    const filter: Record<string, any> = { ...(options.filter ?? {}) };
    const createdAt: Record<string, Date> = {};

    if (options.status) filter.status = options.status;
    if (options.locale) filter.locale = options.locale;
    if (options.category) filter.category = options.category;
    if (options.industry) filter.industry = options.industry;
    if (options.tag) filter.tags = options.tag;
    if (options.q) {
      const search = new RegExp(escapeRegex(options.q), "i");
      filter.$or = searchableFields.map((field) => ({ [field]: search }));
    }
    if (options.createdFrom) createdAt.$gte = new Date(options.createdFrom);
    if (options.createdTo) createdAt.$lte = new Date(options.createdTo);
    if (Object.keys(createdAt).length > 0) filter.createdAt = createdAt;

    const sortBy = allowedSortFields.has(String(options.sortBy)) ? String(options.sortBy) : "createdAt";
    const sortOrder = options.sortOrder === "asc" ? 1 : -1;

    const [items, total] = await Promise.all([
      this.model
        .find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.model.countDocuments(filter)
    ]);

    return {
      items,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    };
  }

  async findById(id: string) {
    this.ensureDatabaseReady();
    return this.model.findById(id).lean();
  }

  async findOne(filter: Record<string, any>) {
    this.ensureDatabaseReady();
    return this.model.findOne(filter).lean();
  }

  async create(payload: Partial<T>) {
    this.ensureDatabaseReady();
    return this.model.create(payload);
  }

  async update(id: string, payload: Record<string, any>) {
    this.ensureDatabaseReady();
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
  }

  async delete(id: string) {
    this.ensureDatabaseReady();
    return this.model.findByIdAndDelete(id).lean();
  }
}
