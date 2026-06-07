import nodemailer, { type Transporter } from "nodemailer";
import { mailConfig } from "../config/mail.js";
import { logger } from "../utils/logger.js";

type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export class EmailService {
  private transporter?: Transporter;

  private getTransporter() {
    if (this.transporter) return this.transporter;

    this.transporter = nodemailer.createTransport({
      host: mailConfig.smtp.host,
      port: mailConfig.smtp.port,
      secure: mailConfig.smtp.secure,
      auth: {
        user: mailConfig.smtp.user,
        pass: mailConfig.smtp.pass
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });

    return this.transporter;
  }

  async send(message: EmailMessage) {
    if (!mailConfig.smtp.pass) {
      logger.warn("SMTP password is not configured. Email queued for provider integration.", {
        to: message.to,
        subject: message.subject
      });

      return { queued: true, provider: "smtp", configured: false };
    }

    const response = await this.getTransporter().sendMail({
      from: mailConfig.from,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html
    });

    logger.info("Email sent", {
      host: mailConfig.smtp.host,
      port: mailConfig.smtp.port,
      secure: mailConfig.smtp.secure,
      to: message.to,
      subject: message.subject,
      messageId: response.messageId
    });

    return { queued: false, provider: "smtp", configured: true, messageId: response.messageId };
  }
}

export const emailService = new EmailService();
