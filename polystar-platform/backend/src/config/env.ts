import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const configDir = dirname(fileURLToPath(import.meta.url));
const backendRoot = resolve(configDir, "../..");
const workspaceRoot = resolve(backendRoot, "..");

if (process.env.DOTENV_CONFIG_PATH) dotenv.config({ path: process.env.DOTENV_CONFIG_PATH, quiet: true });
dotenv.config({ path: resolve(backendRoot, ".env"), quiet: true });
dotenv.config({ path: resolve(workspaceRoot, ".env"), quiet: true });
dotenv.config({ quiet: true });

const rawEnv = {
  ...process.env,
  APP_URL: process.env.APP_URL ?? process.env.FRONTEND_URL ?? process.env.CLIENT_URL ?? "http://localhost:3000",
  API_URL: process.env.API_URL ?? `http://localhost:${process.env.PORT ?? 5000}`,
  CLIENT_URL: process.env.CLIENT_URL ?? process.env.CORS_ORIGIN ?? process.env.FRONTEND_URL ?? process.env.APP_URL ?? "http://localhost:3000",
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? process.env.CLIENT_URL ?? process.env.FRONTEND_URL ?? process.env.APP_URL ?? "http://localhost:3000",
  FRONTEND_URL: process.env.FRONTEND_URL ?? process.env.CORS_ORIGIN ?? process.env.CLIENT_URL ?? process.env.APP_URL ?? "http://localhost:3000",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN ?? process.env.JWT_EXPIRES_IN ?? "7d",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? "30d"
};

const envBoolean = (defaultValue: boolean) =>
  z.preprocess((value) => {
    if (typeof value === "string") return value.toLowerCase() === "true";
    return value;
  }, z.boolean().default(defaultValue));

const envSchema = z.object({
  APP_NAME: z.string().default("POLYSTAR Platform"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(5000),
  APP_URL: z.string().url().default("http://localhost:3000"),
  API_URL: z.string().url().default("http://localhost:5000"),
  CLIENT_URL: z.string().url().default("http://localhost:3000"),
  CORS_ORIGIN: z.string().url().default("http://localhost:3000"),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  COMPANY_NAME: z.string().default("POLYSTAR Nanotech Ltd"),
  COMPANY_PHONE: z.string().default("+250781990307"),
  COMPANY_EMAIL: z.string().email().default("info@polystar.rw"),
  COMPANY_LOCATION: z.string().default("Kigali,Rwanda"),
  MANAGING_DIRECTOR: z.string().default("Eng. Amani Niyoyita"),
  ADMIN_EMAIL: z.string().email().default("amanipolystar@gmail.com"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  MONGODB_DNS_SERVERS: z.string().optional(),
  JWT_ACCESS_SECRET: z.string().min(24, "JWT_ACCESS_SECRET must be at least 24 characters"),
  JWT_REFRESH_SECRET: z.string().min(24, "JWT_REFRESH_SECRET must be at least 24 characters"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("7d"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),
  MAIL_FROM: z.string().email().default("info@polystar.rw"),
  CAREERS_EMAIL: z.string().email().default("careers@polystar.rw"),
  ADMIN_NOTIFICATION_EMAIL: z.string().email().default("amanipolystar@gmail.com"),
  SMTP_HOST: z.string().default("mail.polystar.rw"),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_SECURE: envBoolean(true),
  SMTP_USER: z.string().default("info@polystar.rw"),
  SMTP_PASS: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  GOOGLE_MAPS_API_KEY: z.string().optional(),
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  GOOGLE_RECAPTCHA_SITE_KEY: z.string().optional(),
  GOOGLE_RECAPTCHA_SECRET_KEY: z.string().optional(),
  GOOGLE_SEARCH_CONSOLE_VERIFICATION: z.string().optional(),
  QR_COMPANY_PROFILE_URL: z.string().url().default("https://www.polystar.rw/company-profile"),
  LOG_LEVEL: z.string().default("info")
});

export const env = envSchema.parse(rawEnv);

export const isProduction = env.NODE_ENV === "production";
