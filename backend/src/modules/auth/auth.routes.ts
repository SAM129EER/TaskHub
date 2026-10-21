import { Router } from "express";
import {
  signInController,
  signUpController,
  verifyEmailController,
  forgotPasswordController,
  resetPasswordController,
  refreshTokenController,
  logoutController,
  getCurrentUserController,
  resendVerificationController,
} from "./auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  SignUpSchema,
  signInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "./auth.schema.js";
import { authenticateToken } from "./auth.middleware.js";

const router = Router();

router.post("/signup", validate(SignUpSchema), asyncHandler(signUpController));
router.post("/signin", validate(signInSchema), asyncHandler(signInController));

router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  asyncHandler(verifyEmailController),
);

// Password reset flow
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  asyncHandler(forgotPasswordController),
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  asyncHandler(resetPasswordController),
);

// Token refresh & logout
router.post("/refresh-token", asyncHandler(refreshTokenController));
router.post("/logout", asyncHandler(logoutController));

// Protected routes (require valid Bearer access token)
router.get("/me", authenticateToken, asyncHandler(getCurrentUserController));
router.post(
  "/resend-verification",
  authenticateToken,
  asyncHandler(resendVerificationController),
);

export default router;
