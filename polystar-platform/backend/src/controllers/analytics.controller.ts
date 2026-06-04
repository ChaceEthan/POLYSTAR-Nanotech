import type { Request, Response } from "express";
import { analyticsService } from "../services/analytics.service.js";
import { created, ok } from "../utils/http.js";

export const analyticsController = {
  track: async (req: Request, res: Response) =>
    created(
      res,
      await analyticsService.track({
        ...req.body,
        user: req.user?.id,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"]
      }),
      "Analytics event tracked"
    ),
  list: async (req: Request, res: Response) =>
    ok(res, await analyticsService.list(Number(req.query.limit ?? 100)), "Analytics events loaded"),
  summary: async (req: Request, res: Response) =>
    ok(res, await analyticsService.summary(Number(req.query.days ?? 30)), "Analytics summary loaded")
};
