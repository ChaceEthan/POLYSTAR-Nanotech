import { analyticsRepository } from "../repositories/analytics.repository.js";

export class AnalyticsService {
  track(payload: Record<string, unknown>) {
    return analyticsRepository.create(payload);
  }

  list(limit?: number) {
    return analyticsRepository.list(limit);
  }

  summary(days?: number) {
    return analyticsRepository.summary(days);
  }
}

export const analyticsService = new AnalyticsService();
