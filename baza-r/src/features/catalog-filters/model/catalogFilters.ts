export type CatalogFilters = {
  select: Record<string, string[]>;
  range: Record<string, { min?: number; max?: number }>;
  boolean: Record<string, boolean>;
  price: {
    min: number | null;
    max: number | null;
  };
  page: number;
};