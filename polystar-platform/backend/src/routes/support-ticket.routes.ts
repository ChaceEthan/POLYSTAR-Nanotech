import { Router } from "express";
import { supportTicketController } from "../controllers/support-ticket.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { validate } from "../middleware/validate.js";
import {
  listQuerySchema,
  objectIdSchema,
  supportTicketCreateSchema,
  supportTicketUpdateSchema,
  ticketReplySchema
} from "../validators/entity.validator.js";

export const supportTicketRoutes = Router();

supportTicketRoutes.use(authenticate);
supportTicketRoutes.get("/", validate({ query: listQuerySchema }), supportTicketController.list);
supportTicketRoutes.post("/", validate({ body: supportTicketCreateSchema }), supportTicketController.create);
supportTicketRoutes.get("/:id", validate({ params: objectIdSchema }), supportTicketController.get);
supportTicketRoutes.put("/:id", validate({ params: objectIdSchema, body: supportTicketUpdateSchema }), supportTicketController.update);
supportTicketRoutes.delete("/:id", validate({ params: objectIdSchema }), supportTicketController.delete);
supportTicketRoutes.post("/:id/reply", validate({ params: objectIdSchema, body: ticketReplySchema }), supportTicketController.reply);
supportTicketRoutes.put("/:id/close", validate({ params: objectIdSchema }), supportTicketController.close);
