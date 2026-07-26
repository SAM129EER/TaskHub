/**
 * guest-route.tsx — Route guard that requires NO authentication.
 *
 * Used as a layout route wrapper for sign-in, sign-up, etc.
 * Redirects already-authenticated users to the home page.
 * Shows a loading spinner while auth state is being determined.
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { PageLoader } from "@/components/ui/page-loader";
import { SuspenseBoundary } from "@/components/suspense-boundary";

export default function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader className="min-h-screen" label="Checking authorization..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <SuspenseBoundary>
      <Outlet />
    </SuspenseBoundary>
  );
}
