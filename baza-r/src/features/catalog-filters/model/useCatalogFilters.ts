import { useState } from "react";
import type { CatalogFilters } from "./catalogFilters";

const EMPTY_FILTERS: CatalogFilters = {
  select: {},
  range: {},
  boolean: {},
  price: { min: null, max: null },
  page: 1,
};

export function useCatalogFilters() {
  const [filters, setFilters] = useState<CatalogFilters>(EMPTY_FILTERS);

  function setFiltersAndReset(
    updater:
      | Partial<CatalogFilters>
      | ((prev: CatalogFilters) => CatalogFilters),
  ) {
    setFilters((prev) => {
      const next =
        typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      return { ...next, page: 1 };
    });
  }

  return { filters, setFilters, setFiltersAndReset };
}
