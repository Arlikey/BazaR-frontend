import { PAGE_SIZE } from "../../../shared/model/constants";
import type { CatalogFilters } from "./catalogFilters";

export function buildFilterRequest(filters: CatalogFilters) {
  const selectEntries = Object.entries(filters.select || {});

  const selectFilters = [];
  const sellerGroups: string[] = [];

  for (const [key, optionIds] of selectEntries) {
    if (key === "seller") {
      sellerGroups.push(...optionIds);
      continue;
    }

    selectFilters.push({
      attributeId: key,
      optionIds,
    });
  }

  const numberRangeFilters = Object.entries(filters.range || {})
    .filter(([key]) => key !== "price")
    .map(([attributeId, range]) => ({
      attributeId,
      min: range.min,
      max: range.max,
    }));

  return {
    selectFilters,

    multiSelectFilters: [],
    booleanFilters: [],

    numberRangeFilters,

    textFilters: [],

    brandIds: [],

    sellerGroups,

    priceMin: filters.price.min ?? undefined,
    priceMax: filters.price.max ?? undefined,

    page: filters.page,
    pageSize: PAGE_SIZE,
  };
}
