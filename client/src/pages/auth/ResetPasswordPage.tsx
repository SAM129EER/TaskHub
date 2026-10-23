
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { ApiError } from "@/api/api-client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/features/auth/api/auth.api";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas/auth.schema";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const token = searchParams.get("token") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    setServerError("");
    setIsSuccess(false);

    try {
      await resetPassword({
        ...values,
        token,
      });

      setIsSuccess(true);
    } catch (error) {
      if (error instanceof ApiError) {
        setServerError(
          error.status === 400 || error.status === 401
            ? error.message
            : "Unable to reset your password. Please try again.",
        );
      } else {
        setServerError(
          "Unable to reset your password right now. Please try again.",
        );
      }
    }
  }

  return (
    <div className="rounded-xl border p-6 shadow-sm sm:p-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Set a new password
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose a new password for your TaskHub account.
        </p>
      </div>

      {isSuccess ? (
        <div className="space-y-4">
          <p role="status" className="text-sm text-green-600">
            Your password has been reset successfully. You can now sign in
            with your new password.
          </p>
          <Button  className="w-full">
            <Link to="/signin">Continue to sign in</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            {!token && (
              <p role="alert" className="text-sm text-destructive">
                The reset link is missing its token. Please request a new
                password reset link.
              </p>
            )}

            <Field>
              <FieldLabel htmlFor="new-password">
                New password
              </FieldLabel>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter a new password"
                  className="pr-10"
                  aria-invalid={Boolean(errors.newPassword)}
                  {...register("newPassword")}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-destructive">
                  {errors.newPassword.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-new-password">
                Confirm new password
              </FieldLabel>
              <div className="relative">
                <Input
                  id="confirm-new-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter the new password again"
                  className="pr-10"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showConfirmPassword}
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </Field>

            {serverError && (
              <p role="alert" className="text-sm text-destructive">
                {serverError}
              </p>
            )}

            <Field>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !token}
              >
                {isSubmitting ? "Resetting password..." : "Reset password"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Back to{" "}
        <Link
          to="/signin"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          sign in
        </Link>
      </p>
    </div>
  );
}
