import express from "express";
import { API_VERSION } from "./config/constants.js";
import { applySecurityMiddleware } from "./middleware/security.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { requestId } from "./middleware/request-id.js";
import { apiRoutes } from "./routes/index.js";

export function createApp() {
  const app = express();

  app.use(requestId);
  applySecurityMiddleware(app);
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use(API_VERSION, apiRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
