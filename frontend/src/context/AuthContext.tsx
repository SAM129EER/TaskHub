import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authApi } from "@/api/auth.api";
import type { User } from "@/types/auth";
import { setAccessToken, getAccessToken, clearAccessToken } from "@/lib/token";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (payload: Record<string, unknown>) => Promise<void>;
  signUp: (payload: Record<string, unknown>) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await authApi.getCurrentUser();
      setUser(data.user);
    } catch {
      clearAccessToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const signIn = async (payload: Record<string, unknown>) => {
    const data = await authApi.signIn(payload);
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const signUp = async (payload: Record<string, unknown>) => {
    const data = await authApi.signUp(payload);
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    await authApi.logout();
    clearAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

