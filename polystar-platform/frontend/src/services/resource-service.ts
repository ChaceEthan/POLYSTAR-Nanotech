import { apiDelete, apiGet, apiPost, apiPut } from "./api-client";

export type ListParams = {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
  locale?: string;
  category?: string;
  industry?: string;
  tag?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type EntityRecord = Record<string, unknown> & {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  slug?: string;
  status?: string;
  email?: string;
  subject?: string;
  category?: string;
  industry?: string;
  locale?: string;
  role?: string;
  updatedAt?: string;
  createdAt?: string;
};

export function createResourceService<T extends EntityRecord = EntityRecord>(basePath: string) {
  return {
    list: (params?: ListParams) => apiGet<T[]>(basePath, params),
    get: (id: string) => apiGet<T>(`${basePath}/${id}`),
    create: (payload: Partial<T>) => apiPost<T, Partial<T>>(basePath, payload),
    update: (id: string, payload: Partial<T>) => apiPut<T, Partial<T>>(`${basePath}/${id}`, payload),
    remove: (id: string) => apiDelete<T>(`${basePath}/${id}`)
  };
}

export const resources = {
  users: createResourceService("/users"),
  admins: createResourceService("/admins"),
  roles: createResourceService("/roles"),
  permissions: createResourceService("/permissions"),
  projects: createResourceService("/projects"),
  portfolio: createResourceService("/portfolio"),
  services: createResourceService("/services"),
  blogPosts: createResourceService("/blog-posts"),
  contacts: createResourceService("/contacts"),
  quotations: createResourceService("/quotations"),
  consultations: createResourceService("/consultations"),
  siteVisits: createResourceService("/site-visits"),
  gallery: createResourceService("/gallery"),
  videos: createResourceService("/videos"),
  documents: createResourceService("/documents"),
  reports: createResourceService("/reports"),
  notifications: createResourceService("/notifications")
};
