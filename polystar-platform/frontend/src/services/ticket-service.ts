import { apiGet, apiPost, apiPut } from "./api-client";

export type TicketPayload = {
  subject: string;
  message: string;
  priority?: "low" | "medium" | "high" | "critical";
  attachments?: string[];
};

export type TicketReplyPayload = {
  message: string;
  attachments?: string[];
};

export const ticketService = {
  list: () => apiGet("/tickets"),
  create: (payload: TicketPayload) => apiPost("/tickets", payload),
  get: (id: string) => apiGet(`/tickets/${id}`),
  reply: (id: string, payload: TicketReplyPayload) => apiPost(`/tickets/${id}/reply`, payload),
  close: (id: string) => apiPut(`/tickets/${id}/close`, {})
};
