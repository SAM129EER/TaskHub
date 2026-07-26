import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/api/auth.api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const EmailVerificationBanner: React.FC = () => {
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!user || user.emailVerified) return null;

  const handleResend = async () => {
    setIsSending(true);
    try {
      const res = await authApi.resendVerification();
      toast.success(res.message || "Verification email sent!");
      setSentSuccess(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to send verification email");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Alert variant="warning" className="mb-6 rounded-2xl border-amber-500/30 bg-amber-500/10 backdrop-blur-md">
      <Mail className="h-4 w-4" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
        <div>
          <AlertTitle className="text-amber-900 dark:text-amber-300 font-bold">
            Email Verification Required
          </AlertTitle>
          <AlertDescription className="text-amber-800 dark:text-amber-400 text-xs">
            Please verify your email address (<strong>{user.email}</strong>) to secure your account.
          </AlertDescription>
        </div>
        <div>
          {sentSuccess ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Email Sent
            </span>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={handleResend}
              disabled={isSending}
              className="border-amber-500/40 text-amber-900 dark:text-amber-200 hover:bg-amber-500/20 text-xs h-8 rounded-xl font-semibold"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> Sending...
                </>
              ) : (
                "Resend Link"
              )}
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
};
