import ApiError from "../../errors/api-error.js";

import {
  findUserByEmail,
  findUserById,
  findUserByVerificationToken,
  findUserByResetToken,
  findSessionByRefreshToken,
  createSession,
  createUser,
  updateUser,
  deleteSession,
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

import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "./auth.mail.js";

// ---------- Sign Up ----------

export const signUpService = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}) => {
  const userExist = await findUserByEmail(data.email);

  if (userExist) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  // Generate email verification token
  const rawToken = generateRandomToken();
  const hashedVerificationToken = hashToken(rawToken);

  // The confirm password field is validation-only and should never reach the DB.
  const { confirmPassword, ...userData } = data;

  const user = await createUser({
    ...userData,
    password: hashedPassword,
    emailVerificationToken: hashedVerificationToken,
    emailVerificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  });

  const { password, ...safeuser } = user;

  const accessToken = generateAccessToken(user.id);

  const refreshToken = generateRefreshToken(user.id);

  await createSession({
    userId: user.id,
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // Send verification email (fire-and-forget so signup isn't blocked)
  sendVerificationEmail(user.email, user.name, rawToken).catch((err) => {
    console.error("Failed to send verification email:", err);
  });

  return {
    user: safeuser,
    accessToken,
    refreshToken,
  };
};

// ---------- Sign In ----------

export const signInService = async (data: {
  email: string;
  password: string;
}) => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordCorrect = await compareHashPassword(
    data.password,
    user.password,
  );
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { password, ...safeuser } = user;
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await createSession({
    userId: user.id,
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { user: safeuser, accessToken, refreshToken };
};

// ---------- Verify Email ----------

export const verifyEmailService = async (token: string) => {
  const hashedToken = hashToken(token);
  const user = await findUserByVerificationToken(hashedToken);

  if (!user) {
    throw new ApiError(400, "Invalid or expired verification token");
  }

  if (
    user.emailVerificationTokenExpiresAt &&
    user.emailVerificationTokenExpiresAt < new Date()
  ) {
    throw new ApiError(400, "Verification token has expired");
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

  // Don't reveal whether the email exists – always return success.
  if (!user) {
    return { message: "If an account with that email exists, a reset link has been sent" };
  }

  const rawToken = generateRandomToken();
  const hashedResetToken = hashToken(rawToken);

  await updateUser(user.id, {
    resetPasswordToken: hashedResetToken,
    resetPasswordTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });

  // Send reset email
  await sendPasswordResetEmail(user.email, user.name, rawToken);

  return { message: "If an account with that email exists, a reset link has been sent" };
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
    user.resetPasswordTokenExpiresAt &&
    user.resetPasswordTokenExpiresAt < new Date()
  ) {
    throw new ApiError(400, "Reset token has expired");
  }

  const hashedPassword = await hashPassword(newPassword);

  await updateUser(user.id, {
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordTokenExpiresAt: null,
  });

  return { message: "Password reset successfully" };
};

// ---------- Refresh Token ----------

export const refreshTokenService = async (refreshToken: string) => {
  // 1. Verify the JWT is valid
  let payload: { userId: string };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  // 2. Check that a session with this exact refresh token exists
  const session = await findSessionByRefreshToken(refreshToken);
  if (!session) {
    throw new ApiError(401, "Session not found – please sign in again");
  }

  // 3. Check session expiry
  if (session.expiresAt < new Date()) {
    await deleteSession(session.id);
    throw new ApiError(401, "Session expired – please sign in again");
  }

  // 4. Rotate tokens
  const newAccessToken = generateAccessToken(payload.userId);
  const newRefreshToken = generateRefreshToken(payload.userId);

  // Delete old session and create a new one (token rotation)
  await deleteSession(session.id);
  await createSession({
    userId: payload.userId,
    refreshToken: newRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

// ---------- Logout ----------

export const logoutService = async (refreshToken: string) => {
  const session = await findSessionByRefreshToken(refreshToken);

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

  const { password, ...safeUser } = user;
  return safeUser;
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

  // Generate a new token (invalidates the old one automatically)
  const rawToken = generateRandomToken();
  const hashedToken = hashToken(rawToken);

  await updateUser(user.id, {
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  await sendVerificationEmail(user.email, user.name, rawToken);

  return { message: "Verification email sent" };
};
