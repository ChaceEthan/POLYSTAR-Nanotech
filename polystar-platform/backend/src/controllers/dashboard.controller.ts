import type { Request, Response } from "express";
import { getDashboardSummary } from "../services/dashboard.service.js";

export const dashboardController = {
  summary: async (_req: Request, res: Response) => {
    const summary = await getDashboardSummary();
    res.setHeader("Cache-Control", "private, max-age=30");
    return res.status(200).json(summary);
  }
};
