import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, refreshSchema, registerSchema } from "../validators/auth.validator.js";

export const authRoutes = Router();

authRoutes.post("/register", validate({ body: registerSchema }), authController.register);
authRoutes.post("/login", validate({ body: loginSchema }), authController.login);
authRoutes.post("/refresh", validate({ body: refreshSchema.optional() }), authController.refresh);
authRoutes.post("/logout", authController.logout);
authRoutes.get("/me", authenticate, authController.me);
