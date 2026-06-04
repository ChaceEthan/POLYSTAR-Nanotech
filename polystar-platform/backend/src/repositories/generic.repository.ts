import type { Model } from "mongoose";

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

export class GenericRepository<T = any> {
  readonly collectionName: string;

  constructor(private readonly model: Model<any>) {
    this.collectionName = model.collection.name;
  }

  async list(options: ListOptions = {}) {
    const page = Math.max(Number(options.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(options.limit ?? 20), 1), 100);
    const filter: Record<string, any> = { ...(options.filter ?? {}) };
    const createdAt: Record<string, Date> = {};

    if (options.status) filter.status = options.status;
    if (options.locale) filter.locale = options.locale;
    if (options.category) filter.category = options.category;
    if (options.industry) filter.industry = options.industry;
    if (options.tag) filter.tags = options.tag;
    if (options.q) filter.$text = { $search: options.q };
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
    return this.model.findById(id).lean();
  }

  async findOne(filter: Record<string, any>) {
    return this.model.findOne(filter).lean();
  }

  async create(payload: Partial<T>) {
    return this.model.create(payload);
  }

  async update(id: string, payload: Record<string, any>) {
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id).lean();
  }
}
