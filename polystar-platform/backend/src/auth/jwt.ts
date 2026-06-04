import jwt, { type SignOptions } from "jsonwebtoken";
import type { AuthUser } from "@polystar/shared";
import { env } from "../config/env.js";

export type TokenPayload = AuthUser & {
  tokenType: "access" | "refresh";
};

function sign(payload: TokenPayload, secret: string, expiresIn: string) {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
}

export function createAccessToken(user: AuthUser) {
  return sign({ ...user, tokenType: "access" }, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES_IN);
}

export function createRefreshToken(user: AuthUser) {
  return sign({ ...user, tokenType: "refresh" }, env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES_IN);
}

export function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
  if (payload.tokenType !== "access") throw new Error("Invalid access token type");
  return payload;
}

export function verifyRefreshToken(token: string) {
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
  if (payload.tokenType !== "refresh") throw new Error("Invalid refresh token type");
  return payload;
}
