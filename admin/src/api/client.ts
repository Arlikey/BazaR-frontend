import { tokenStorage } from "./token.storage";

const BASE_URL = "https://bazar-api-agh9e3fegygfe7c0.westeurope-01.azurewebsites.net";

export async function api<T = void>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  const response = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(tokenStorage.getAccess()
        ? { Authorization: `Bearer ${tokenStorage.getAccess()}` }
        : {}),
      ...options?.headers,
    },
  });

  if (response.status === 401 && url !== "/api/auth/login") {
    tokenStorage.clear();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw Object.assign(new Error(body?.title ?? response.statusText), {
      status: response.status,
      body,
    });
  }

  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return undefined as T;
  }

  return response.json();
}
