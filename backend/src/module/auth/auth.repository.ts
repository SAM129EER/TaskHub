import { db } from "../../db/index.js";
import { usersTable, sessions } from "../../db/schema.js";
import { eq } from "drizzle-orm";

// ---------- User queries ----------

export const findUserByEmail = async (email: string) => {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });
};

export const findUserById = async (id: string) => {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  emailVerificationToken?: string;
  emailVerificationTokenExpiresAt?: Date;
}) => {
  const [user] = await db.insert(usersTable).values(data).returning();
  return user;
};

export const updateUser = async (
  id: string,
  data: Partial<typeof usersTable.$inferInsert>,
) => {
  const [user] = await db
    .update(usersTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(usersTable.id, id))
    .returning();
  return user;
};

// ---------- Find user by hashed token ----------

export const findUserByVerificationToken = async (hashedToken: string) => {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.emailVerificationToken, hashedToken),
  });
};

export const findUserByResetToken = async (hashedToken: string) => {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.resetPasswordToken, hashedToken),
  });
};

// ---------- Session queries ----------

export const createSession = async (data: {
  userId: string;
  refreshToken: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
}) => {
  const [session] = await db.insert(sessions).values(data).returning();
  return session;
};

export const findSessionByRefreshToken = async (refreshToken: string) => {
  return db.query.sessions.findFirst({
    where: eq(sessions.refreshToken, refreshToken),
  });
};

export const deleteSession = async (sessionId: string) => {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
};

export const deleteAllUserSessions = async (userId: string) => {
  await db.delete(sessions).where(eq(sessions.userId, userId));
};
