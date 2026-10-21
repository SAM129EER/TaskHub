import { prisma } from "../../config/prisma.js";
import type { Prisma } from "../../generated/prisma/client.js";

// ---------- User queries ----------

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  emailVerificationToken?: string;
  emailVerificationTokenExpiresAt?: Date;
}) => {
  return prisma.user.create({
    data,
  });
};

export const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

// ---------- Verification and reset tokens ----------

export const findUserByVerificationToken = async (hashedToken: string) => {
  return prisma.user.findUnique({
    where: { emailVerificationToken: hashedToken },
  });
};

export const findUserByResetToken = async (hashedToken: string) => {
  return prisma.user.findUnique({
    where: { resetPasswordToken: hashedToken },
  });
};

// ---------- Session queries ----------

export const createSession = async (data: {
  userId: string;
  refreshTokenHash: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
}) => {
  return prisma.session.create({
    data,
  });
};

export const findSessionByRefreshTokenHash = async (
  refreshTokenHash: string,
) => {
  return prisma.session.findUnique({
    where: { refreshTokenHash },
  });
};

export const deleteSession = async (sessionId: string) => {
  return prisma.session.delete({
    where: { id: sessionId },
  });
};

export const deleteAllUserSessions = async (userId: string) => {
  return prisma.session.deleteMany({
    where: { userId },
  });
};

export const resetPasswordAndRevokeSessions = async (
  userId: string,
  hashedPassword: string,
) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiresAt: null,
      },
    });
    await tx.session.deleteMany({
      where: { userId },
    });

    return user;
  });
};

export const rotateSession = async (data: {
  sessionId: string;
  currentRefreshTokenHash: string;
  userId: string;
  newRefreshTokenHash: string;
  expiresAt: Date;
}) => {
  return prisma.$transaction(async (tx) => {
    const deleted = await tx.session.deleteMany({
      where: {
        id: data.sessionId,
        userId: data.userId,
        refreshTokenHash: data.currentRefreshTokenHash,
      },
    });

    // Another request may already have consumed this session.
    if (deleted.count !== 1) {
      return false;
    }

    await tx.session.create({
      data: {
        userId: data.userId,
        refreshTokenHash: data.newRefreshTokenHash,
        expiresAt: data.expiresAt,
      },
    });

    return true;
  });
};
