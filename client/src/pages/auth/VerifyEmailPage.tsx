
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { ApiError } from "@/api/api-client";
import { verifyEmail } from "@/features/auth/api/auth.api";
import { Button } from "@/components/ui/button";

type VerificationStatus = "idle" | "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";

  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleVerify() {
    if (!token) {
      setStatus("error");
      setMessage("The verification link is missing its token.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await verifyEmail(token);
      setStatus("success");
      setMessage(response.message);
    } catch (error: unknown) {
      setStatus("error");

      if (error instanceof ApiError) {
        setMessage(error.message);
      } else {
        setMessage("Unable to connect to the server. Please try again.");
      }
    }
  }

  return (
    <div className="rounded-xl border p-6 text-center shadow-sm sm:p-8">
      <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <span className="text-2xl" aria-hidden="true">
          ✉
        </span>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight">
        {status === "success"
          ? "Email verified"
          : status === "error"
            ? "Verification failed"
            : "Verify your email"}
      </h1>

      <p className="mt-3 text-sm leading-6 text-muted-foreground" role="status">
        {message ||
          (status === "loading"
            ? "Verifying your email..."
            : "Confirm your email address to finish setting up your TaskHub account.")}
      </p>

      <div className="mt-6 space-y-3">
        {status !== "success" && (
          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={status === "loading" || !token}
          >
            {status === "loading"
              ? "Verifying..."
              : status === "error"
                ? "Try verification again"
                : "Verify email"}
          </Button>
        )}

        {status === "success" && (
          <Button  className="w-full">
            <Link to="/signin">Go to sign in</Link>
          </Button>
        )}

        {status === "error" && !token && (
          <Button  variant="outline" className="w-full">
            <Link to="/signin">Go to sign in</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
