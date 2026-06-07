import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type ValidationSchema = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export function validate(schema: ValidationSchema | ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if ("safeParse" in schema) {
      const result = schema.parse({ body: req.body, params: req.params, query: req.query }) as {
        body?: unknown;
        params?: unknown;
        query?: unknown;
      };

      if (result.body) req.body = result.body;
      if (result.params) req.params = result.params as Request["params"];
      if (result.query) req.query = result.query as Request["query"];
    } else {
      if (schema.body) req.body = schema.body.parse(req.body);
      if (schema.params) req.params = schema.params.parse(req.params) as Request["params"];
      if (schema.query) req.query = schema.query.parse(req.query) as Request["query"];
    }
    next();
  };
}
