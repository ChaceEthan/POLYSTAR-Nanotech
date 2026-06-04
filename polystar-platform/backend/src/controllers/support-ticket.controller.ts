import type { Request, Response } from "express";
import { SupportTicketModel, TicketMessageModel } from "../models/index.js";
import { created, ok } from "../utils/http.js";
import { AppError } from "../middleware/error.js";
import { logAuditEvent } from "../utils/audit.js";

const staffRoles = new Set(["super_admin", "admin", "editor"]);
const ticketSortFields = new Set(["createdAt", "updatedAt", "priority", "status", "subject"]);

function isStaff(req: Request) {
  return Boolean(req.user?.permissions.includes("*") || (req.user?.role && staffRoles.has(req.user.role)));
}

function canAccessTicket(req: Request, ticket: any) {
  return isStaff(req) || String(ticket.requester) === req.user?.id;
}

function assertTicketAccess(req: Request, ticket: any) {
  if (!canAccessTicket(req, ticket)) {
    throw new AppError("Insufficient permissions", 403, "FORBIDDEN");
  }
}

export const supportTicketController = {
  list: async (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit ?? 20), 1), 100);
    const filter: Record<string, unknown> = isStaff(req) ? {} : { requester: req.user?.id };
    const sortBy = ticketSortFields.has(String(req.query.sortBy)) ? String(req.query.sortBy) : "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    if (req.query.status) filter.status = String(req.query.status);

    const [tickets, total] = await Promise.all([
      SupportTicketModel.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      SupportTicketModel.countDocuments(filter)
    ]);

    return ok(res, tickets, "Tickets loaded", 200, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    });
  },
  create: async (req: Request, res: Response) => {
    const ticket = await SupportTicketModel.create({
      ...req.body,
      requester: req.user?.id
    });
    logAuditEvent(req, "create", "support_tickets", String(ticket._id));
    return created(res, ticket, "Ticket created");
  },
  get: async (req: Request, res: Response) => {
    const ticket = await SupportTicketModel.findById(req.params.id).lean();
    if (!ticket) throw new AppError("Ticket not found", 404, "TICKET_NOT_FOUND");
    assertTicketAccess(req, ticket);
    const messages = await TicketMessageModel.find({ ticket: req.params.id }).sort({ createdAt: 1 }).lean();
    return ok(res, { ticket, messages }, "Ticket loaded");
  },
  update: async (req: Request, res: Response) => {
    const ticket = await SupportTicketModel.findById(req.params.id);
    if (!ticket) throw new AppError("Ticket not found", 404, "TICKET_NOT_FOUND");
    assertTicketAccess(req, ticket);

    const allowedClientFields = ["subject", "message", "attachments", "metadata"];
    const payload = isStaff(req)
      ? req.body
      : Object.fromEntries(Object.entries(req.body).filter(([key]) => allowedClientFields.includes(key)));

    Object.assign(ticket, payload);
    await ticket.save();
    logAuditEvent(req, "update", "support_tickets", String(ticket._id));

    return ok(res, ticket.toObject(), "Ticket updated");
  },
  delete: async (req: Request, res: Response) => {
    const ticket = await SupportTicketModel.findById(req.params.id);
    if (!ticket) throw new AppError("Ticket not found", 404, "TICKET_NOT_FOUND");
    assertTicketAccess(req, ticket);

    await TicketMessageModel.deleteMany({ ticket: req.params.id });
    await ticket.deleteOne();
    logAuditEvent(req, "delete", "support_tickets", String(req.params.id));

    return ok(res, { id: req.params.id }, "Ticket deleted");
  },
  reply: async (req: Request, res: Response) => {
    const ticket = await SupportTicketModel.findById(req.params.id);
    if (!ticket) throw new AppError("Ticket not found", 404, "TICKET_NOT_FOUND");
    assertTicketAccess(req, ticket);
    const message = await TicketMessageModel.create({
      ticket: req.params.id,
      author: req.user?.id,
      message: req.body.message,
      attachments: req.body.attachments ?? []
    });
    ticket.status = "pending";
    await ticket.save();
    logAuditEvent(req, "create", "ticket_messages", String(message._id), { ticket: String(ticket._id) });
    return created(res, message, "Reply added");
  },
  close: async (req: Request, res: Response) => {
    const currentTicket = await SupportTicketModel.findById(req.params.id);
    if (!currentTicket) throw new AppError("Ticket not found", 404, "TICKET_NOT_FOUND");
    assertTicketAccess(req, currentTicket);

    const ticket = await SupportTicketModel.findByIdAndUpdate(req.params.id, { status: "closed" }, { new: true }).lean();
    if (!ticket) throw new AppError("Ticket not found", 404, "TICKET_NOT_FOUND");
    logAuditEvent(req, "update", "support_tickets", String(req.params.id), { status: "closed" });
    return ok(res, ticket, "Ticket closed");
  }
};
