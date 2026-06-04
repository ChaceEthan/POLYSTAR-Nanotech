import type { Request } from "express";
import { logger } from "./logger.js";

export function logAuditEvent(
  req: Request,
  action: "create" | "update" | "delete" | "login" | "logout" | "refresh",
  resource: string,
  resourceId?: string,
  metadata: Record<string, unknown> = {}
) {
  logger.info("Audit event", {
    audit: true,
    action,
    resource,
    resourceId,
    actor: req.user
      ? {
          id: req.user.id,
          email: req.user.email,
          role: req.user.role
        }
      : undefined,
    requestId: req.requestId,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
    metadata
  });
}
