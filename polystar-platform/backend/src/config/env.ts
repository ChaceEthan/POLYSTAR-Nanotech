import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const DEFAULT_SITE_URL = "https://www.polystar.rw";
const DEFAULT_API_ORIGIN = "http://localhost:5000";

const configDir = dirname(fileURLToPath(import.meta.url));
const backendRoot = resolve(configDir, "../..");
const workspaceRoot = resolve(backendRoot, "..");

if (process.env.DOTENV_CONFIG_PATH) dotenv.config({ path: process.env.DOTENV_CONFIG_PATH, quiet: true });
dotenv.config({ path: resolve(backendRoot, ".env"), quiet: true });
dotenv.config({ path: resolve(workspaceRoot, ".env"), quiet: true });
dotenv.config({ quiet: true });

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);
const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");
const stripApiVersion = (value: string) => stripTrailingSlash(value).replace(/\/api\/v1$/i, "");

const frontendUrl =
  process.env.FRONTEND_URL ??
  process.env.CLIENT_URL ??
  process.env.CORS_ORIGIN?.split(",")[0]?.trim() ??
  process.env.APP_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  DEFAULT_SITE_URL;

const apiOrigin =
  process.env.API_URL ??
  (process.env.NEXT_PUBLIC_API_URL ? stripApiVersion(process.env.NEXT_PUBLIC_API_URL) : undefined) ??
  DEFAULT_API_ORIGIN;

const rawEnv = {
  ...process.env,
  APP_URL: stripTrailingSlash(process.env.APP_URL ?? frontendUrl),
  API_URL: stripTrailingSlash(apiOrigin),
  CLIENT_URL: stripTrailingSlash(process.env.CLIENT_URL ?? frontendUrl),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? process.env.CLIENT_URL ?? frontendUrl,
  FRONTEND_URL: stripTrailingSlash(process.env.FRONTEND_URL ?? frontendUrl),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN ?? process.env.JWT_EXPIRES_IN ?? "7d",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? "30d"
};

const envBoolean = (defaultValue: boolean) =>
  z.preprocess((value) => {
    if (typeof value === "string") return value.toLowerCase() === "true";
    return value;
  }, z.boolean().default(defaultValue));

const optionalString = z.preprocess(emptyToUndefined, z.string().optional());
const optionalEmail = z.preprocess(emptyToUndefined, z.string().email().optional());

const envSchema = z.object({
  APP_NAME: z.string().default("POLYSTAR Platform"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(5000),
  APP_URL: z.string().url().default(DEFAULT_SITE_URL),
  API_URL: z.string().url().default(DEFAULT_API_ORIGIN),
  CLIENT_URL: z.string().url().default(DEFAULT_SITE_URL),
  CORS_ORIGIN: z.string().min(1).default(DEFAULT_SITE_URL),
  FRONTEND_URL: z.string().url().default(DEFAULT_SITE_URL),
  COMPANY_NAME: z.string().default("POLYSTAR Nanotech Ltd"),
  COMPANY_PHONE: z.string().default("+250781990307"),
  COMPANY_EMAIL: z.string().email().default("info@polystar.rw"),
  COMPANY_LOCATION: z.string().default("Kigali,Rwanda"),
  MANAGING_DIRECTOR: z.string().default("Eng. Amani Niyoyita"),
  ADMIN_EMAIL: z.string().email().default("amanipolystar@gmail.com"),
  MONGODB_URI: optionalString,
  MONGODB_DNS_SERVERS: optionalString,
  JWT_ACCESS_SECRET: optionalString,
  JWT_REFRESH_SECRET: optionalString,
  JWT_ACCESS_EXPIRES_IN: z.string().default("7d"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),
  MAIL_FROM: z.string().email().default("info@polystar.rw"),
  CAREERS_EMAIL: z.string().email().default("careers@polystar.rw"),
  ADMIN_NOTIFICATION_EMAIL: z.string().email().default("amanipolystar@gmail.com"),
  SMTP_HOST: z.string().default("mail.polystar.rw"),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_SECURE: envBoolean(true),
  SMTP_USER: z.string().default("info@polystar.rw"),
  SMTP_PASS: optionalString,
  CLOUDINARY_CLOUD_NAME: optionalString,
  CLOUDINARY_API_KEY: optionalString,
  CLOUDINARY_API_SECRET: optionalString,
  QR_COMPANY_PROFILE_URL: z.string().url().default("https://www.polystar.rw/company-profile"),
  ADMIN_SEED_NAME: optionalString,
  ADMIN_SEED_EMAIL: optionalEmail,
  ADMIN_SEED_PASSWORD: optionalString,
  OWNER_SEED_NAME: optionalString,
  OWNER_SEED_EMAIL: optionalEmail,
  OWNER_SEED_PASSWORD: optionalString,
  PARTNER_SEED_NAME: optionalString,
  PARTNER_SEED_EMAIL: optionalEmail,
  PARTNER_SEED_PASSWORD: optionalString,
  LOG_LEVEL: z.string().default("info")
});

export const env = envSchema.parse(rawEnv);

export const isProduction = env.NODE_ENV === "production";
