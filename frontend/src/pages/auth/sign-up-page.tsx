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
import { useAuth } from "@/lib/auth-context";
import { signUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export type SignupFormData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const handleOnSubmit = async (values: SignupFormData) => {
    try {
      const data = await postAuth("/api/auth/sign-up", values);
      login(data.accessToken, data.user);
      toast.success("Account created! Please check your email to verify your account.");
      reset();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col justify-center">
        <Link
          to="/"
          className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-black/60 transition hover:text-[#E9357B]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to TaskHub
        </Link>

        <Card className="rounded-xl border-black/10 bg-white shadow-sm">
          <CardHeader className="gap-2 p-6 pb-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E9357B]">
              Start free
            </p>
            <CardTitle className="text-3xl font-semibold tracking-tight text-black">
              Create an account
            </CardTitle>
            <CardDescription className="text-base leading-7">
              Set up your workspace and start managing tasks.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-3">
            <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">
              <FieldSet>
                <FieldGroup className="space-y-4">
                  <Field data-invalid={!!errors.name}>
                    <FieldLabel>Full Name</FieldLabel>
                    <FieldContent>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        className="h-12 rounded-md"
                        {...register("name")}
                      />
                      {errors.name && <FieldError>{errors.name.message}</FieldError>}
                    </FieldContent>
                  </Field>

                  <Field data-invalid={!!errors.email}>
                    <FieldLabel>Email Address</FieldLabel>
                    <FieldContent>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        autoComplete="email"
                        className="h-12 rounded-md"
                        {...register("email")}
                      />
                      {errors.email && <FieldError>{errors.email.message}</FieldError>}
                    </FieldContent>
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field data-invalid={!!errors.password}>
                      <FieldLabel>Password</FieldLabel>
                      <FieldContent>
                        <Input
                          type="password"
                          placeholder="********"
                          autoComplete="new-password"
                          className="h-12 rounded-md"
                          {...register("password")}
                        />
                        {errors.password && <FieldError>{errors.password.message}</FieldError>}
                      </FieldContent>
                    </Field>

                    <Field data-invalid={!!errors.confirmPassword}>
                      <FieldLabel>Confirm Password</FieldLabel>
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
                  </div>
                </FieldGroup>
              </FieldSet>

              <Button
                type="submit"
                className="h-12 w-full rounded-md bg-[#E9357B] text-base font-semibold text-white hover:bg-[#d82b70]"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Creating account..." : "Create account"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-6 border-t border-black/10 pt-5 text-center text-sm text-black/55">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-semibold text-[#E9357B] hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SignUpPage;
