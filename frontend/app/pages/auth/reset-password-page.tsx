/**
 * reset-password-page.tsx — Password reset page for TaskHub.
 *
 * The user arrives here from the email link which contains a `?token=…`
 * query parameter. The page validates the token is present, then shows
 * a form for entering a new password (with confirmation). On success
 * the user is shown a confirmation message and can navigate to sign‑in.
 *
 * Key libraries:
 *   • react‑hook‑form  — form state & validation
 *   • zod              — password‑match refinement
 *   • sonner           — toast notifications
 *   • postAuth (axios) — sends the new password to the backend
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { postAuth } from "@/lib/api";
import { resetPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams, useNavigate } from "react-router";
import { toast } from "sonner";
import type { z } from "zod";

/** Infer the form‑data type from the Zod reset‑password schema. */
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  // Extract the reset token from the URL query string (e.g. ?token=abc123).
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  // Tracks whether the password was reset successfully.
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize react‑hook‑form with the reset‑password Zod schema.
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  /**
   * onSubmit — Sends the new password along with the reset token
   * to the backend via axios. On success, shows the confirmation UI.
   */
  const onSubmit = async (values: ResetPasswordFormData) => {
    // Guard: ensure a token exists before making the request.
    if (!token) {
      toast.error("Reset token is missing. Please use the link from your email.");
      return;
    }

    try {
      // Post the token + new password to the reset endpoint.
      await postAuth("/api/auth/reset-password", {
        token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      // Switch to the success confirmation view.
      setIsSuccess(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  // ---------- Invalid / missing token state ----------
  // If the page was loaded without a token query param, show an error.
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
            <p className="text-lg font-medium text-destructive">
              Invalid reset link
            </p>
            <p className="text-sm text-muted-foreground">
              The password reset link is invalid or has expired. Please request a
              new one.
            </p>
            <Button asChild variant="outline">
              <Link to="/forgot-password">Request new link</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---------- Main form / success view ----------
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-xl">
          {/* ---------- Header with back‑link ---------- */}
          <CardHeader className="space-y-4">
            <Link
              to="/sign-in"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>

            <div className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight">
                Reset Password
              </CardTitle>

              <CardDescription>
                Enter your new password below
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {/* ---------- Conditional rendering: success or form ---------- */}
            {isSuccess ? (
              /* ---- Success confirmation ---- */
              <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">
                    Password reset successful
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Your password has been updated. You can now sign in with your
                    new password.
                  </p>
                </div>

                {/* Navigate the user to sign‑in with the updated credentials. */}
                <Button
                  className="mt-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  onClick={() => navigate("/sign-in")}
                >
                  Go to Sign In
                </Button>
              </div>
            ) : (
              /* ---- Reset password form ---- */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FieldSet>
                  <FieldGroup>
                    {/* ---- New password field ---- */}
                    <Field data-invalid={!!errors.newPassword}>
                      <FieldLabel>New Password</FieldLabel>

                      <FieldContent>
                        <Input
                          type="password"
                          placeholder="********"
                          autoComplete="new-password"
                          {...register("newPassword")}
                        />

                        {errors.newPassword && (
                          <FieldError>
                            {errors.newPassword.message}
                          </FieldError>
                        )}
                      </FieldContent>
                    </Field>

                    {/* ---- Confirm new password field ---- */}
                    <Field data-invalid={!!errors.confirmPassword}>
                      <FieldLabel>Confirm New Password</FieldLabel>

                      <FieldContent>
                        <Input
                          type="password"
                          placeholder="********"
                          autoComplete="new-password"
                          {...register("confirmPassword")}
                        />

                        {errors.confirmPassword && (
                          <FieldError>
                            {errors.confirmPassword.message}
                          </FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  </FieldGroup>
                </FieldSet>

                {/* ---- Submit button with loading state ---- */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
