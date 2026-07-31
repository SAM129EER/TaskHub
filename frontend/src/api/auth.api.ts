import { api } from "@/lib/axios";
import type { User, AuthPayload } from "@/types/auth";
import { clearAccessToken } from "@/lib/token";

export const authApi = {
  signUp: async (payload: Record<string, unknown>): Promise<AuthPayload> => {
    const res = await api.post("/api/auth/sign-up", payload);
    return res.data.data;
  },

  signIn: async (payload: Record<string, unknown>): Promise<AuthPayload> => {
    const res = await api.post("/api/auth/sign-in", payload);
    return res.data.data;
  },

  getCurrentUser: async (): Promise<{ user: User }> => {
    const res = await api.get("/api/auth/me");
    return res.data.data;
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const res = await api.post("/api/auth/verify-email", { token });
    return res.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const res = await api.post("/api/auth/forgot-password", { email });
    return res.data;
  },

  resetPassword: async (
    payload: Record<string, unknown>,
  ): Promise<{ message: string }> => {
    const res = await api.post("/api/auth/reset-password", payload);
    return res.data;
  },

  resendVerification: async (): Promise<{ message: string }> => {
    const res = await api.post("/api/auth/resend-verification");
    return res.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // Ignore logout errors
    } finally {
      clearAccessToken();
    }
  },
};

