import { Router } from "express";
import { analyticsController } from "../controllers/analytics.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.js";
import { analyticsEventSchema } from "../validators/entity.validator.js";

export const analyticsRoutes = Router();

analyticsRoutes.post("/events", validate({ body: analyticsEventSchema }), analyticsController.track);
analyticsRoutes.get("/events", authenticate, authorize("super_admin", "admin", "analytics:read"), analyticsController.list);
analyticsRoutes.get("/summary", authenticate, authorize("super_admin", "admin", "analytics:read"), analyticsController.summary);
