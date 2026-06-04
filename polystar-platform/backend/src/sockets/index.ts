import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

export function attachSockets(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: env.FRONTEND_URL,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    logger.info("Socket connected", { socketId: socket.id });
    socket.on("disconnect", () => logger.info("Socket disconnected", { socketId: socket.id }));
  });

  return io;
}
