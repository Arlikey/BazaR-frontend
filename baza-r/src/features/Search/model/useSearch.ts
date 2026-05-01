import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSearchHistory } from "./useSearchHistory";
import { useCatalogCategories } from "../../../widgets/catalog/model/useCategories";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { useSearchSuggestions } from "./useSearchSuggestions";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const location = useLocation();

  const navigate = useNavigate();
  const { getHistory, addToHistory, clearHistory } = useSearchHistory();
  const { flat: categories } = useCatalogCategories();

  const debouncedQuery = useDebounce(query, 300);

  const { data: searchResult } = useSearchSuggestions(debouncedQuery);

  const products = searchResult?.items ?? [];

  const handleFocus = () => {
    setHistory(getHistory());
    setFocused(true);
  };

  const handleSelect = (query: string) => {
    addToHistory(query);
    setFocused(false);
  };

  const handleSubmit = () => {
    if (!query.trim()) return;

    const active = document.activeElement as HTMLElement;
    active?.blur();

    addToHistory(query.trim());
    setFocused(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  useEffect(() => {
    setFocused(false);
  }, [location.pathname]);

  return {
    query,
    setQuery,
    focused,
    setFocused,
    history,
    products,
    categories,
    handleSelect,
    handleFocus,
    handleSubmit,
    handleClearHistory,
  };
}
