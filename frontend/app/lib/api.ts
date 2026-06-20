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

export async function postAuth<TBody>(
  path: "/api/auth/sign-in" | "/api/auth/sign-up",
  body: TBody,
) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const result = (await response.json()) as ApiSuccess<AuthPayload> | ApiFailure;

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
