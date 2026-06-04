import type { ListOptions } from "../repositories/generic.repository.js";
import { GenericRepository } from "../repositories/generic.repository.js";
import { AppError } from "../middleware/error.js";
import { toSlug } from "../utils/slug.js";

export class GenericCrudService<T extends Record<string, any>> {
  constructor(private readonly repository: GenericRepository<T>) {}

  get resourceName() {
    return this.repository.collectionName;
  }

  list(options: ListOptions) {
    return this.repository.list(options);
  }

  async getById(id: string, filter: Record<string, any> = {}) {
    const entity = Object.keys(filter).length > 0 ? await this.repository.findOne({ _id: id, ...filter }) : await this.repository.findById(id);
    if (!entity) throw new AppError("Resource not found", 404, "RESOURCE_NOT_FOUND");
    return entity;
  }

  async getBySlug(slug: string, filter: Record<string, any> = {}) {
    const entity = await this.repository.findOne({ slug, ...filter } as any);
    if (!entity) throw new AppError("Resource not found", 404, "RESOURCE_NOT_FOUND");
    return entity;
  }

  create(payload: T) {
    const title = payload.title ?? payload.name;
    const normalized = title && !payload.slug ? { ...payload, slug: toSlug(String(title)) } : payload;
    return this.repository.create(normalized as Partial<T>);
  }

  async update(id: string, payload: Partial<T>) {
    const entity = await this.repository.update(id, payload as any);
    if (!entity) throw new AppError("Resource not found", 404, "RESOURCE_NOT_FOUND");
    return entity;
  }

  async delete(id: string) {
    const entity = await this.repository.delete(id);
    if (!entity) throw new AppError("Resource not found", 404, "RESOURCE_NOT_FOUND");
    return entity;
  }
}
