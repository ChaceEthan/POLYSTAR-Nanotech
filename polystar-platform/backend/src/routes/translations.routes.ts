import { Router } from "express";
import { translationsController } from "../controllers/translations.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.js";
import { translationBodySchema, translationDeleteParamsSchema } from "../validators/entity.validator.js";

export const translationsRoutes = Router();

translationsRoutes.get("/public/:locale", translationsController.byLocale);
translationsRoutes.use(authenticate, authorize("super_admin", "owner", "partner", "admin", "editor", "translations:read"));
translationsRoutes.get("/", translationsController.list);
translationsRoutes.post("/", authorize("super_admin", "owner", "partner", "admin", "editor", "translations:write"), validate({ body: translationBodySchema }), translationsController.upsert);
translationsRoutes.delete(
  "/:locale/:namespace/:key",
  authorize("super_admin", "owner", "partner", "admin", "translations:delete"),
  validate({ params: translationDeleteParamsSchema }),
  translationsController.delete
);
