import { apiGet, apiPost } from "./api-client";

export type AnalyticsEventPayload = {
  event: string;
  path?: string;
  locale?: string;
  sessionId?: string;
  properties?: Record<string, unknown>;
};

export const analyticsService = {
  track: (payload: AnalyticsEventPayload) => apiPost("/analytics/events", payload),
  events: (limit = 100) => apiGet("/analytics/events", { limit }),
  summary: (days = 30) => apiGet("/analytics/summary", { days })
};
