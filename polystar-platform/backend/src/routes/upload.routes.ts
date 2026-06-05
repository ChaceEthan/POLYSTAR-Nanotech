import { Router } from "express";
import { uploadController } from "../controllers/upload.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { upload } from "../uploads/index.js";

export const uploadRoutes = Router();

uploadRoutes.post(
  "/",
  authenticate,
  authorize("super_admin", "admin", "editor", "partner", "client", "uploads:write"),
  upload.single("file"),
  uploadController.uploadFile
);
