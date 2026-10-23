
import { z } from "zod";

// Sign up
export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(255, "Name must be at most 255 characters"),
    email: z
      .string()
      .trim()
      .email("Please provide a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

// Sign in
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

// Forgot password
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),
});

export type ForgotPasswordFormValues = z.infer<
  typeof forgotPasswordSchema
>;

// Reset password
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "The password reset token is missing"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ResetPasswordFormValues = z.infer<
  typeof resetPasswordSchema
>;


export const resendVerificationSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),
});

export type ResendVerificationFormValues = z.infer<
  typeof resendVerificationSchema
>;