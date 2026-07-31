
import { z } from "zod";


export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

/** Schema for the sign‑up form with a password‑confirmation check. */
export const signUpSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be 8 characters"),
    name: z.string().min(3, "Name must be at least 3 characters"),
    confirmPassword: z.string().min(8, "Password must be 8 characters"),
  })
  // Custom refinement ensures both password fields match.
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

/** Schema for the reset‑password form (new password + confirmation). */
export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be 8 characters"),
    confirmPassword: z.string().min(8, "Password must be 8 characters"),
  })
  // Ensure the two password fields are identical.
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

/** Schema for the forgot‑password form (email only). */
export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

// ---------------------------------------------------------------------------
// Workspace & project schemas — used on workspace / project management pages.
// ---------------------------------------------------------------------------

/** Schema for creating or editing a workspace. */
export const workspaceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  color: z.string().min(3, "Color must be at least 3 characters"),
  description: z.string().optional(),
});

// NOTE: The project schema is commented out until the ProjectStatus enum is
// available. Uncomment and import `ProjectStatus` when ready.
// export const projectSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters"),
//   description: z.string().optional(),
//   status: z.nativeEnum(ProjectStatus),
//   startDate: z.string().min(10, "Start date is required"),
//   dueDate: z.string().min(10, "Due date is required"),
//   members: z
//     .array(
//       z.object({
//         user: z.string(),
//         role: z.enum(["manager", "contributor", "viewer"]),
//       })
//     )
//     .optional(),
//   tags: z.string().optional(),
// });

// ---------------------------------------------------------------------------
// Task schemas — used on the task‑creation / editing dialog.
// ---------------------------------------------------------------------------

/** Schema for creating a new task within a project. */
export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "Done"]),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z.string().min(1, "Due date is required"),
  assignees: z.array(z.string()).min(1, "At least one assignee is required"),
});

// ---------------------------------------------------------------------------
// Member schemas — used when inviting collaborators to a workspace.
// ---------------------------------------------------------------------------

/** Schema for inviting a new member by email with a specific role. */
export const inviteMemberSchema = z.object({
  email: z.email(),
  role: z.enum(["admin", "member", "viewer"]),
});