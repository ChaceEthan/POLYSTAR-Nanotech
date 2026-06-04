import { Router } from "express";
import { requestController } from "../controllers/request.controller.js";
import { validate } from "../middleware/validate.js";
import { contactSchema, requestBodySchema } from "../validators/entity.validator.js";

export const requestRoutes = Router();

requestRoutes.post("/contact", validate({ body: contactSchema }), requestController.contact);
requestRoutes.post("/quotation", validate({ body: requestBodySchema }), requestController.quotation);
requestRoutes.post("/consultation", validate({ body: requestBodySchema }), requestController.consultation);
requestRoutes.post("/site-visit", validate({ body: requestBodySchema }), requestController.siteVisit);
