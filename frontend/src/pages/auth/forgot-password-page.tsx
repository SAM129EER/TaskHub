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
import { postAuth } from "@/lib/api";
import { forgotPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { z } from "zod";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormData) => {
    try {
      await postAuth("/api/auth/forgot-password", values);
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
          <CardHeader className="gap-2 p-6 pb-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E9357B]">
              Account recovery
            </p>
            <CardTitle className="text-3xl font-semibold tracking-tight text-black">
              Forgot password?
            </CardTitle>
            <CardDescription className="text-base leading-7">
              Enter your email and we&apos;ll send a reset link.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-3">
            {isSuccess ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9357B]/10">
                  <MailCheck className="h-7 w-7 text-[#E9357B]" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-black">
                  Check your email
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-black/60">
                  If the account exists, a reset link has been sent.
                </p>
                <Button asChild variant="outline" className="mt-6 h-11 rounded-md">
                  <Link to="/sign-in">Back to sign in</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FieldSet>
                  <FieldGroup>
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
                        <FieldDescription>
                          Use the email linked to your TaskHub account.
                        </FieldDescription>
                        {errors.email && <FieldError>{errors.email.message}</FieldError>}
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
                  {isSubmitting ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
