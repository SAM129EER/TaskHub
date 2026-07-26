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
import { signInSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

type SignInFormData = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (values: SignInFormData) => {
    try {
      const data = await postAuth("/api/auth/sign-in", values);
      login(data.accessToken, data.user);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">
        <Link
          to="/"
          className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-black/60 transition hover:text-[#E9357B]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to TaskHub
        </Link>

        <Card className="rounded-3xl border border-black/10 bg-white p-2 shadow-xl">
          <CardHeader className="gap-2 p-6 pb-2 text-center">
            {/* Logo Brand */}
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white font-extrabold text-xl shadow-sm">
              T
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight text-black">
              Sign in to TaskHub
            </CardTitle>
            <CardDescription className="text-base text-black/60 font-medium">
              Enter your details to open your workspace.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-4">
            <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">
              <FieldSet>
                <FieldGroup className="space-y-4">
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel className="text-sm font-bold text-black">Email Address</FieldLabel>
                    <FieldContent>
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        className="h-12 rounded-xl border-black/15 bg-[#FAF9F6] text-base focus:border-[#E9357B] focus:ring-1 focus:ring-[#E9357B]"
                        {...register("email")}
                      />
                      {errors.email && <FieldError>{errors.email.message}</FieldError>}
                    </FieldContent>
                  </Field>

                  <Field data-invalid={!!errors.password}>
                    <div className="flex items-center justify-between gap-4">
                      <FieldLabel className="text-sm font-bold text-black">Password</FieldLabel>
                      <Link
                        to="/forgot-password"
                        className="text-xs font-semibold text-[#E9357B] hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FieldContent>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="h-12 rounded-xl border-black/15 bg-[#FAF9F6] text-base focus:border-[#E9357B] focus:ring-1 focus:ring-[#E9357B]"
                        {...register("password")}
                      />
                      {errors.password && <FieldError>{errors.password.message}</FieldError>}
                    </FieldContent>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-[#E9357B] text-base font-bold text-white shadow-md transition hover:bg-[#d82b70]"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Signing in..." : "Sign in"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-6 border-t border-black/10 pt-5 text-center text-sm font-medium text-black/60">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="font-bold text-[#E9357B] hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SignInPage;
