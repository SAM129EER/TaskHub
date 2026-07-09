/**
 * api.ts — Centralized API layer for the TaskHub frontend.
 *
 * This module provides typed helper functions (`postAuth`, `getAuth`, `logout`)
 * that wrap axios so every HTTP call in the app goes through a single,
 * well‑configured place. Benefits:
 *   • One base‑URL source of truth (VITE_API_URL env‑var or localhost fallback).
 *   • Automatic JSON serialization / deserialization via axios defaults.
 *   • Credentials (cookies) are always sent (`withCredentials: true`).
 *   • Transparent 401 → token‑refresh → retry flow in `getAuth`.
 *   • Consistent error extraction so callers just `catch (error)`.
 */

import axios, { type AxiosError } from "axios";

// ---------------------------------------------------------------------------
// Base URL — read from Vite environment variable; fall back to localhost:5000
// when running in local dev mode without a .env file.
// ---------------------------------------------------------------------------
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

// ---------------------------------------------------------------------------
// Axios instance — a pre‑configured client so we don't repeat config in every
// call. `withCredentials` ensures the refresh‑token cookie is sent/received.
// ---------------------------------------------------------------------------
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // send cookies (refresh token) with every request
});

// ---------------------------------------------------------------------------
// Response shape types — mirrors the JSON envelope the backend returns.
// ---------------------------------------------------------------------------

/** Shape of a successful API response wrapping generic data `T`. */
type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

/** Shape of a failed API response, optionally carrying field‑level errors. */
type ApiFailure = {
  success: false;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
};

// ---------------------------------------------------------------------------
// Auth payload — the data the backend returns after sign‑in / sign‑up.
// ---------------------------------------------------------------------------

/** The authenticated user object + short‑lived access token. */
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

// ---------------------------------------------------------------------------
// Allowed POST paths — a narrow union keeps call‑sites type‑safe so you
// can't accidentally hit a non‑existent endpoint.
// ---------------------------------------------------------------------------

type AuthPostPath =
  | "/api/auth/sign-in"
  | "/api/auth/sign-up"
  | "/api/auth/forgot-password"
  | "/api/auth/reset-password"
  | "/api/auth/verify-email"
  | "/api/auth/refresh-token"
  | "/api/auth/logout";

// ---------------------------------------------------------------------------
// postAuth — Generic POST helper for all authentication endpoints.
//
// Usage:
//   const data = await postAuth("/api/auth/sign-in", { email, password });
//
// On failure the function throws an Error whose message is the most useful
// string the backend provided (field error → top‑level message → fallback).
// ---------------------------------------------------------------------------

export async function postAuth<TBody = unknown, TData = AuthPayload>(
  path: AuthPostPath,
  body?: TBody,
): Promise<TData> {
  try {
    // axios automatically serializes `body` to JSON and parses the response.
    const { data: result } = await api.post<ApiSuccess<TData>>(path, body);

    // Even though axios resolved (2xx), double‑check the app‑level flag.
    if (!result.success) {
      throw new Error(result.message ?? "Something went wrong");
    }

    // Return only the nested data payload to the caller.
    return result.data;
  } catch (error) {
    // Re‑throw with the most descriptive message available.
    throw new Error(extractErrorMessage(error));
  }
}

// ---------------------------------------------------------------------------
// getAuth — Generic GET helper for protected (token‑bearing) endpoints.
//
// Flow:
//   1. Read the access token from localStorage.
//   2. Make a GET request with the Authorization header.
//   3. If the server replies 401, attempt a silent token refresh.
//   4. On successful refresh, retry the original request once.
//   5. If refresh also fails, clear local state and throw.
// ---------------------------------------------------------------------------

export async function getAuth<TData>(path: string): Promise<TData> {
  // Retrieve the current access token stored after sign‑in.
  const token = localStorage.getItem("accessToken");

  try {
    // Send the GET request, attaching the Bearer token if available.
    const { data: result } = await api.get<ApiSuccess<TData>>(path, {
      headers: {
        // Spread the Authorization header only when a token exists.
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    // Validate the app‑level success flag.
    if (!result.success) {
      throw new Error(result.message ?? "Something went wrong");
    }

    return result.data;
  } catch (error) {
    // Cast to AxiosError to inspect the HTTP status code.
    const axiosErr = error as AxiosError<ApiFailure>;

    // ------- 401 Unauthorized → try refreshing the token -------
    if (axiosErr.response?.status === 401) {
      const refreshed = await tryRefreshToken();

      if (refreshed) {
        // Token was renewed — retry the same request recursively.
        return getAuth<TData>(path);
      }

      // Refresh failed — session is dead; clean up and inform the caller.
      localStorage.removeItem("accessToken");
      throw new Error("Session expired. Please sign in again.");
    }

    // ------- Any other error — surface the backend message -------
    throw new Error(extractErrorMessage(error));
  }
}

// ---------------------------------------------------------------------------
// tryRefreshToken — Silently exchanges the httpOnly refresh‑token cookie for
// a new access token.
//
// Design note: `refreshPromise` is module‑scoped so that if multiple
// requests hit 401 at the same time they share a single refresh call
// instead of firing several in parallel.
// ---------------------------------------------------------------------------

/** Module‑level promise used to deduplicate concurrent refresh attempts. */
let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshToken(): Promise<boolean> {
  // If a refresh is already in flight, piggy‑back on it.
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      // POST to the refresh endpoint — the httpOnly cookie is sent automatically
      // because `withCredentials: true` is set on the axios instance.
      const { data: json } = await api.post<
        ApiSuccess<{ accessToken: string }>
      >("/api/auth/refresh-token");

      // Persist the new short‑lived access token.
      if (json.success && json.data.accessToken) {
        localStorage.setItem("accessToken", json.data.accessToken);
        return true;
      }

      return false;
    } catch {
      // Network error or 4xx/5xx — treat as refresh failure.
      return false;
    } finally {
      // Clear the deduplication lock so future 401s trigger a fresh refresh.
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ---------------------------------------------------------------------------
// logout — Signs the user out by hitting the backend logout endpoint and
// then clearing the local access token regardless of whether the API call
// succeeded (e.g. the server may already be unreachable).
// ---------------------------------------------------------------------------

export async function logout(): Promise<void> {
  try {
    // Notify the backend so it can revoke the refresh‑token cookie.
    await postAuth("/api/auth/logout");
  } catch {
    // Swallow — we always clear local state even if the network call fails.
  }

  // Remove the access token from localStorage to complete the logout.
  localStorage.removeItem("accessToken");
}

// ---------------------------------------------------------------------------
// extractErrorMessage — Utility that pulls the most useful error string out
// of an unknown `catch` value. It handles:
//   • AxiosError responses with the backend's JSON envelope
//   • Plain Error instances
//   • Completely unknown throwables (fallback string)
// ---------------------------------------------------------------------------

function extractErrorMessage(error: unknown): string {
  // Check if axios wrapped the error with a response body.
  const axiosErr = error as AxiosError<ApiFailure>;
  if (axiosErr?.response?.data) {
    const data = axiosErr.response.data;

    // Prefer field‑level validation messages — they are the most actionable.
    if ("errors" in data && data.errors?.[0]?.message) {
      return data.errors[0].message;
    }

    // Fall back to the top‑level message from the backend.
    if (data.message) {
      return data.message;
    }
  }

  // Plain JS Error (e.g. network failure).
  if (error instanceof Error) {
    return error.message;
  }

  // Last resort — generic fallback.
  return "Something went wrong";
}
