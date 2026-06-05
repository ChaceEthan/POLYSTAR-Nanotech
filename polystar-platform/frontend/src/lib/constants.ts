import { COMPANY, SUPPORTED_LANGUAGES } from "@polystar/shared";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is required.");
}

export const siteConfig = {
  ...COMPANY,
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+250781990307",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "info@polystar.rw",
  location: process.env.NEXT_PUBLIC_COMPANY_LOCATION ?? "Kigali,Rwanda",
  qrCompanyProfileUrl:
    process.env.NEXT_PUBLIC_QR_COMPANY_PROFILE_URL ?? "https://www.polystar.rw/company-profile",
  description:
    "Industrial automation, embedded systems, smart infrastructure, software development, consulting, training, and research solutions from Kigali, Rwanda.",
  apiBaseUrl,
  languages: SUPPORTED_LANGUAGES
};

export const brandColors = {
  primary: "#0A2E5D",
  secondary: "#00AEEF",
  accent: "#00C853",
  dark: "#0B0F19",
  light: "#F8FAFC"
};
