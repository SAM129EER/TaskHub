/**
 * verify-email-page.tsx — Email verification page for TaskHub.
 *
 * The user lands here after clicking the verification link in their
 * email. The page reads the `?token=…` query parameter and immediately
 * sends it to the backend for validation. Three states are rendered:
 *   1. **loading** — spinner while the verification request is in flight
 *   2. **success** — green check‑mark with a link to sign‑in
 *   3. **error**   — red X with the error message from the backend
 *
 * Key libraries:
 *   • postAuth (axios) — sends the token to the verify‑email endpoint
 */

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { postAuth } from "@/lib/api";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
  // Extract the verification token from the URL query string.
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  // Current verification status — starts as "loading" when a token is present,
  // or "error" immediately if the token is missing.
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );

  // Error message to display when verification fails.
  const [errorMessage, setErrorMessage] = useState(
    token ? "" : "Verification token is missing.",
  );

  /**
   * useEffect — Fires once on mount to send the token to the backend.
   * The dependency array includes `token` so the effect re‑runs if
   * the URL changes (unlikely but safe).
   */
  useEffect(() => {
    // If there's no token we already set the error state above.
    if (!token) return;

    const verify = async () => {
      try {
        // POST the verification token to the backend via axios.
        await postAuth("/api/auth/verify-email", { token });

        // Mark verification as successful.
        setStatus("success");
      } catch (err) {
        // Mark as failed and capture the error message.
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

            {/* ---------- Loading state ---------- */}
            {status === "loading" && (
              <>
                {/* Spinning loader icon while the request is pending. */}
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="text-lg font-medium">Verifying your email…</p>
                <p className="text-sm text-muted-foreground">
                  Please wait while we confirm your email address.
                </p>
              </>
            )}

            {/* ---------- Success state ---------- */}
            {status === "success" && (
              <>
                {/* Green circle icon indicating success. */}
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

                {/* Navigate the user to sign‑in. */}
                <Button
                  asChild
                  className="mt-2 bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Link to="/sign-in">Go to Sign In</Link>
                </Button>
              </>
            )}

            {/* ---------- Error state ---------- */}
            {status === "error" && (
              <>
                {/* Red circle icon indicating failure. */}
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

                {/* Link back to sign‑in as a fallback action. */}
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
