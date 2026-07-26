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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import type { z } from "zod";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

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
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl flex-col justify-center">
        <Link
          to="/"
          className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-black/60 transition hover:text-[#E9357B]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to TaskHub
        </Link>

        <Card className="rounded-xl border-black/10 bg-white shadow-sm">
          {!token ? (
            <CardContent className="p-6 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                Invalid reset link
              </h1>
              <p className="mx-auto mt-3 max-w-sm leading-7 text-black/60">
                The password reset link is invalid or has expired.
              </p>
              <Button asChild variant="outline" className="mt-6 h-11 rounded-md">
                <Link to="/forgot-password">Request new link</Link>
              </Button>
            </CardContent>
          ) : isSuccess ? (
            <CardContent className="p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9357B]/10">
                <CheckCircle2 className="h-7 w-7 text-[#E9357B]" />
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-black">
                Password reset
              </h1>
              <p className="mx-auto mt-3 max-w-sm leading-7 text-black/60">
                Your password has been updated. You can now sign in.
              </p>
              <Button
                className="mt-6 h-11 rounded-md bg-[#E9357B] text-white hover:bg-[#d82b70]"
                onClick={() => navigate("/sign-in")}
              >
                Go to sign in
              </Button>
            </CardContent>
          ) : (
            <>
              <CardHeader className="gap-2 p-6 pb-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E9357B]">
                  Secure reset
                </p>
                <CardTitle className="text-3xl font-semibold tracking-tight text-black">
                  Choose a new password
                </CardTitle>
                <CardDescription className="text-base leading-7">
                  Enter and confirm your new password.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 pt-3">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <FieldSet>
                    <FieldGroup className="space-y-4">
                      <Field data-invalid={!!errors.newPassword}>
                        <FieldLabel>New Password</FieldLabel>
                        <FieldContent>
                          <Input
                            type="password"
                            placeholder="********"
                            autoComplete="new-password"
                            className="h-12 rounded-md"
                            {...register("newPassword")}
                          />
                          {errors.newPassword && (
                            <FieldError>{errors.newPassword.message}</FieldError>
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
                            className="h-12 rounded-md"
                            {...register("confirmPassword")}
                          />
                          {errors.confirmPassword && (
                            <FieldError>{errors.confirmPassword.message}</FieldError>
                          )}
                        </FieldContent>
                      </Field>
                    </FieldGroup>
                  </FieldSet>

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-md bg-[#E9357B] text-base font-semibold text-white hover:bg-[#d82b70]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Resetting..." : "Reset password"}
                  </Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
