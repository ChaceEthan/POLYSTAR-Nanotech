import type { Request, Response } from "express";
import { settingsService } from "../services/settings.service.js";
import { ok } from "../utils/http.js";
import { logAuditEvent } from "../utils/audit.js";

export const settingsController = {
  list: async (_req: Request, res: Response) => ok(res, await settingsService.list(), "Settings loaded"),
  publicSettings: async (_req: Request, res: Response) => ok(res, await settingsService.publicSettings(), "Public settings loaded"),
  get: async (req: Request, res: Response) => ok(res, await settingsService.get(String(req.params.key)), "Setting loaded"),
  upsert: async (req: Request, res: Response) => {
    const setting = await settingsService.upsert(String(req.params.key), {
        ...req.body,
        updatedBy: req.user?.id
      });
    logAuditEvent(req, "update", "settings", String(req.params.key));
    return ok(res, setting, "Setting saved");
  },
  delete: async (req: Request, res: Response) => {
    const setting = await settingsService.delete(String(req.params.key));
    logAuditEvent(req, "delete", "settings", String(req.params.key));
    return ok(res, setting, "Setting deleted");
  }
};
