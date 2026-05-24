import { db } from "../../db/index.js";
import { usersTable, sessions } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string) => {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const [user] = await db.insert(usersTable).values(data).returning();
  return user;
};

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
