import type { Request, Response } from "express";
import { uploadBuffer } from "../services/upload.service.js";
import { AppError } from "../middleware/error.js";
import { created } from "../utils/http.js";
import { logAuditEvent } from "../utils/audit.js";

export const uploadController = {
  uploadFile: async (req: Request, res: Response) => {
    if (!req.file) throw new AppError("A file field named 'file' is required", 400, "FILE_REQUIRED");

    const folder = String(req.body.folder ?? "polystar-platform");
    const result = await uploadBuffer(req.file.buffer, folder);
    logAuditEvent(req, "create", "uploads", (result as any).public_id, { folder, mimetype: req.file.mimetype, size: req.file.size });

    return created(res, result, "File uploaded");
  }
};
