import type { Request, Response } from "express";
import { services } from "../services/index.js";
import { created } from "../utils/http.js";
import { logAuditEvent } from "../utils/audit.js";

export const requestController = {
  contact: async (req: Request, res: Response) => {
    const contact = await services.contacts.create(req.body);
    logAuditEvent(req, "create", "contacts", String((contact as any)._id ?? (contact as any).id));
    return created(res, contact, "Request submitted successfully.");
  },
  quotation: async (req: Request, res: Response) => {
    const quotation = await services.quotations.create(req.body);
    logAuditEvent(req, "create", "quotations", String((quotation as any)._id ?? (quotation as any).id));
    return created(res, quotation, "Quotation submitted successfully.");
  },
  consultation: async (req: Request, res: Response) => {
    const consultation = await services.consultations.create(req.body);
    logAuditEvent(req, "create", "consultations", String((consultation as any)._id ?? (consultation as any).id));
    return created(res, consultation, "Consultation submitted successfully.");
  },
  siteVisit: async (req: Request, res: Response) => {
    const siteVisit = await services.site_visits.create(req.body);
    logAuditEvent(req, "create", "site_visits", String((siteVisit as any)._id ?? (siteVisit as any).id));
    return created(res, siteVisit, "Site visit submitted successfully.");
  }
};
