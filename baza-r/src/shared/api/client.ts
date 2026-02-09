export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    credentials: "include",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw { status: res.status, body };
  }

  return res.json() as Promise<T>;
}
