const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

type ApiFailure = {
  success: false;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
};

export type AuthPayload = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
};

// ---------- Generic POST for auth endpoints ----------

type AuthPostPath =
  | "/api/auth/sign-in"
  | "/api/auth/sign-up"
  | "/api/auth/forgot-password"
  | "/api/auth/reset-password"
  | "/api/auth/verify-email"
  | "/api/auth/refresh-token"
  | "/api/auth/logout";

export async function postAuth<TBody = unknown, TData = AuthPayload>(
  path: AuthPostPath,
  body?: TBody,
): Promise<TData> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  const result = (await response.json()) as
    | ApiSuccess<TData>
    | ApiFailure;

  if (!response.ok || !result.success) {
    const errorMessage =
      "errors" in result
        ? result.errors?.[0]?.message
        : undefined;

    // Surface field validation messages first because they are the most useful.
    throw new Error(errorMessage ?? result.message ?? "Something went wrong");
  }

  return result.data;
}

// ---------- Generic GET for protected endpoints ----------

export async function getAuth<TData>(path: string): Promise<TData> {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  });

  // If 401, try to refresh the token once
  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      // Retry the request with the new token
      return getAuth<TData>(path);
    }
    // Refresh failed – clear local state and throw
    localStorage.removeItem("accessToken");
    throw new Error("Session expired. Please sign in again.");
  }

  const result = (await response.json()) as ApiSuccess<TData> | ApiFailure;

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? "Something went wrong");
  }

  return result.data;
}

// ---------- Refresh token helper ----------

let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshToken(): Promise<boolean> {
  // Deduplicate concurrent refresh attempts
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) return false;

      const json = (await res.json()) as ApiSuccess<{ accessToken: string }>;
      if (json.success && json.data.accessToken) {
        localStorage.setItem("accessToken", json.data.accessToken);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ---------- Logout helper ----------

export async function logout(): Promise<void> {
  try {
    await postAuth("/api/auth/logout");
  } catch {
    // Swallow – we clear local state regardless.
  }
  localStorage.removeItem("accessToken");
}
