import type { Request, Response } from "express";
import { env, isProduction } from "../config/env.js";
import { authService } from "../services/auth.service.js";
import { created, ok } from "../utils/http.js";
import { logAuditEvent } from "../utils/audit.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: isProduction,
  path: "/api/v1/auth"
};

function sessionContext(req: Request) {
  return {
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip
  };
}

export const authController = {
  register: async (req: Request, res: Response) => {
    const result = await authService.register(req.body, sessionContext(req));
    req.user = result.user;
    logAuditEvent(req, "create", "users", result.user.id, { event: "register" });
    res.cookie("refreshToken", result.refreshToken, cookieOptions);
    return created(res, result, "Account created");
  },
  login: async (req: Request, res: Response) => {
    const result = await authService.login(req.body, sessionContext(req));
    req.user = result.user;
    logAuditEvent(req, "login", "auth", result.user.id);
    res.cookie("refreshToken", result.refreshToken, cookieOptions);
    return ok(res, result, "Logged in");
  },
  refresh: async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken ?? req.cookies.refreshToken;
    const result = await authService.refresh(refreshToken, sessionContext(req));
    req.user = result.user;
    logAuditEvent(req, "refresh", "auth", result.user.id);
    res.cookie("refreshToken", result.refreshToken, cookieOptions);
    return ok(res, result, "Token refreshed");
  },
  logout: async (req: Request, res: Response) => {
    await authService.logout(req.body.refreshToken ?? req.cookies.refreshToken);
    logAuditEvent(req, "logout", "auth");
    res.clearCookie("refreshToken", { ...cookieOptions, secure: env.NODE_ENV === "production" });
    return ok(res, { loggedOut: true }, "Logged out");
  },
  me: async (req: Request, res: Response) => {
    const user = await authService.me(String(req.user?.id));
    return ok(res, user, "Current user loaded");
  }
};
