const HISTORY_KEY = "search_history";
const MAX_HISTORY = 10;

export function useSearchHistory() {
  const getHistory = (): string[] => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
    } catch {
      return [];
    }
  };

  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    const history = getHistory().filter((h) => h !== query);
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify([query, ...history].slice(0, MAX_HISTORY)),
    );
  };

  const clearHistory = () => localStorage.removeItem(HISTORY_KEY);

  return { getHistory, addToHistory, clearHistory };
}
