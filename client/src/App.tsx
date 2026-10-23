import { Navigate, Route, Routes } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout"
import ProtectedRoute from "@/components/ProtectedRoutes"

import SignInPage from "@/pages/auth/SignInPage"
import SignUpPage from "@/pages/auth/SignUpPage"
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage"
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage"
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage"
import ResendVerificationPage from "@/pages/auth/ResendVerificationPage"

import { useAuth } from "@/features/auth/context/AuthContext"

// Temporary page for testing protected routes and logout.
function DashboardTestPage() {
  const { user, logout } = useAuth()

  async function handleLogout() {
    try {
      await logout()
    } catch (error) {
      console.error("Logout request failed:", error)
    }
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background p-6 text-foreground">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <p>Welcome, {user?.name ?? "User"}!</p>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Log out
      </button>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Public authentication routes */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/resend-verification"
          element={<ResendVerificationPage />}
        />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardTestPage />} />
      </Route>

      {/* Unknown URLs */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  )
}
