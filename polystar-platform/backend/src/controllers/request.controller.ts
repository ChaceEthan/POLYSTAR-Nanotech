import type { Request, Response } from "express";
import { env } from "../config/env.js";
import { emailService } from "../services/email.service.js";
import { services } from "../services/index.js";
import { ok } from "../utils/http.js";
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
    const result = await emailService.send({
      to: env.ADMIN_NOTIFICATION_EMAIL,
      subject: `[POLYSTAR] New ${requestLabels[type]} from ${payload.name}`,
      ...body
    });

    return {
      status: result.configured ? "sent" : "queued",
      configured: result.configured,
      to: env.ADMIN_NOTIFICATION_EMAIL,
      provider: result.provider,
      messageId: result.messageId
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error("Public request notification email failed", {
      type,
      error: message
    });

    return {
      status: "failed",
      configured: true,
      to: env.ADMIN_NOTIFICATION_EMAIL,
      provider: "smtp",
      error: message
    };
  }
}

async function createPublicRequest(
  req: Request,
  res: Response,
  type: PublicRequestType,
  service: typeof services.contacts,
  resourceName: string,
  successMessage: string
) {
  const payload = sanitizePublicRequest(req.body, type);
  const createdRecord = await service.create({
    ...payload,
    metadata: {
      ...payload.metadata,
      notification: {
        email: {
          status: "pending",
          to: env.ADMIN_NOTIFICATION_EMAIL,
          provider: "smtp"
        }
      }
    }
  });
  const id = String((createdRecord as any)._id ?? (createdRecord as any).id);
  const notification = await notifyPublicRequest(type, payload);
  let responseRecord = createdRecord;

  try {
    responseRecord = await service.update(id, {
      metadata: {
        ...((createdRecord as any).metadata ?? {}),
        notification: {
          email: notification
        }
      }
    });
  } catch (error) {
    logger.error("Unable to persist public request notification status", {
      type,
      resourceName,
      id,
      error: error instanceof Error ? error.message : String(error)
    });
  }

  logAuditEvent(req, "create", resourceName, id);

  const message =
    notification.status === "failed"
      ? `${successMessage} The request was saved, but the admin email notification failed and has been logged.`
      : successMessage;

  return ok(res, responseRecord, message, 201, { notification });
}

export const requestController = {
  contact: (req: Request, res: Response) => createPublicRequest(req, res, "contact", services.contacts, "contacts", "Request submitted successfully."),
  quotation: (req: Request, res: Response) =>
    createPublicRequest(req, res, "quotation", services.quotations, "quotations", "Quotation submitted successfully."),
  consultation: (req: Request, res: Response) =>
    createPublicRequest(req, res, "consultation", services.consultations, "consultations", "Consultation submitted successfully."),
  siteVisit: (req: Request, res: Response) =>
    createPublicRequest(req, res, "siteVisit", services.site_visits, "site_visits", "Site visit submitted successfully.")
};
