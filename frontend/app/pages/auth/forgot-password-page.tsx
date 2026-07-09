/**
 * forgot-password-page.tsx — Forgot‑password page for TaskHub.
 *
 * Lets the user enter their email to receive a password‑reset link.
 * After a successful request the form is replaced with a confirmation
 * message instructing the user to check their inbox.
 *
 * Key libraries:
 *   • react‑hook‑form  — form state management
 *   • zod              — email validation
 *   • sonner           — toast notifications
 *   • postAuth (axios) — sends the email to the backend
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { postAuth } from "@/lib/api";
import { forgotPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import type { z } from "zod";

/** Infer the form‑data type from the Zod forgot‑password schema. */
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  // Tracks whether the reset‑link email was sent successfully.
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize react‑hook‑form with the forgot‑password Zod schema.
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  /**
   * onSubmit — Sends the email to the forgot‑password endpoint via axios.
   * On success, flips `isSuccess` to show the confirmation UI.
   */
  const onSubmit = async (values: ForgotPasswordFormData) => {
    try {
      // Request a password‑reset link from the backend.
      await postAuth("/api/auth/forgot-password", values);

      // Switch to the "check your email" confirmation view.
      setIsSuccess(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-xl">
          {/* ---------- Card header with back‑link + title ---------- */}
          <CardHeader className="space-y-4">
            {/* Navigation link back to the sign‑in page. */}
            <Link
              to="/sign-in"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>

            <div className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight">
                Forgot Password
              </CardTitle>

              <CardDescription>
                Enter your email and we'll send you a password reset link
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {/* ---------- Conditional rendering: success or form ---------- */}
            {isSuccess ? (
              /* ---- Success confirmation UI ---- */
              <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
                {/* Green circle icon indicating success. */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <MailCheck className="h-8 w-8 text-green-600" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Check your email</h2>

                  <p className="text-sm text-muted-foreground">
                    We sent you a password reset link. Please check your inbox
                    and spam folder.
                  </p>
                </div>

                {/* Button to navigate back to sign‑in. */}
                <Button asChild variant="outline" className="mt-2">
                  <Link to="/sign-in">Back to sign in</Link>
                </Button>
              </div>
            ) : (
              /* ---- Email form ---- */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FieldSet>
                  <FieldGroup>
                    <Field data-invalid={!!errors.email}>
                      <FieldLabel>Email Address</FieldLabel>

                      <FieldContent>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          autoComplete="email"
                          {...register("email")}
                        />

                        {/* Helper text below the input. */}
                        <FieldDescription>
                          Enter the email associated with your account
                        </FieldDescription>

                        {/* Validation error from Zod. */}
                        {errors.email && (
                          <FieldError>{errors.email.message}</FieldError>
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
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
