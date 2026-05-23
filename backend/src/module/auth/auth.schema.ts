import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    email: z.email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Password must be 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});
