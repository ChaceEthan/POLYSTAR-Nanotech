import winston from "winston";
import { isProduction } from "../config/env.js";

export const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "polystar-backend" },
  transports: [
    new winston.transports.Console({
      format: isProduction
        ? winston.format.json()
        : winston.format.combine(winston.format.colorize(), winston.format.simple())
    } as any)
  ]
});
