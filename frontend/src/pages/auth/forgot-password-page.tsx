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
              Forgot password?
            </CardTitle>
            <CardDescription className="text-base text-black/60 font-medium">
              Enter your email and we&apos;ll send a reset link.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-4">
            {isSuccess ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9357B]/10">
                  <MailCheck className="h-7 w-7 text-[#E9357B]" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-black">
                  Check your email
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm text-black/60">
                  If an account exists for that email, a reset link has been sent.
                </p>
                <Button asChild variant="outline" className="mt-6 h-12 w-full rounded-full font-bold">
                  <Link to="/sign-in">Back to sign in</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FieldSet>
                  <FieldGroup>
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
                  </FieldGroup>
                </FieldSet>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-full bg-[#E9357B] text-base font-bold text-white shadow-md transition hover:bg-[#d82b70]"
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
