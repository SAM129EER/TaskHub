import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "sonner";
import { SuspenseBoundary } from "@/components/suspense-boundary";

import HomePage from "@/pages/home/home-page";
import GuestRoute from "@/components/guest-route";
import ProtectedRoute from "@/components/protected-route";
import AuthLayoutPage from "@/pages/auth/auth-layout-page";

import SignInPage from "@/pages/auth/sign-in-page";
import SignUpPage from "@/pages/auth/sign-up-page";
import ForgotPasswordPage from "@/pages/auth/forgot-password-page";
import ResetPasswordPage from "@/pages/auth/reset-password-page";
import VerifyEmailPage from "@/pages/auth/verify-email-page";
import DashboardPage from "@/pages/dashboard/dashboard-page";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SuspenseBoundary className="min-h-screen">
          <Routes>
            {/* Public route */}
            <Route path="/" element={<HomePage />} />

            {/* Guest routes */}
            <Route element={<GuestRoute />}>
              <Route element={<AuthLayoutPage />}>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
              </Route>
            </Route>

            {/* Verify email route */}
            <Route path="/verify-email" element={<VerifyEmailPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Routes>
        </SuspenseBoundary>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}
