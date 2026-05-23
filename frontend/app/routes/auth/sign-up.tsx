import { signUpSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Button } from "@/components/ui/button";

import { Link, useNavigate } from "react-router";

// import { useSignUpMutation } from "@/hooks/use-auth";

import { toast } from "sonner";

import { Loader2 } from "lucide-react";

export type SignupFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const handleOnSubmit = () => {};

  //   const { mutate, isPending } = useSignUpMutation();

  //   const handleOnSubmit = (values: SignupFormData) => {
  //     mutate(values, {
  //       onSuccess: () => {
  //         toast.success("Email Verification Required", {
  //           description:
  //             "Please check your email for a verification link.",
  //         });

  //         reset();

  //         navigate("/sign-in");
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
            Create an account
          </CardTitle>

          <CardDescription>
            Start managing your tasks efficiently
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
            <FieldSet>
              <FieldGroup>
                {/* NAME */}
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

                {/* EMAIL */}
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

                {/* PASSWORD */}
                <Field data-invalid={!!errors.password}>
                  <FieldLabel>Password</FieldLabel>

                  <FieldContent>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...register("password")}
                    />

                    {errors.password && (
                      <FieldError>{errors.password.message}</FieldError>
                    )}
                  </FieldContent>
                </Field>

                {/* CONFIRM PASSWORD */}
                <Field data-invalid={!!errors.confirmPassword}>
                  <FieldLabel>Confirm Password</FieldLabel>

                  <FieldContent>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
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
              className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer "
              // disabled={isPending}
            >
                Create account
              {/* {isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )} */}

              {/* {isPending ? "Creating account..." : "Create account"} */}
            </Button>
          </form>

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

export default SignUp;
