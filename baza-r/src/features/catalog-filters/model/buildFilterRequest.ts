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

  const priceRange = filters.range["price"];

  return {
    selectFilters,

    multiSelectFilters: [],
    booleanFilters: [],

    numberRangeFilters,

    textFilters: [],

    brandIds: [],

    sellerGroups,

    priceMin: filters.price.min,
    priceMax: filters.price.max,

    page: 1,
    pageSize: 20,
  };
}
