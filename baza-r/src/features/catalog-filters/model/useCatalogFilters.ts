import { useState } from "react";
import type { CatalogFilters } from "./catalogFilters";

const EMPTY_FILTERS: CatalogFilters = {
  select: {},
  range: {},
  boolean: {},
  price: {
    min: null,
    max: null,
  },
};

export function useCatalogFilters() {
  const [filters, setFilters] = useState<CatalogFilters>(EMPTY_FILTERS);

  return { filters, setFilters };
}
