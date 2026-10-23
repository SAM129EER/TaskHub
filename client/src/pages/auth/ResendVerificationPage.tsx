
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { ApiError } from "@/api/api-client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resendVerification } from "@/features/auth/api/auth.api";
import {
  resendVerificationSchema,
  type ResendVerificationFormValues,
} from "@/features/auth/schemas/auth.schema";

export default function ResendVerificationPage() {
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResendVerificationFormValues>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ResendVerificationFormValues) {
    setServerMessage("");
    setServerError("");

    try {
      const response = await resendVerification(values.email);
      setServerMessage(response.message);
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        setServerError(error.message);
      } else {
        setServerError(
          "Unable to process your request right now. Please try again.",
        );
      }
    }
  }

  return (
    <div className="rounded-xl border p-6 shadow-sm sm:p-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Resend verification email
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the email address you used to create your TaskHub account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="verification-email">
              Email address
            </FieldLabel>
            <Input
              id="verification-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </Field>

          {serverMessage && (
            <p role="status" className="text-sm text-muted-foreground">
              {serverMessage}
            </p>
          )}

          {serverError && (
            <p role="alert" className="text-sm text-destructive">
              {serverError}
            </p>
          )}

          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Resend verification email"}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already verified?{" "}
        <Link
          to="/signin"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
