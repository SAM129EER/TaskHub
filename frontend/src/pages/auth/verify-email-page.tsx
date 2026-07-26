import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { postAuth } from "@/lib/api";
import { ArrowLeft, CheckCircle2, Loader2, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
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
        setErrorMessage(err instanceof Error ? err.message : "Verification failed");
      }
    };

    verify();
  }, [token]);

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
          <CardContent className="p-6 text-center">
            {status === "loading" && (
              <>
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#E9357B]" />
                <h1 className="mt-5 text-3xl font-semibold tracking-tight text-black">
                  Verifying your email
                </h1>
                <p className="mx-auto mt-3 max-w-sm leading-7 text-black/60">
                  Please wait while we confirm your email address.
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9357B]/10">
                  <CheckCircle2 className="h-7 w-7 text-[#E9357B]" />
                </div>
                <h1 className="mt-5 text-3xl font-semibold tracking-tight text-black">
                  Email verified
                </h1>
                <p className="mx-auto mt-3 max-w-sm leading-7 text-black/60">
                  Your email has been verified. You can now access TaskHub.
                </p>
                <Button asChild className="mt-6 h-11 rounded-md bg-[#E9357B] text-white hover:bg-[#d82b70]">
                  <Link to="/sign-in">Go to sign in</Link>
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                  <XCircle className="h-7 w-7 text-red-600" />
                </div>
                <h1 className="mt-5 text-3xl font-semibold tracking-tight text-black">
                  Verification failed
                </h1>
                <p className="mx-auto mt-3 max-w-sm leading-7 text-black/60">
                  {errorMessage}
                </p>
                <Button asChild variant="outline" className="mt-6 h-11 rounded-md">
                  <Link to="/sign-in">Back to sign in</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
