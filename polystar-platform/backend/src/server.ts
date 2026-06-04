import http from "node:http";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./database/connection.js";
import { startBackgroundJobs } from "./jobs/index.js";
import { attachSockets } from "./sockets/index.js";
import { logger } from "./utils/logger.js";
import { validateStartupEnvironment } from "./config/startup-validation.js";

async function bootstrap() {
  validateStartupEnvironment();
  await connectDatabase();

  const app = createApp();
  const server = http.createServer(app);
  attachSockets(server);
  startBackgroundJobs();

  server.listen(env.PORT, () => {
    logger.info(`POLYSTAR backend listening on port ${env.PORT}`);
  });

  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Shutting down.`);
    server.close(() => process.exit(0));
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

bootstrap().catch((error) => {
  logger.error("Backend startup failed", error);
  process.exit(1);
});
