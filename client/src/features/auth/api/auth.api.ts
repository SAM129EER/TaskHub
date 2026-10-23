import { apiPost, apiRequest } from "@/api/api-client"
import type {
  SignUpFormValues,
  SignInFormValues,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from "@/features/auth/schemas/auth.schema";

export type AuthUser = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export type SignUpResponse = {
  success: boolean
  message: string
  data: {
    user: AuthUser
  }
}

export function signUp(input: SignUpFormValues): Promise<SignUpResponse> {
  return apiPost<SignUpResponse>("/auth/signup", input)
}

export type VerifyEmailResponse = {
  success: boolean
  message: string
}

export function verifyEmail(token: string): Promise<VerifyEmailResponse> {
  return apiPost<VerifyEmailResponse>("/auth/verify-email", { token })
}

export type SignInResponse = {
  success: boolean
  message: string
  data: {
    user: AuthUser
    accessToken: string
  }
}

export function signIn(input: SignInFormValues): Promise<SignInResponse> {
  return apiPost<SignInResponse>("/auth/signin", input)
}

export type RefreshTokenResponse = {
  success: boolean
  message: string
  data: {
    accessToken: string
  }
}

export type CurrentUserResponse = {
  success: boolean
  data: {
    user: AuthUser
  }
}

// Share one refresh request if React Strict Mode or multiple callers
// trigger session restoration at the same time.
let refreshPromise: Promise<RefreshTokenResponse> | null = null

export function refreshAccessToken(): Promise<RefreshTokenResponse> {
  if (!refreshPromise) {
    refreshPromise = apiPost<RefreshTokenResponse>(
      "/auth/refresh-token",
      {}
    ).finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

export function getCurrentUser(
  accessToken: string
): Promise<CurrentUserResponse> {
  return apiRequest<CurrentUserResponse>("/auth/me", {
    method: "GET",
    accessToken,
  })
}


export function logout(): Promise<void> {
  return apiPost("/auth/logout", {});
}


export type AuthMessageResponse = {
  success: boolean;
  message: string;
};

export function forgotPassword(
  input: ForgotPasswordFormValues,
): Promise<AuthMessageResponse> {
  return apiPost<AuthMessageResponse>("/auth/forgot-password", input);
}

export function resetPassword(
  input: ResetPasswordFormValues,
): Promise<AuthMessageResponse> {
  return apiPost<AuthMessageResponse>("/auth/reset-password", input);
}



export function resendVerification(
  email: string,
): Promise<AuthMessageResponse> {
  return apiPost<AuthMessageResponse>("/auth/resend-verification", {
    email,
  });
}
