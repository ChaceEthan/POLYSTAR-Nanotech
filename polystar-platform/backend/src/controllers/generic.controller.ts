import type { Request, Response } from "express";
import type { GenericCrudService } from "../services/generic.service.js";
import { created, ok } from "../utils/http.js";
import { logAuditEvent } from "../utils/audit.js";
import { AppError } from "../middleware/error.js";

type CrudControllerOptions = {
  readFilter?: (req: Request) => Record<string, any>;
};

const publishingRoles = new Set(["owner", "partner", "admin", "super_admin"]);

function canChangePublishingState(req: Request) {
  return Boolean(
    req.user?.permissions.includes("*") ||
      req.user?.permissions.includes("content:publish") ||
      (req.user?.role && publishingRoles.has(req.user.role))
  );
}

function statusChanged(next: unknown, current?: unknown) {
  return typeof next === "string" && next !== current;
}

export function createCrudController(service: GenericCrudService<any>, options: CrudControllerOptions = {}) {
  const readFilter = (req: Request) => options.readFilter?.(req) ?? {};

  return {
    list: async (req: Request, res: Response) => {
      const result = await service.list({ ...(req.query as any), filter: readFilter(req) });
      return ok(res, result.items, "Resources loaded", 200, {
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: result.pages
      });
    },
    get: async (req: Request, res: Response) => {
      const data = await service.getById(String(req.params.id), readFilter(req));
      return ok(res, data);
    },
    getBySlug: async (req: Request, res: Response) => {
      const data = await service.getBySlug(String(req.params.slug), readFilter(req));
      return ok(res, data);
    },
    create: async (req: Request, res: Response) => {
      if (statusChanged(req.body.status, undefined) && req.body.status !== "draft" && !canChangePublishingState(req)) {
        throw new AppError("Publishing permission is required", 403, "PUBLISHING_PERMISSION_REQUIRED");
      }

      const data = await service.create({
        ...req.body,
        createdBy: req.user?.id
      });
      logAuditEvent(req, "create", service.resourceName, String((data as any)._id ?? (data as any).id));
      return created(res, data);
    },
    update: async (req: Request, res: Response) => {
      if ("status" in req.body) {
        const current = await service.getById(String(req.params.id));
        if (statusChanged(req.body.status, (current as any).status) && !canChangePublishingState(req)) {
          throw new AppError("Publishing permission is required", 403, "PUBLISHING_PERMISSION_REQUIRED");
        }
      }

      const data = await service.update(String(req.params.id), {
        ...req.body,
        updatedBy: req.user?.id
      });
      logAuditEvent(req, "update", service.resourceName, String(req.params.id));
      return ok(res, data, "Resource updated");
    },
    delete: async (req: Request, res: Response) => {
      const data = await service.delete(String(req.params.id));
      logAuditEvent(req, "delete", service.resourceName, String(req.params.id));
      return ok(res, data, "Resource deleted");
    }
  };
}
