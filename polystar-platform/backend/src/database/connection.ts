import dns from "node:dns";
import mongoose from "mongoose";
import { setTimeout as delay } from "node:timers/promises";
import { env } from "../config/env.js";
import { modelRegistry } from "../models/index.js";
import { logger } from "../utils/logger.js";

const DEFAULT_MONGODB_DNS_SERVERS = ["8.8.8.8", "1.1.1.1"];

const readyStateLabels: Record<number, "disconnected" | "connected" | "connecting" | "disconnecting"> = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting"
};

type DatabaseDiagnostic = {
  name?: string;
  host?: string;
  readyState: number;
  lastError?: {
    name: string;
    message: string;
    attempt?: number;
    timestamp: string;
  };
  indexesInitialized: boolean;
};

let indexesInitialized = false;
let lastError: DatabaseDiagnostic["lastError"];
let mongoSrvResolverPrepared = false;

mongoose.connection.on("connected", () => {
  lastError = undefined;
  logger.info("MongoDB connection established", {
    database: mongoose.connection.name,
    host: mongoose.connection.host
  });
});

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB connection disconnected");
});

mongoose.connection.on("error", (error) => {
  lastError = {
    name: error.name,
    message: error.message,
    timestamp: new Date().toISOString()
  };
  logger.error("MongoDB connection error", { error: lastError });
});

async function initializeIndexes() {
  if (indexesInitialized) return;

  const models = Object.values(modelRegistry);
  await Promise.all(models.map((model) => model.init()));
  indexesInitialized = true;

  logger.info("MongoDB model indexes verified", {
    modelCount: models.length
  });
}

function getMongoSrvRecordName() {
  const match = env.MONGODB_URI.match(/^mongodb\+srv:\/\/(?:[^@]+@)?([^/?]+)/);
  return match ? `_mongodb._tcp.${match[1]}` : undefined;
}

function getMongoDnsFallbackServers() {
  return (env.MONGODB_DNS_SERVERS ?? DEFAULT_MONGODB_DNS_SERVERS.join(","))
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);
}

function getDnsError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }

  return { name: "DnsResolutionError", message: String(error) };
}

async function prepareMongoSrvResolver() {
  if (mongoSrvResolverPrepared) return;
  mongoSrvResolverPrepared = true;

  const srvRecord = getMongoSrvRecordName();
  if (!srvRecord) return;

  try {
    await dns.promises.resolveSrv(srvRecord);
    return;
  } catch (error) {
    const fallbackServers = getMongoDnsFallbackServers();
    if (fallbackServers.length === 0) {
      logger.warn("MongoDB SRV lookup failed and no fallback DNS servers are configured", {
        srvRecord,
        error: getDnsError(error)
      });
      return;
    }

    const previousServers = dns.getServers();

    try {
      dns.setServers(fallbackServers);
      await dns.promises.resolveSrv(srvRecord);
      logger.warn("Default DNS resolver failed for MongoDB SRV lookup; using fallback DNS servers", {
        srvRecord,
        previousServers,
        fallbackServers,
        error: getDnsError(error)
      });
    } catch (fallbackError) {
      dns.setServers(previousServers);
      logger.warn("Fallback DNS servers failed for MongoDB SRV lookup", {
        srvRecord,
        previousServers,
        fallbackServers,
        error: getDnsError(fallbackError)
      });
    }
  }
}

export function getDatabaseHealth() {
  const readyState = mongoose.connection.readyState;
  const database = readyStateLabels[readyState] ?? "disconnected";
  const diagnostics: DatabaseDiagnostic = {
    name: mongoose.connection.name,
    host: mongoose.connection.host,
    readyState,
    lastError,
    indexesInitialized
  };

  return {
    database,
    diagnostics
  };
}

type ConnectOptions = {
  retries?: number;
  retryDelayMs?: number;
  failOnError?: boolean;
};

export async function connectDatabase({ retries = 3, retryDelayMs = 2000, failOnError = false }: ConnectOptions = {}) {
  mongoose.set("strictQuery", true);
  await prepareMongoSrvResolver();

  if (mongoose.connection.readyState === 1) {
    await initializeIndexes();
    return getDatabaseHealth();
  }

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      logger.info("Connecting to MongoDB Atlas", { attempt, retries });
      await mongoose.connect(env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 10
      });
      await initializeIndexes();
      return getDatabaseHealth();
    } catch (error) {
      lastError = {
        name: error instanceof Error ? error.name : "MongoConnectionError",
        message: error instanceof Error ? error.message : String(error),
        attempt,
        timestamp: new Date().toISOString()
      };

      logger.error("MongoDB connection attempt failed", { error: lastError });

      if (attempt < retries) {
        await delay(retryDelayMs);
      }
    }
  }

  if (failOnError) {
    throw new Error(lastError?.message ?? "MongoDB connection failed");
  }

  logger.warn("MongoDB is unavailable after retry attempts; backend will expose diagnostics on /api/v1/health");
  return getDatabaseHealth();
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
