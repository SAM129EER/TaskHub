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
// import { useLoginMutation } from "@/hooks/use-auth";
import { signInSchema } from "@/lib/schema";
// import { useAuth } from "@/provider/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();
//   const { login } = useAuth();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
const handleOnSubmit = ()=>{}
//   const { mutate, isPending } = useLoginMutation();

//   const handleOnSubmit = (values: SignInFormData) => {
//     mutate(values, {
//       onSuccess: (data) => {
//         login(data);

//         toast.success("Login successful");

//         navigate("/dashboard");
//       },

//       onError: (error: any) => {
//         const errorMessage =
//           error.response?.data?.message || "Something went wrong";

//         toast.error(errorMessage);
//       },
//     });
//   };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome back
          </CardTitle>

          <CardDescription>
            Sign in to continue managing your tasks
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="space-y-6"
          >
            <FieldSet>
              <FieldGroup>
                {/* EMAIL FIELD */}
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

                {/* PASSWORD FIELD */}
                <Field data-invalid={!!errors.password}>
                  <div className="flex items-center justify-between">
                    <FieldLabel>Password</FieldLabel>

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
                      placeholder="••••••••"
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

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer "
            //   disabled={isPending}
            >
                Sign in
              {/* {isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {isPending ? "Signing in..." : "Sign in"} */}
            </Button>
          </form>

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

export default SignIn;