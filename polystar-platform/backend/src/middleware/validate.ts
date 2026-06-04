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
      schema.parse({ body: req.body, params: req.params, query: req.query });
    } else {
      schema.body?.parse(req.body);
      schema.params?.parse(req.params);
      schema.query?.parse(req.query);
    }
    next();
  };
}
