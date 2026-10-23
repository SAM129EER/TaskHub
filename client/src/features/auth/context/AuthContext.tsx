
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AuthUser } from "@/features/auth/api/auth.api";

import {
  getCurrentUser,
  refreshAccessToken,
  logout as logoutRequest,
} from "@/features/auth/api/auth.api";

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (user: AuthUser, accessToken: string) => void;
  clearSession: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setSession = useCallback(
    (nextUser: AuthUser, nextAccessToken: string) => {
      setUser(nextUser);
      setAccessToken(nextAccessToken);
    },
    [],
  );

  const clearSession = useCallback(() => {
    setUser(null);
    setAccessToken(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const refreshResponse = await refreshAccessToken();

        if (cancelled) return;

        const token = refreshResponse.data.accessToken;
        const userResponse = await getCurrentUser(token);

        if (cancelled) return;

        setSession(userResponse.data.user, token);
      } catch {
        if (!cancelled) {
          clearSession();
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, [setSession, clearSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: user !== null && accessToken !== null,
      isLoading,
      setSession,
      clearSession,
      logout,
    }),
    [
      user,
      accessToken,
      isLoading,
      setSession,
      clearSession,
      logout,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
