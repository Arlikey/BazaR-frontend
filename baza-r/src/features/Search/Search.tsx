import { useRef, useEffect } from "react";
import { useSearch } from "./model/useSearch";
import SearchInput from "./ui/SearchInput";
import SearchDropdown from "./ui/SearchDropdown";
import { Button } from "../../shared/components/ui/Button";
import { uiText } from "../../shared/config/ui-text";
import { createPortal } from "react-dom";

const Search = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
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
  } = useSearch();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setFocused]);

  const showDropdown =
    focused && (query.trim().length > 0 || history.length > 0);

  return (
    <div ref={containerRef} className="flex flex-1">
      <div
        className={`bg-surface z-50 flex h-10 flex-1 items-center justify-between rounded-[20px] ${showDropdown && "max-xl:absolute max-xl:top-1/2 max-xl:left-1/2 max-xl:w-[calc(100%-1rem)] max-xl:-translate-x-1/2 max-xl:-translate-y-1/2"}`}
      >
        <div className="relative flex h-full flex-1 items-center">
          <SearchInput
            query={query}
            setQuery={setQuery}
            onFocus={handleFocus}
            onSubmit={handleSubmit}
          />

          {showDropdown && (
            <SearchDropdown
              query={query}
              history={history}
              products={products}
              categories={categories}
              onSelect={handleSelect}
              onClearHistory={handleClearHistory}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        <div className="hidden h-full items-center md:flex">
          <Button
            color="secondary"
            className="h-full rounded-r-[20px] px-4 font-normal"
            onClick={handleSubmit}
          >
            <span className="capitalize">{uiText.search.submitLabel}</span>
          </Button>
        </div>
        {showDropdown &&
          createPortal(
            <div
              className="fixed inset-0 z-40 bg-black/40"
              onMouseDown={() => setFocused(false)}
            />,
            document.body,
          )}
      </div>
    </div>
  );
};

export default Search;
