const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL || "";

export interface ApiRequestOptions
  extends Omit<RequestInit, "headers" | "body"> {
  headers?: Record<string, string>;
  body?: unknown;
}

async function apiFetch<T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { headers = {}, body, ...restOptions } = options;

  let url = `${BASE_URL}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;

  if (EMAIL) {
    const urlObj = new URL(url);
    urlObj.searchParams.set("email", EMAIL);
    url = urlObj.toString();
  }

  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
    Accept: "",
  };

  const requestBody = body
    ? typeof body === "string"
      ? body
      : JSON.stringify(body)
    : undefined;

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: requestHeaders,
      body: requestBody,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API fetch error: ${error.message}`);
    }
    throw error;
  }
}

export const api = {
  get: <T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, "method" | "body">
  ) => apiFetch<T>(endpoint, { ...options, method: "GET" }),

  post: <T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<ApiRequestOptions, "method">
  ) => {
    const bodyWithEmail =
      typeof body === "object" && body !== null
        ? { ...(body as Record<string, unknown>), email: EMAIL }
        : { email: EMAIL };
    return apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: bodyWithEmail,
    });
  },

  delete: <T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, "method" | "body">
  ) => {
    const bodyWithEmail = { email: EMAIL };
    return apiFetch<T>(endpoint, {
      ...options,
      method: "DELETE",
      body: bodyWithEmail,
    });
  },
};
