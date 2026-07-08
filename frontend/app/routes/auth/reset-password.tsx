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

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";
  const [isSuccess, setIsSuccess] = useState(false);

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

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Reset token is missing. Please use the link from your email.");
      return;
    }

    try {
      await postAuth("/api/auth/reset-password", {
        token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      setIsSuccess(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-xl">
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
            {isSuccess ? (
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

                <Button
                  className="mt-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  onClick={() => navigate("/sign-in")}
                >
                  Go to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FieldSet>
                  <FieldGroup>
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

export default ResetPassword;
