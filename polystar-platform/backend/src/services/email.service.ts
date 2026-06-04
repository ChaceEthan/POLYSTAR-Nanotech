import { mailConfig } from "../config/mail.js";
import { logger } from "../utils/logger.js";

type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export class EmailService {
  async send(message: EmailMessage) {
    if (!mailConfig.smtp.pass) {
      logger.warn("SMTP password is not configured. Email queued for provider integration.", {
        to: message.to,
        subject: message.subject
      });

      return { queued: true, provider: "smtp", configured: false };
    }

    logger.info("Email provider ready", {
      host: mailConfig.smtp.host,
      port: mailConfig.smtp.port,
      secure: mailConfig.smtp.secure,
      to: message.to,
      subject: message.subject
    });

    return { queued: true, provider: "smtp", configured: true };
  }
}

export const emailService = new EmailService();
