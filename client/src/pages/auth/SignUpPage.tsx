import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ApiError } from "@/api/api-client"
import { signUp } from "@/features/auth/api/auth.api"
import {
  signUpSchema,
  type SignUpFormValues,
} from "@/features/auth/schemas/auth.schema";

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type SignUpField = keyof SignUpFormValues

type BackendFieldError = {
  field: string
  message: string
}

function getBackendFieldErrors(data: unknown): BackendFieldError[] {
  if (
    typeof data !== "object" ||
    data === null ||
    !("errors" in data) ||
    !Array.isArray(data.errors)
  ) {
    return []
  }

  return data.errors.filter(
    (item): item is BackendFieldError =>
      typeof item === "object" &&
      item !== null &&
      "field" in item &&
      typeof item.field === "string" &&
      "message" in item &&
      typeof item.message === "string"
  )
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [serverError, setServerError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: SignUpFormValues) {
    setServerError("")
    setSuccessMessage("")
    clearErrors()

    try {
      const response = await signUp(values)
      setSuccessMessage(response.message)
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        const fieldErrors = getBackendFieldErrors(error.data)
        let hasFieldError = false

        for (const fieldError of fieldErrors) {
          const field = fieldError.field

          if (
            field === "name" ||
            field === "email" ||
            field === "password" ||
            field === "confirmPassword"
          ) {
            setError(field as SignUpField, {
              type: "server",
              message: fieldError.message,
            })
            hasFieldError = true
          }
        }

        if (!hasFieldError) {
          setServerError(error.message)
        }

        return
      }

      setServerError("Unable to connect to the server. Please try again.")
    }
  }

  return (
    <div className="rounded-xl border p-6 shadow-sm sm:p-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>

        <p className="text-sm text-muted-foreground">
          Get started with your TaskHub workspace.
        </p>
      </div>

      {successMessage ? (
        <div role="status" className="space-y-4">
          <p className="text-sm text-green-700 dark:text-green-400">
            {successMessage}
          </p>

          <p className="text-sm text-muted-foreground">
            Check your inbox for the verification email before signing in.
          </p>

          <Button className="w-full">
            <Link to="/signin">Go to sign in</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="signup-name">Full name</FieldLabel>
              <Input
                id="signup-name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />
              {errors.name?.message && (
                <p role="alert" className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="signup-email">Email address</FieldLabel>
              <Input
                id="signup-email"
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
              <FieldLabel htmlFor="signup-password">Password</FieldLabel>

              <div className="relative">
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
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

            <Field>
              <FieldLabel htmlFor="signup-confirm-password">
                Confirm password
              </FieldLabel>

              <div className="relative">
                <Input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  className="pr-10"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword")}
                />

                <button
                  type="button"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {errors.confirmPassword?.message && (
                <p role="alert" className="text-sm text-destructive">
                  {errors.confirmPassword.message}
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
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      )}

      {!successMessage && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      )}
    </div>
  )
}
