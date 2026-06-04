import type { Request, Response } from "express";
import { translationsService } from "../services/translations.service.js";
import { created, ok } from "../utils/http.js";
import { logAuditEvent } from "../utils/audit.js";

export const translationsController = {
  byLocale: async (req: Request, res: Response) =>
    ok(res, await translationsService.byLocale(String(req.params.locale), String(req.query.namespace ?? "")), "Translations loaded"),
  list: async (req: Request, res: Response) =>
    ok(res, await translationsService.list(String(req.query.locale ?? ""), String(req.query.namespace ?? "")), "Translations loaded"),
  upsert: async (req: Request, res: Response) => {
    const translation = await translationsService.upsert({
        ...req.body,
        updatedBy: req.user?.id
      });
    logAuditEvent(req, "update", "translations", `${req.body.locale}:${req.body.namespace ?? "common"}:${req.body.key}`);
    return created(res, translation, "Translation saved");
  },
  delete: async (req: Request, res: Response) => {
    const translation = await translationsService.delete(String(req.params.locale), String(req.params.namespace), String(req.params.key));
    logAuditEvent(req, "delete", "translations", `${req.params.locale}:${req.params.namespace}:${req.params.key}`);
    return ok(res, translation, "Translation deleted");
  }
};
