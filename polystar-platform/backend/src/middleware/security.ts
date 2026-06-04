import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env, isProduction } from "../config/env.js";
import { logger } from "../utils/logger.js";

export function applySecurityMiddleware(app: Express) {
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
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
