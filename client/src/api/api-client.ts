const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api"
).replace(/\/+$/, "")

export type ApiRequestOptions = RequestInit & {
  accessToken?: string | null
   _retry?: boolean
}

export class ApiError extends Error {
  readonly status: number
  readonly data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

async function parseResponse(response: Response): Promise<unknown> {
  
  if (response.status === 204) {
    return undefined
  }

  const contentType = response.headers.get("content-type")

  if (contentType?.includes("application/json")) {
    try {
      return await response.json()
    } catch {
      return undefined
    }
  }

  return response.text()
}

function getErrorMessage(data: unknown, status: number): string {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message
  }

  return `Request failed with status ${status}`
}

export async function apiRequest<T = unknown>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { accessToken, headers, ...requestOptions } = options
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  const requestHeaders = new Headers(headers)

  if (accessToken) {
    requestHeaders.set("Authorization", `Bearer ${accessToken}`)
  }

  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    ...requestOptions,
    headers: requestHeaders,
    credentials: "include",
  })

  const data = await parseResponse(response)

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(data, response.status),
      response.status,
      data
    )
  }

  return data as T
}

export function apiPost<T = unknown>(
  path: string,
  body: unknown,
  options: ApiRequestOptions = {}
): Promise<T> {
  const headers = new Headers(options.headers)

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  return apiRequest<T>(path, {
    ...options,
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
}
