import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { getAuth, logout as apiLogout, tryRefreshToken } from "./api";
import type { AuthPayload } from "./api";
import { setAccessToken, clearAccessToken } from "./token";

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
 * On mount, performs silent refresh via httpOnly refresh-token cookie
 * to obtain an in-memory access token and fetch current user profile.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthPayload["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = user !== null;

  // On mount: attempt silent token refresh using httpOnly cookie
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const refreshed = await tryRefreshToken();
        if (refreshed) {
          const data = await getAuth<{ user: AuthPayload["user"] }>("/api/auth/me");
          setUser(data.user);
        } else {
          clearAccessToken();
          setUser(null);
        }
      } catch {
        clearAccessToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /** Called after successful sign-in or sign-up. */
  const login = useCallback(
    (accessToken: string, userData: AuthPayload["user"]) => {
      setAccessToken(accessToken);
      setUser(userData);
    },
    [],
  );

  /** Signs the user out and clears all local/memory state. */
  const logout = useCallback(async () => {
    await apiLogout();
    clearAccessToken();
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

