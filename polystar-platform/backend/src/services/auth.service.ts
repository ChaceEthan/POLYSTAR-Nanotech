import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
import type { AuthUser } from "@polystar/shared";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../auth/jwt.js";
import { RefreshTokenModel, UserModel } from "../models/index.js";
import { env } from "../config/env.js";
import { AppError } from "../middleware/error.js";

function toAuthUser(user: any): AuthUser {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions ?? []
  };
}

type SessionContext = {
  userAgent?: string;
  ipAddress?: string;
};

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function expiryFromDuration(duration: string) {
  const match = /^(\d+)([smhd])$/.exec(duration.trim());
  const value = match ? Number(match[1]) : 30;
  const unit = match?.[2] ?? "d";
  const multiplier = unit === "s" ? 1000 : unit === "m" ? 60_000 : unit === "h" ? 3_600_000 : 86_400_000;
  return new Date(Date.now() + value * multiplier);
}

export class AuthService {
  private async issueSession(user: AuthUser, context: SessionContext = {}) {
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    await RefreshTokenModel.create({
      user: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: expiryFromDuration(env.JWT_REFRESH_EXPIRES_IN),
      userAgent: context.userAgent,
      ipAddress: context.ipAddress
    });

    return { user, accessToken, refreshToken };
  }

  async register(payload: { name: string; email: string; password: string; company?: string }, context?: SessionContext) {
    const exists = await UserModel.findOne({ email: payload.email });
    if (exists) throw new AppError("Email is already registered", 409, "EMAIL_EXISTS");

    const user = await UserModel.create({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      passwordHash: await bcrypt.hash(payload.password, 12),
      role: "client",
      permissions: ["client:read", "tickets:create"]
    });

    const authUser = toAuthUser(user);
    return this.issueSession(authUser, context);
  }

  async login(payload: { email: string; password: string }, context?: SessionContext) {
    const user = await UserModel.findOne({ email: payload.email }).select("+passwordHash");
    if (!user) throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
    if (user.status !== "active") throw new AppError("User is not active", 401, "USER_INACTIVE");

    const valid = await bcrypt.compare(payload.password, user.passwordHash);
    if (!valid) throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");

    user.lastLoginAt = new Date();
    await user.save();

    const authUser = toAuthUser(user);
    return this.issueSession(authUser, context);
  }

  async refresh(refreshToken: string | undefined, context?: SessionContext) {
    if (!refreshToken) throw new AppError("Refresh token is required", 401, "REFRESH_TOKEN_REQUIRED");

    const payload = verifyRefreshToken(refreshToken);
    const tokenHash = hashToken(refreshToken);
    const tokenRecord = await RefreshTokenModel.findOne({ tokenHash, revokedAt: { $exists: false } });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new AppError("Invalid or expired refresh token", 401, "INVALID_REFRESH_TOKEN");
    }

    const currentUser = await UserModel.findById(payload.id);
    if (!currentUser || currentUser.status !== "active") {
      throw new AppError("User is not active", 401, "USER_INACTIVE");
    }

    const user: AuthUser = {
      id: String(currentUser._id),
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      permissions: currentUser.permissions ?? []
    };

    const nextSession = await this.issueSession(user, context);
    tokenRecord.revokedAt = new Date();
    tokenRecord.replacedByTokenHash = hashToken(nextSession.refreshToken);
    await tokenRecord.save();

    return nextSession;
  }

  async logout(refreshToken?: string) {
    if (!refreshToken) return { loggedOut: true };
    await RefreshTokenModel.updateOne({ tokenHash: hashToken(refreshToken) }, { revokedAt: new Date() });
    return { loggedOut: true };
  }

  async me(userId: string) {
    const user = await UserModel.findById(userId).lean();
    if (!user) throw new AppError("User not found", 404, "USER_NOT_FOUND");
    return toAuthUser(user);
  }
}

export const authService = new AuthService();
