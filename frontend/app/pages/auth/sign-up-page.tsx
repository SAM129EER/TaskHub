/**
 * sign-up-page.tsx — Registration page for TaskHub.
 *
 * Renders a card‑based form for new users to create an account.
 * After successful sign‑up the form is reset and the user is
 * redirected to the sign‑in page so they can log in (or verify
 * their email first, depending on backend config).
 *
 * Key libraries:
 *   • react‑hook‑form  — declarative form state & validation
 *   • zod              — schema validation (password match, min lengths)
 *   • sonner           — toast notifications
 *   • postAuth (axios) — sends the registration payload to the backend
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
import { signUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

/** Infer the form‑data type from the Zod sign‑up schema. */
export type SignupFormData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  // Programmatic navigation hook — used to redirect after sign‑up.
  const navigate = useNavigate();

  // Initialize react‑hook‑form with the sign‑up Zod schema.
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  // Destructure commonly used form utilities.
  const {
    register,      // binds each input to react‑hook‑form state
    handleSubmit,  // wraps the submit handler with validation logic
    reset,         // clears all fields after successful sign‑up
    formState: { errors, isSubmitting }, // validation errors & loading flag
  } = form;

  /**
   * handleOnSubmit — Called only when Zod validation passes.
   * Posts the sign‑up data to the backend via axios, then redirects
   * the user to the sign‑in page.
   */
  const handleOnSubmit = async (values: SignupFormData) => {
    try {
      // Send registration data to the backend.
      await postAuth("/api/auth/sign-up", values);

      toast.success("Account created successfully");

      // Clear the form fields to prevent accidental re‑submission.
      reset();

      // Navigate to sign‑in so the user can log in with their new account.
      navigate("/sign-in");
    } catch (error) {
      // Display the error (e.g. "Email already exists") from the API layer.
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        {/* ---------- Card header ---------- */}
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create an account
          </CardTitle>

          <CardDescription>
            Start managing your tasks efficiently
          </CardDescription>
        </CardHeader>

        {/* ---------- Registration form ---------- */}
        <CardContent>
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
            <FieldSet>
              <FieldGroup>
                {/* ---- Full name field ---- */}
                <Field data-invalid={!!errors.name}>
                  <FieldLabel>Full Name</FieldLabel>

                  <FieldContent>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      {...register("name")}
                    />

                    {errors.name && (
                      <FieldError>{errors.name.message}</FieldError>
                    )}
                  </FieldContent>
                </Field>

                {/* ---- Email field ---- */}
                <Field data-invalid={!!errors.email}>
                  <FieldLabel>Email Address</FieldLabel>

                  <FieldContent>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      autoComplete="email"
                      {...register("email")}
                    />

                    {errors.email && (
                      <FieldError>{errors.email.message}</FieldError>
                    )}
                  </FieldContent>
                </Field>

                {/* ---- Password field ---- */}
                <Field data-invalid={!!errors.password}>
                  <FieldLabel>Password</FieldLabel>

                  <FieldContent>
                    <Input
                      type="password"
                      placeholder="********"
                      autoComplete="new-password"
                      {...register("password")}
                    />

                    {errors.password && (
                      <FieldError>{errors.password.message}</FieldError>
                    )}
                  </FieldContent>
                </Field>

                {/* ---- Confirm password field ---- */}
                <Field data-invalid={!!errors.confirmPassword}>
                  <FieldLabel>Confirm Password</FieldLabel>

                  <FieldContent>
                    <Input
                      type="password"
                      placeholder="********"
                      autoComplete="new-password"
                      {...register("confirmPassword")}
                    />

                    {/* Zod refine() produces this error when passwords don't match. */}
                    {errors.confirmPassword && (
                      <FieldError>{errors.confirmPassword.message}</FieldError>
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
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          {/* ---- Footer link to sign‑in for existing users ---- */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
