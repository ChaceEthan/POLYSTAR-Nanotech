import { apiDelete, apiGet, apiPost } from "./api-client";

export type TranslationPayload = {
  locale: string;
  namespace?: string;
  key: string;
  value: string;
  status?: "draft" | "active" | "archived";
  metadata?: Record<string, unknown>;
};

export const translationsService = {
  publicLocale: (locale: string, namespace?: string) => apiGet<Record<string, string>>(`/translations/public/${locale}`, { namespace }),
  list: (params?: { locale?: string; namespace?: string }) => apiGet("/translations", params),
  upsert: (payload: TranslationPayload) => apiPost("/translations", payload),
  remove: (locale: string, namespace: string, key: string) => apiDelete(`/translations/${locale}/${namespace}/${key}`)
};
