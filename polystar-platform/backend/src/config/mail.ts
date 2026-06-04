import { env } from "./env.js";

export const mailConfig = {
  from: env.MAIL_FROM,
  careersEmail: env.CAREERS_EMAIL,
  adminNotificationEmail: env.ADMIN_NOTIFICATION_EMAIL,
  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS
  }
};
