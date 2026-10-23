import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ApiError } from "@/api/api-client"
import { signIn } from "@/features/auth/api/auth.api"
import { useAuth } from "@/features/auth/context/AuthContext"
import {
  signInSchema,
  type SignInFormValues,
} from "@/features/auth/schemas/auth.schema"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState("")

  const { isAuthenticated, setSession } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SignInFormValues) {
    setServerError("")

    try {
      const response = await signIn(values)

      setSession(response.data.user, response.data.accessToken)
      navigate("/dashboard", { replace: true })
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        setServerError(error.message)
      } else {
        setServerError("Unable to connect to the server. Please try again.")
      }
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="rounded-xl border p-6 shadow-sm sm:p-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>

        <p className="text-sm text-muted-foreground">
          Sign in to continue to your TaskHub workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email?.message && (
              <p role="alert" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </Field>

          <Field>
            <div className="flex items-center justify-between gap-3">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="pr-10"
                aria-invalid={Boolean(errors.password)}
                {...register("password")}
              />

              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>

            {errors.password?.message && (
              <p role="alert" className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </Field>

          {serverError && (
            <p role="alert" className="text-sm text-destructive">
              {serverError}
            </p>
          )}

          <Field>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
      <p className="text-center text-sm text-muted-foreground">
        Haven't received your verification email?{" "}
        <Link
          to="/resend-verification"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Resend it
        </Link>
      </p>
    </div>
  )
}
