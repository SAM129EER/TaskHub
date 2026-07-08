import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { postAuth } from "@/lib/api";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );
  const [errorMessage, setErrorMessage] = useState(
    token ? "" : "Verification token is missing.",
  );

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        await postAuth("/api/auth/verify-email", { token });
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Verification failed",
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-xl">
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
            {status === "loading" && (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="text-lg font-medium">Verifying your email…</p>
                <p className="text-sm text-muted-foreground">
                  Please wait while we confirm your email address.
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Email verified!</h2>
                  <p className="text-sm text-muted-foreground">
                    Your email has been successfully verified. You can now access
                    all features of TaskHub.
                  </p>
                </div>

                <Button
                  asChild
                  className="mt-2 bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Link to="/sign-in">Go to Sign In</Link>
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">
                    Verification failed
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {errorMessage}
                  </p>
                </div>

                <Button asChild variant="outline" className="mt-2">
                  <Link to="/sign-in">Back to sign in</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
