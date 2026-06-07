import jwt, { type SignOptions } from "jsonwebtoken";
import type { AuthUser } from "@polystar/shared";
import { env } from "../config/env.js";
import { AppError } from "../middleware/error.js";

export type TokenPayload = AuthUser & {
  tokenType: "access" | "refresh";
};

function getSecret(secret: string | undefined, name: string) {
  if (!secret || secret.length < 24) {
    throw new AppError(`${name} is not configured securely.`, 503, "AUTH_CONFIGURATION_ERROR");
  }

  return secret;
}

function sign(payload: TokenPayload, secret: string | undefined, expiresIn: string, secretName: string) {
  const configuredSecret = getSecret(secret, secretName);
  return jwt.sign(payload, configuredSecret, { expiresIn } as SignOptions);
}

export function createAccessToken(user: AuthUser) {
  return sign({ ...user, tokenType: "access" }, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES_IN, "JWT_ACCESS_SECRET");
}

export function createRefreshToken(user: AuthUser) {
  return sign({ ...user, tokenType: "refresh" }, env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES_IN, "JWT_REFRESH_SECRET");
}

export function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, getSecret(env.JWT_ACCESS_SECRET, "JWT_ACCESS_SECRET")) as TokenPayload;
  if (payload.tokenType !== "access") throw new Error("Invalid access token type");
  return payload;
}

export function verifyRefreshToken(token: string) {
  const payload = jwt.verify(token, getSecret(env.JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET")) as TokenPayload;
  if (payload.tokenType !== "refresh") throw new Error("Invalid refresh token type");
  return payload;
}
