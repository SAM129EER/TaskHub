/**
 * protected-route.tsx — Route guard that requires authentication.
 *
 * Used as a layout route wrapper. Redirects unauthenticated users
 * to /sign-in. Shows a loading spinner while auth state is being
 * determined on first load.
 */

import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
