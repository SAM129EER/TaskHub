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
import { forgotPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import type { z } from "zod";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = () => {
    // Password reset API is not implemented yet, so show the existing success UI.
    setIsSuccess(true);
  };

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
                Forgot Password
              </CardTitle>

              <CardDescription>
                Enter your email and we'll send you a password reset link
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
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

                <Button asChild variant="outline" className="mt-2">
                  <Link to="/sign-in">Back to sign in</Link>
                </Button>
              </div>
            ) : (
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

                        <FieldDescription>
                          Enter the email associated with your account
                        </FieldDescription>

                        {errors.email && (
                          <FieldError>{errors.email.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  </FieldGroup>
                </FieldSet>

                <Button type="submit" className="w-full">
                  Verify
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
