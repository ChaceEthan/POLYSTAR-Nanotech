import type { NextFunction, Request, Response } from "express";
import { AppError } from "./error.js";

export function authorize(...allowed: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next(new AppError("Authentication required", 401, "AUTH_REQUIRED"));

    const isAllowed =
      user.permissions.includes("*") ||
      allowed.includes(user.role) ||
      allowed.some((permission) => user.permissions.includes(permission));

    if (!isAllowed) {
      return next(new AppError("Insufficient permissions", 403, "FORBIDDEN"));
    }

    next();
  };
}
