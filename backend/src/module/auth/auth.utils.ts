import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { env } from "../../config/env.js";

// ---------- Password hashing ----------

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const compareHashPassword = (
  password: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(password, hashedPassword);
};

// ---------- JWT ----------

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as { userId: string };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
};

// ---------- Random tokens (email verification, password reset) ----------

export const generateRandomToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Hash a token with SHA-256 before storing in the DB.
 * We only store the hash so a DB leak doesn't expose valid tokens.
 */
export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
