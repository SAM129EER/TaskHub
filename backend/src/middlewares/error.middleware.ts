import { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`[Error] ${req.method} ${req.url}:`, err);

  const statusCode = err.statusCode || 500;
  const isProduction = env.NODE_ENV === "production";
  
  const message =
    statusCode >= 500 && isProduction
      ? "Internal Server Error"
      : err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
  });
};
