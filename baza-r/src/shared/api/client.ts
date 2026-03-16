import { meQueryKey } from "../../entities/user/queries";
import { tokenStorage } from "../../features/auth/model/token.storage";
import { queryClient } from "../lib/queryClient";
import { useAuthStore } from "../model/auth.store";

const BASE_URL = "http://localhost:8080";

let isRefreshing = false;
let refreshQueue: Array<(success: boolean) => void> = [];

async function tryRefresh(): Promise<boolean> {
  const refreshToken = tokenStorage.getRefresh();
  if (!refreshToken) return false;

  try {
    const response = await fetch(BASE_URL + "/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      tokenStorage.clear();
      useAuthStore.getState().setAuthenticated(false);
      queryClient.removeQueries({ queryKey: meQueryKey });
      return false;
    }

    const tokens = await response.json();
    tokenStorage.set(tokens);
    useAuthStore.getState().setAuthenticated(true);
    return true;
  } catch {
    tokenStorage.clear();
    useAuthStore.getState().setAuthenticated(false);
    queryClient.removeQueries({ queryKey: meQueryKey });
    return false;
  }
}

export async function api<T = void>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(tokenStorage.getAccess()
        ? { Authorization: `Bearer ${tokenStorage.getAccess()}` }
        : {}),
      ...options?.headers,
    },
  });

  if (response.status === 401 && url !== "/api/auth/refresh") {
    if (isRefreshing) {
      const success = await new Promise<boolean>((resolve) =>
        refreshQueue.push(resolve),
      );
      if (!success)
        throw Object.assign(new Error("Unauthorized"), { status: 401 });
      return api<T>(url, options);
    }

    isRefreshing = true;
    const success = await tryRefresh();
    isRefreshing = false;

    refreshQueue.forEach((resolve) => resolve(success));
    refreshQueue = [];

    if (success) return api<T>(url, options);

    throw Object.assign(new Error("Unauthorized"), { status: 401 });
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
