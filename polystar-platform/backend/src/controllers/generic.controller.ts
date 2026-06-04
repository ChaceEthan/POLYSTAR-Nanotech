import type { Request, Response } from "express";
import type { GenericCrudService } from "../services/generic.service.js";
import { created, ok } from "../utils/http.js";
import { logAuditEvent } from "../utils/audit.js";

type CrudControllerOptions = {
  readFilter?: (req: Request) => Record<string, any>;
};

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
      const data = await service.create({
        ...req.body,
        createdBy: req.user?.id
      });
      logAuditEvent(req, "create", service.resourceName, String((data as any)._id ?? (data as any).id));
      return created(res, data);
    },
    update: async (req: Request, res: Response) => {
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
