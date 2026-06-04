import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger.js";

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public code = "INTERNAL_ERROR",
    public details?: unknown
  ) {
    super(message);
  }
}

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404, "NOT_FOUND"));
}

export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      details: error.flatten()
    });
  }

  const appError = error instanceof AppError ? error : new AppError("Internal server error");

  logger.error(appError.message, {
    code: appError.code,
    details: appError.details,
    requestId: req.requestId,
    stack: appError.stack
  });

  return res.status(appError.statusCode).json({
    success: false,
    message: appError.message,
    code: appError.code,
    details: appError.statusCode >= 500 ? undefined : appError.details
  });
}
