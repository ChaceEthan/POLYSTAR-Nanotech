import type { Response } from "express";

export function ok<T>(res: Response, data: T, message = "OK", status = 200, meta?: Record<string, unknown>) {
  return res.status(status).json({ success: true, data, message, meta });
}

export function created<T>(res: Response, data: T, message = "Created") {
  return ok(res, data, message, 201);
}
