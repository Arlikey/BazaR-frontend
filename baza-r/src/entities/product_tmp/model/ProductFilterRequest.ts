export type ProductFilterRequest = {
  selectFilters?: {
    attributeId: string;
    optionIds: string[];
  }[];

  multiSelectFilters?: {
    attributeId: string;
    optionIds: string[];
  }[];

  booleanFilters?: {
    attributeId: string;
    value: boolean;
  }[];

  numberRangeFilters?: {
    attributeId: string;
    min?: number;
    max?: number;
  }[];

  brandIds?: string[];
  sellerGroups?: string[];

  priceMin?: number;
  priceMax?: number;

  page?: number;
  pageSize?: number;
  sortBy?: string;
};