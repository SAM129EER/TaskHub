import { z } from "zod"

const emailSchema = z
  .string()
  .trim()
  .email("Please provide a valid email address")
  .toLowerCase()

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 8 characters")
  .max(32, "Password must be at most 72 characters")

// Sign up
export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(255, "Name must be at most 255 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 8 characters")
      .max(72, "Confirm password must be at most 72 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

// Sign in
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
})

// Forgot password
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

// Reset password
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "The password reset token is missing"),
    newPassword: passwordSchema,
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 8 characters")
      .max(32, "Confirm password must be at most 72 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export const resendVerificationSchema = z.object({
  email: emailSchema,
})

export type SignUpFormValues = z.infer<typeof signUpSchema>
export type SignInFormValues = z.infer<typeof signInSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
export type ResendVerificationFormValues = z.infer<
  typeof resendVerificationSchema
>