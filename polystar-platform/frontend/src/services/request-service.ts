import { apiPost } from "./api-client";

export type PublicRequestPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  service?: string;
  projectScope?: string;
  preferredDate?: string;
  location?: string;
  budget?: string;
  message: string;
};

export const requestService = {
  contact: (payload: PublicRequestPayload) => apiPost("/contact", payload),
  quotation: (payload: PublicRequestPayload) => apiPost("/quotation", payload),
  consultation: (payload: PublicRequestPayload) => apiPost("/consultation", payload),
  siteVisit: (payload: PublicRequestPayload) => apiPost("/site-visit", payload)
};
