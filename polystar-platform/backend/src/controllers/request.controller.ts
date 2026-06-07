import type { Request, Response } from "express";
import { env } from "../config/env.js";
import { emailService } from "../services/email.service.js";
import { services } from "../services/index.js";
import { created } from "../utils/http.js";
import { logAuditEvent } from "../utils/audit.js";
import { logger } from "../utils/logger.js";

type PublicRequestType = "contact" | "quotation" | "consultation" | "siteVisit";

const requestLabels: Record<PublicRequestType, string> = {
  contact: "Contact request",
  quotation: "Quotation request",
  consultation: "Consultation request",
  siteVisit: "Site visit request"
};

function sanitizePublicRequest(payload: Record<string, any>, requestType: PublicRequestType) {
  const { companyWebsite: _companyWebsite, ...requestPayload } = payload;

  return {
    ...requestPayload,
    metadata: {
      ...(typeof payload.metadata === "object" && payload.metadata ? payload.metadata : {}),
      source: "public_website",
      requestType
    }
  };
}

function escapeHtml(value: unknown) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function requestEmailBody(type: PublicRequestType, payload: Record<string, any>) {
  const rows = [
    ["Type", requestLabels[type]],
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Company", payload.company],
    ["Subject", payload.subject],
    ["Service", payload.service],
    ["Project scope", payload.projectScope],
    ["Preferred date", payload.preferredDate instanceof Date ? payload.preferredDate.toISOString().slice(0, 10) : payload.preferredDate],
    ["Location", payload.location],
    ["Budget", payload.budget],
    ["Message", payload.message]
  ].filter(([, value]) => value !== undefined && value !== null && value !== "");

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(([label, value]) => `<tr><th align="left" style="padding:6px 12px 6px 0">${label}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`)
    .join("");

  return {
    text,
    html: `<p>A new ${requestLabels[type].toLowerCase()} was submitted from polystar.rw.</p><table>${htmlRows}</table>`
  };
}

async function notifyPublicRequest(type: PublicRequestType, payload: Record<string, any>) {
  try {
    const body = requestEmailBody(type, payload);
    await emailService.send({
      to: env.ADMIN_NOTIFICATION_EMAIL,
      subject: `[POLYSTAR] New ${requestLabels[type]} from ${payload.name}`,
      ...body
    });
  } catch (error) {
    logger.error("Public request notification email failed", {
      type,
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

export const requestController = {
  contact: async (req: Request, res: Response) => {
    const payload = sanitizePublicRequest(req.body, "contact");
    const contact = await services.contacts.create(payload);
    await notifyPublicRequest("contact", payload);
    logAuditEvent(req, "create", "contacts", String((contact as any)._id ?? (contact as any).id));
    return created(res, contact, "Request submitted successfully.");
  },
  quotation: async (req: Request, res: Response) => {
    const payload = sanitizePublicRequest(req.body, "quotation");
    const quotation = await services.quotations.create(payload);
    await notifyPublicRequest("quotation", payload);
    logAuditEvent(req, "create", "quotations", String((quotation as any)._id ?? (quotation as any).id));
    return created(res, quotation, "Quotation submitted successfully.");
  },
  consultation: async (req: Request, res: Response) => {
    const payload = sanitizePublicRequest(req.body, "consultation");
    const consultation = await services.consultations.create(payload);
    await notifyPublicRequest("consultation", payload);
    logAuditEvent(req, "create", "consultations", String((consultation as any)._id ?? (consultation as any).id));
    return created(res, consultation, "Consultation submitted successfully.");
  },
  siteVisit: async (req: Request, res: Response) => {
    const payload = sanitizePublicRequest(req.body, "siteVisit");
    const siteVisit = await services.site_visits.create(payload);
    await notifyPublicRequest("siteVisit", payload);
    logAuditEvent(req, "create", "site_visits", String((siteVisit as any)._id ?? (siteVisit as any).id));
    return created(res, siteVisit, "Site visit submitted successfully.");
  }
};
