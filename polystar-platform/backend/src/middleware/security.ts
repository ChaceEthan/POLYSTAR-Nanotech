import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env, isProduction } from "../config/env.js";
import { logger } from "../utils/logger.js";

const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

function configuredCorsOrigins() {
  return [env.CORS_ORIGIN, env.CLIENT_URL, env.FRONTEND_URL, env.APP_URL]
    .flatMap((value) => value.split(","))
    .map((value) => value.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}

export function applySecurityMiddleware(app: Express) {
  const allowedOrigins = new Set(configuredCorsOrigins());

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) return callback(null, true);

        const normalizedOrigin = origin.replace(/\/+$/, "");
        if (allowedOrigins.has("*") || allowedOrigins.has(normalizedOrigin) || (!isProduction && localhostPattern.test(normalizedOrigin))) {
          return callback(null, true);
        }

        logger.warn("Blocked CORS origin", { origin });
        return callback(null, false);
      },
      credentials: true
    })
  );
  app.use(cookieParser());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: isProduction ? 300 : 1000,
      standardHeaders: "draft-8",
      legacyHeaders: false
    })
  );
  app.use(
    morgan(isProduction ? "combined" : "dev", {
      stream: {
        write: (message) => logger.info(message.trim())
      }
    })
  );
}
