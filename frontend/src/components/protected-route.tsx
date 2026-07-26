/**
 * protected-route.tsx — Route guard that requires authentication.
 *
 * Used as a layout route wrapper. Redirects unauthenticated users
 * to /sign-in. Shows a loading spinner while auth state is being
 * determined on first load.
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { PageLoader } from "@/components/ui/page-loader";
import { SuspenseBoundary } from "@/components/suspense-boundary";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader className="min-h-screen" label="Verifying session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <SuspenseBoundary>
      <Outlet />
    </SuspenseBoundary>
  );
}
