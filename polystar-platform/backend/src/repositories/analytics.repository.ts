import { AnalyticsEventModel } from "../models/index.js";

export class AnalyticsRepository {
  create(payload: Record<string, unknown>) {
    return AnalyticsEventModel.create(payload);
  }

  list(limit = 100) {
    return AnalyticsEventModel.find().sort({ createdAt: -1 }).limit(limit).lean();
  }

  async summary(days = 30) {
    const since = new Date(Date.now() - days * 86_400_000);
    const [totalEvents, byEvent, topPaths] = await Promise.all([
      AnalyticsEventModel.countDocuments({ createdAt: { $gte: since } }),
      AnalyticsEventModel.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: "$event", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      AnalyticsEventModel.aggregate([
        { $match: { createdAt: { $gte: since }, path: { $exists: true, $ne: "" } } },
        { $group: { _id: "$path", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ]);

    return { days, totalEvents, byEvent, topPaths };
  }
}

export const analyticsRepository = new AnalyticsRepository();
