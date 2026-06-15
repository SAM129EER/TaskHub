import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Verify your email</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Email verification is not connected to the backend yet. This route now
          renders as a valid module so React Router can build cleanly.
        </p>
        <Button asChild className="mt-6">
          <Link to="/sign-in">Back to sign in</Link>
        </Button>
      </div>
    </div>
  );
}
