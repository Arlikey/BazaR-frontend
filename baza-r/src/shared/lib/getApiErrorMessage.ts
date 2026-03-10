export function getApiErrorMessage(err: unknown, fallback = "Щось пішло не так"): string {
  const e = err as { status: number; body: { detail?: string; title?: string } | null };
  return e?.body?.detail ?? e?.body?.title ?? fallback;
}