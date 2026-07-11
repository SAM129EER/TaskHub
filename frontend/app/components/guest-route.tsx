/**
 * guest-route.tsx — Route guard that requires NO authentication.
 *
 * Used as a layout route wrapper for sign-in, sign-up, etc.
 * Redirects already-authenticated users to the home page.
 * Shows a loading spinner while auth state is being determined.
 */

import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export default function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
