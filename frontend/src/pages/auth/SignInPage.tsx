import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { signInSchema, type SignInInput } from "@/lib/schemas";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckSquare, Loader2, Lock, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const SignInPage: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInInput) => {
    setErrorMsg(null);

    try {
      await signIn(data);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err: any) {
      const msg = err.message || "Failed to sign in. Please check your credentials.";
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center p-4 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-transparent blur-[100px] rounded-full pointer-events-none -z-10" />

      <Card className="w-full max-w-md shadow-2xl rounded-3xl border-border/80 bg-card/75 backdrop-blur-xl transition-all">
        <CardHeader className="space-y-2 text-center pb-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 mb-1">
            <CheckSquare className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Sign in to your TaskHub workspace to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errorMsg && (
              <div className="rounded-xl bg-destructive/10 p-3.5 text-xs text-destructive font-medium border border-destructive/20 animate-in fade-in">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-10 rounded-xl bg-background/50 focus:bg-background transition-all"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive font-medium pt-0.5">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-10 rounded-xl bg-background/50 focus:bg-background transition-all"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-destructive font-medium pt-0.5">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.01]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                </>
              ) : (
                <span className="flex items-center gap-1.5">
                  Sign In <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t py-4 text-xs text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/sign-up" className="ml-1 text-primary font-semibold hover:underline">
            Create an account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
