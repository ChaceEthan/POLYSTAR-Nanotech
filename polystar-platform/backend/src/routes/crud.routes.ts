import { Router, type Request } from "express";
import type { GenericCrudService } from "../services/generic.service.js";
import { createCrudController } from "../controllers/generic.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.js";
import { entityBodySchema, listQuerySchema, objectIdSchema } from "../validators/entity.validator.js";

type CrudRouteOptions = {
  publicRead?: boolean;
  slugRoute?: boolean;
  readRoles?: string[];
  readPermissions?: string[];
  readFilter?: (req: Request) => Record<string, any>;
};

export function crudRoutes(service: GenericCrudService<any>, options: CrudRouteOptions = {}) {
  const router = Router();
  const controller = createCrudController(service, { readFilter: options.readFilter });
  const writeGuard = [authenticate, authorize("super_admin", "admin", "editor", "content:write")];

  const readGuard = options.publicRead
    ? []
    : [
        authenticate,
        authorize(
          "super_admin",
          "admin",
          "editor",
          ...(options.readRoles ?? []),
          `${service.resourceName}:read`,
          ...(options.readPermissions ?? [])
        )
      ];

  router.get("/", ...readGuard, validate({ query: listQuerySchema }), controller.list);
  if (options.slugRoute) router.get("/:slug", ...readGuard, controller.getBySlug);
  router.get("/:id", ...readGuard, validate({ params: objectIdSchema }), controller.get);
  router.post("/", ...writeGuard, validate({ body: entityBodySchema }), controller.create);
  router.put("/:id", ...writeGuard, validate({ params: objectIdSchema, body: entityBodySchema }), controller.update);
  router.delete("/:id", ...writeGuard, validate({ params: objectIdSchema }), controller.delete);

  return router;
}
