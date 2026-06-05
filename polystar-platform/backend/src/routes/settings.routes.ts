import { Router } from "express";
import { settingsController } from "../controllers/settings.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.js";
import { settingBodySchema, settingKeySchema } from "../validators/entity.validator.js";

export const settingsRoutes = Router();

settingsRoutes.get("/public", settingsController.publicSettings);
settingsRoutes.use(authenticate, authorize("super_admin", "owner", "partner", "admin", "editor", "settings:read"));
settingsRoutes.get("/", settingsController.list);
settingsRoutes.get("/:key", validate({ params: settingKeySchema }), settingsController.get);
settingsRoutes.put("/:key", authorize("super_admin", "owner", "partner", "admin", "settings:write"), validate({ params: settingKeySchema, body: settingBodySchema }), settingsController.upsert);
settingsRoutes.delete("/:key", authorize("super_admin", "owner", "partner", "admin", "settings:delete"), validate({ params: settingKeySchema }), settingsController.delete);
