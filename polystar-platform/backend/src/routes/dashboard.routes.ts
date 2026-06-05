import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

export const dashboardRoutes = Router();

dashboardRoutes.get("/summary", authenticate, authorize("super_admin", "owner", "partner", "admin"), dashboardController.summary);
