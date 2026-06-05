import { apiDelete, apiGet, apiPut } from "./api-client";

export type SettingPayload = {
  value: unknown;
  group?: string;
  isPublic?: boolean;
  description?: string;
  metadata?: Record<string, unknown>;
};

export const settingsService = {
  publicSettings: () => apiGet("/settings/public"),
  list: () => apiGet("/settings"),
  get: (key: string) => apiGet(`/settings/${key}`),
  upsert: (key: string, payload: SettingPayload) => apiPut(`/settings/${key}`, payload),
  remove: (key: string) => apiDelete(`/settings/${key}`)
};
