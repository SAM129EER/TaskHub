import ApiError from "../../errors/api-error.js";
import {
  findUserByEmail,
  findUserById,
  findUserByVerificationToken,
  findUserByResetToken,
  findSessionByRefreshTokenHash,
  createSession,
  createUser,
  updateUser,
  deleteSession,
  deleteAllUserSessions,
  rotateSession,
  resetPasswordAndRevokeSessions,
} from "./auth.repository.js";
import {
  generateRefreshToken,
  generateAccessToken,
  hashPassword,
  compareHashPassword,
  generateRandomToken,
  hashToken,
  verifyRefreshToken,
} from "./auth.utils.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "./auth.mail.js";
import type { SignUpInput, SignInInput } from "./auth.schema.js";

// Helper to remove sensitive fields before returning user to client
const sanitizeUser = (user: {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
  emailVerificationToken?: string | null;
  emailVerificationTokenExpiresAt?: Date | null;
  resetPasswordToken?: string | null;
  resetPasswordTokenExpiresAt?: Date | null;
}) => {
  const {
    password,
    emailVerificationToken,
    emailVerificationTokenExpiresAt,
    resetPasswordToken,
    resetPasswordTokenExpiresAt,
    ...safeUser
  } = user;
  return safeUser;
};

// ---------- Sign Up ----------
export const signUpService = async (body: SignUpInput) => {
  const existingUser = await findUserByEmail(body.email);

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const hashedPassword = await hashPassword(body.password);

  const rawToken = generateRandomToken();
  const hashedVerificationToken = hashToken(rawToken);

  const user = await createUser({
    name: body.name,
    email: body.email,
    password: hashedPassword,
    emailVerificationToken: hashedVerificationToken,
    emailVerificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  // Send verification email asynchronously.
  sendVerificationEmail(user.email, user.name, rawToken).catch((err) => {
    console.error("Failed to send verification email:", err.message);
  });

  return {
    user: sanitizeUser(user),
    message:
      "Registration successful. Please check your email to verify your account.",
  };
};

// ---------- Sign In ----------

export const signInService = async (body: SignInInput) => {
  const user = await findUserByEmail(body.email);
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await compareHashPassword(
    body.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.emailVerified) {
    throw new ApiError(403, "Please verify your email before signing in.");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await createSession({
    userId: user.id,
    refreshTokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

// ---------- Verify Email ----------

export const verifyEmailService = async (token: string) => {
  const hashedToken = hashToken(token);
  const user = await findUserByVerificationToken(hashedToken);

  if (!user) {
    throw new ApiError(400, "Invalid or expired verification link");
  }

  if (
    !user.emailVerificationTokenExpiresAt ||
    user.emailVerificationTokenExpiresAt <= new Date()
  ) {
    throw new ApiError(
      400,
      "Verification token has expired. Please request a new one.",
    );
  }

  await updateUser(user.id, {
    emailVerified: true,
    emailVerificationToken: null,
    emailVerificationTokenExpiresAt: null,
  });

  return { message: "Email verified successfully" };
};

// ---------- Forgot Password ----------

export const forgotPasswordService = async (email: string) => {
  const user = await findUserByEmail(email);

  // Return success message regardless of existence to prevent email enumeration
  if (!user) {
    return {
      message:
        "If an account with that email exists, a password reset link has been sent.",
    };
  }

  const rawToken = generateRandomToken();
  const hashedResetToken = hashToken(rawToken);

  await updateUser(user.id, {
    resetPasswordToken: hashedResetToken,
    resetPasswordTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });

  sendPasswordResetEmail(user.email, user.name, rawToken).catch((err) => {
    console.error("Failed to send password reset email:", err.message);
  });

  return {
    message:
      "If an account with that email exists, a password reset link has been sent.",
  };
};

// ---------- Reset Password ----------

export const resetPasswordService = async (
  token: string,
  newPassword: string,
) => {
  const hashedToken = hashToken(token);
  const user = await findUserByResetToken(hashedToken);

  if (!user) {
    throw new ApiError(400, "Invalid or expired reset token");
  }
  if (
    !user.resetPasswordTokenExpiresAt ||
    user.resetPasswordTokenExpiresAt <= new Date()
  ) {
    throw new ApiError(
      400,
      "Reset token has expired. Please request a new link.",
    );
  }

  const hashedPassword = await hashPassword(newPassword);

  await resetPasswordAndRevokeSessions(user.id, hashedPassword);

  return {
    message: "Password has been reset successfully. You can now log in.",
  };
};

// ---------- Refresh Token Rotation ----------
export const refreshTokenService = async (refreshToken: string) => {
  let payload: { userId: string };

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, "Invalid or expired session. Please log in again.");
  }

  const currentRefreshTokenHash = hashToken(refreshToken);

  const session = await findSessionByRefreshTokenHash(currentRefreshTokenHash);

  if (!session || session.userId !== payload.userId) {
    throw new ApiError(401, "Session not found. Please log in again.");
  }

  if (session.expiresAt <= new Date()) {
    await deleteSession(session.id);

    throw new ApiError(401, "Session expired. Please log in again.");
  }

  const newAccessToken = generateAccessToken(payload.userId);
  const newRefreshToken = generateRefreshToken(payload.userId);

  const rotated = await rotateSession({
    sessionId: session.id,
    currentRefreshTokenHash,
    userId: payload.userId,
    newRefreshTokenHash: hashToken(newRefreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  if (!rotated) {
    throw new ApiError(
      401,
      "Session has already been used. Please log in again.",
    );
  }

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
// ---------- Logout ----------

export const logoutService = async (refreshToken: string) => {
  const refreshTokenHash = hashToken(refreshToken);

  const session = await findSessionByRefreshTokenHash(refreshTokenHash);

  if (session) {
    await deleteSession(session.id);
  }

  return { message: "Logged out successfully" };
};

// ---------- Get Current User ----------

export const getCurrentUserService = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return sanitizeUser(user);
};

// ---------- Resend Verification Email ----------

export const resendVerificationService = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.emailVerified) {
    throw new ApiError(400, "Email is already verified");
  }

  const rawToken = generateRandomToken();
  const hashedToken = hashToken(rawToken);

  await updateUser(user.id, {
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  sendVerificationEmail(user.email, user.name, rawToken).catch((err) => {
    console.error("Failed to resend verification email:", err.message);
  });

  return { message: "Verification email sent. Please check your inbox." };
};
