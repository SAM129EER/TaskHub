/**
 * dashboard-page.tsx — Main dashboard for authenticated users.
 *
 * Shows a welcome message, the user's verification status with a
 * resend button, and a logout action.
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { postAuth } from "@/lib/api";
import { Loader2, LogOut, MailCheck, MailWarning, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardPage = () => {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/sign-in");
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await postAuth("/api/auth/resend-verification");
      toast.success("Verification email sent! Check your inbox.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to resend email",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Email verification banner */}
        {user && !user.emailVerified && (
          <div className="flex items-center gap-3 rounded-lg border border-yellow-300/50 bg-yellow-50 px-4 py-3 text-sm dark:border-yellow-500/30 dark:bg-yellow-950/20">
            <MailWarning className="h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-400" />
            <p className="flex-1 text-yellow-800 dark:text-yellow-200">
              Your email is not verified. Please check your inbox or{" "}
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="inline-flex items-center gap-1 font-medium underline underline-offset-2 hover:no-underline disabled:opacity-50"
              >
                {isResending && (
                  <Loader2 className="h-3 w-3 animate-spin" />
                )}
                resend the verification email
              </button>
              .
            </p>
          </div>
        )}

        {user && user.emailVerified && (
          <div className="flex items-center gap-3 rounded-lg border border-green-300/50 bg-green-50 px-4 py-3 text-sm dark:border-green-500/30 dark:bg-green-950/20">
            <MailCheck className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
            <p className="text-green-800 dark:text-green-200">
              Email verified successfully.
            </p>
          </div>
        )}

        {/* Welcome card */}
        <Card className="rounded-lg border-black/10 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Welcome back, {user?.name}!
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is your TaskHub dashboard. Start managing your tasks and
              projects from here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
