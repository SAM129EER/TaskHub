import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./auth.utils.js";

/**
 * Middleware that protects routes by verifying the access token
 * from the Authorization header (Bearer <token>).
 * On success, attaches `req.user = { userId }` for downstream handlers.
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : undefined;

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Access token is required",
    });
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};
