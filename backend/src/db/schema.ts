import {
  boolean,
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    name: varchar("name", { length: 255 }).notNull(),

    email: varchar("email", { length: 255 }).notNull().unique(),

    password: varchar("password", { length: 255 }).notNull(),

    emailVerified: boolean("email_verified").default(false).notNull(),

    // Store hashed, single-use email verification tokens and their expiry time.
    emailVerificationToken: varchar("email_verification_token", {
      length: 255,
    }),

    emailVerificationTokenExpiresAt: timestamp(
      "email_verification_token_expires_at",
    ),

    // Store hashed, single-use password reset tokens and their expiry time.
    resetPasswordToken: varchar("reset_password_token", {
      length: 255,
    }),

    resetPasswordTokenExpiresAt: timestamp("reset_password_token_expires_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("users_email_verification_token_idx").on(
      table.emailVerificationToken,
    ),
    index("users_reset_password_token_idx").on(table.resetPasswordToken),
  ],
);

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),

  refreshToken: varchar("refresh_token", {
    length: 500,
  }).notNull(),

  userAgent: varchar("user_agent", {
    length: 500,
  }),

  ipAddress: varchar("ip_address", {
    length: 100,
  }),

  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
