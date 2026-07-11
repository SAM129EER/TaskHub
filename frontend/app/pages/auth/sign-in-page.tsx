/**
 * sign-in-page.tsx — Sign‑in page for TaskHub.
 *
 * Renders a card‑based form where existing users enter their email and
 * password. On successful authentication the access token is persisted to
 * localStorage and the user is redirected to the home page.
 *
 * Key libraries:
 *   • react‑hook‑form  — declarative form state & validation
 *   • zod              — schema‑based validation via zodResolver
 *   • sonner           — toast notifications for success / error feedback
 *   • postAuth (axios) — sends the credentials to the backend
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
import { signInSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@/lib/auth-context";

/** Infer the form‑data type directly from the Zod schema. */
type SignInFormData = z.infer<typeof signInSchema>;

const SignInPage = () => {
  // Hook for programmatic navigation after successful login.
  const navigate = useNavigate();
  const { login } = useAuth();

  // Initialize react‑hook‑form with Zod validation.
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Destructure commonly used form helpers.
  const {
    register,      // binds inputs to the form state
    handleSubmit,  // wraps the submit handler with validation
    formState: { errors, isSubmitting }, // validation errors & loading flag
  } = form;

  /**
   * handleOnSubmit — Called only after Zod validation passes.
   * Sends the credentials to the sign‑in endpoint via axios and
   * stores the returned access token.
   */
  const handleOnSubmit = async (values: SignInFormData) => {
    try {
      // POST credentials to the backend auth endpoint.
      const data = await postAuth("/api/auth/sign-in", values);

      // Persist the token and update global auth state.
      login(data.accessToken, data.user);
      toast.success("Login successful");

      // Redirect to the dashboard.
      navigate("/dashboard");
    } catch (error) {
      // Display the error message returned by the API layer.
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        {/* ---------- Card header with title + subtitle ---------- */}
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome back
          </CardTitle>

          <CardDescription>
            Sign in to continue managing your tasks
          </CardDescription>
        </CardHeader>

        {/* ---------- Form body ---------- */}
        <CardContent>
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
            <FieldSet>
              <FieldGroup>
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

                    {/* Show validation error below the input if present. */}
                    {errors.email && (
                      <FieldError>{errors.email.message}</FieldError>
                    )}
                  </FieldContent>
                </Field>

                {/* ---- Password field ---- */}
                <Field data-invalid={!!errors.password}>
                  <div className="flex items-center justify-between">
                    <FieldLabel>Password</FieldLabel>

                    {/* Link to the forgot‑password page for convenience. */}
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <FieldContent>
                    <Input
                      type="password"
                      placeholder="********"
                      autoComplete="current-password"
                      {...register("password")}
                    />

                    {errors.password && (
                      <FieldError>{errors.password.message}</FieldError>
                    )}
                  </FieldContent>
                </Field>
              </FieldGroup>
            </FieldSet>

            {/* ---- Submit button with loading spinner ---- */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* ---- Footer link to the sign‑up page ---- */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
