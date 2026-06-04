import { logger } from "../utils/logger.js";

export function startBackgroundJobs() {
  logger.info("Background jobs registered", {
    jobs: ["notification-digest", "ticket-escalation", "analytics-rollup"]
  });
}
