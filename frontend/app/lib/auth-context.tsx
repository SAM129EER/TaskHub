/**
 * auth-context.tsx — Global authentication state for TaskHub.
 *
 * Provides an AuthProvider that wraps the app and exposes auth state
 * (user, isLoading, isAuthenticated) plus actions (login, logout,
 * refreshUser) via the useAuth() hook.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { getAuth, logout as apiLogout } from "./api";
import type { AuthPayload } from "./api";

/** Shape of the value provided by AuthContext. */
type AuthContextType = {
  user: AuthPayload["user"] | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string, user: AuthPayload["user"]) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * AuthProvider — Wraps the component tree and manages auth state.
 * On mount, checks localStorage for an existing token and validates
 * it by calling GET /api/auth/me.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthPayload["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = user !== null;

  // On mount: check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getAuth<{ user: AuthPayload["user"] }>("/api/auth/me");
        setUser(data.user);
      } catch {
        localStorage.removeItem("accessToken");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /** Called after successful sign-in or sign-up. */
  const login = useCallback(
    (accessToken: string, userData: AuthPayload["user"]) => {
      localStorage.setItem("accessToken", accessToken);
      setUser(userData);
    },
    [],
  );

  /** Signs the user out and clears all local state. */
  const logout = useCallback(async () => {
    await apiLogout();
    setUser(null);
  }, []);

  /** Re-fetches user data from the server (e.g. after email verification). */
  const refreshUser = useCallback(async () => {
    try {
      const data = await getAuth<{ user: AuthPayload["user"] }>("/api/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth — Hook to access the auth context from any component.
 * Must be used inside an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
