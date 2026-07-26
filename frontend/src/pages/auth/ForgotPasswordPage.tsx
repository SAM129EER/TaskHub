import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/api/auth.api";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/schemas";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const ForgotPasswordPage: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      const res = await authApi.forgotPassword(data.email);
      toast.success(res.message || "Password reset link sent to your email!");
      setSubmittedEmail(data.email);
      setIsSent(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to request password reset.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-border/80">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>
            Enter your account email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSent ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset email to <strong>{submittedEmail}</strong>. Please check your inbox.
              </p>
              <Button variant="outline" className="w-full" onClick={() => setIsSent(false)}>
                Try another email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-9"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t py-4 text-xs text-muted-foreground">
          <Link to="/sign-in" className="flex items-center gap-1.5 text-primary hover:underline font-medium">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
