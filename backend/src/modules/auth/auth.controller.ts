import { Request, Response } from "express";
import {
  signInService,
  signUpService,
  verifyEmailService,
  forgotPasswordService,
  resetPasswordService,
  refreshTokenService,
  logoutService,
  getCurrentUserService,
  resendVerificationService,
} from "./auth.service.js";
import { env } from "../../config/env.js";

const isProduction = env.NODE_ENV === "production";

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/api/auth",
};

const CLEAR_REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
  path: "/api/auth",
};

const getClientMeta = (req: Request) => ({
  userAgent: (req.headers["user-agent"] as string) || undefined,
  ipAddress: req.ip || undefined,
});

type AuthenticatedRequest = Request & {
  user?: { userId?: string };
};

// ---------- Sign Up ----------

export const signUpController = async (req: Request, res: Response) => {
  const result = await signUpService(req.body);

  res.status(201).json({
    success: true,
    message: result.message,

    data: {
      user: result.user,
    },
  });
};

// ---------- Sign In ----------

export const signInController = async (req: Request, res: Response) => {
  const result = await signInService(req.body , getClientMeta(req));

  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);
  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
};

// ---------- Verify Email ----------

export const verifyEmailController = async (req: Request, res: Response) => {
  const { token } = req.body;
  const result = await verifyEmailService(token);

  res.status(200).json({
    success: true,
    message: result.message,
  });
};

// ---------- Forgot Password ----------

export const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await forgotPasswordService(email);

  res.status(200).json({
    success: true,
    message: result.message,
  });
};

// ---------- Reset Password ----------

export const resetPasswordController = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  const result = await resetPasswordService(token, newPassword);

  res.status(200).json({
    success: true,
    message: result.message,
  });
};

// ---------- Refresh Token ----------

export const refreshTokenController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({
      success: false,
      message: "No refresh token provided",
    });
    return;
  }

  const result = await refreshTokenService(refreshToken , getClientMeta(req));

  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);
  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: {
      accessToken: result.accessToken,
    },
  });
};

// ---------- Logout ----------

export const logoutController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await logoutService(refreshToken);
  }

  res.clearCookie("refreshToken", CLEAR_REFRESH_COOKIE_OPTIONS);
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// ---------- Get Current User ----------

export const getCurrentUserController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const user = await getCurrentUserService(userId);
  res.status(200).json({
    success: true,
    data: { user },
  });
};

// ---------- Resend Verification Email ----------
export const resendVerificationController = async (
  req: Request,
  res: Response,
) => {
  const result = await resendVerificationService(req.body.email);

  res.status(200).json({
    success: true,
    message: result.message,
  });
};
