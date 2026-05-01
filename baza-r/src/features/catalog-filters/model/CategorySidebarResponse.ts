export type AttributeFacetOption = {
  value: string;
  label: string;
  count: number;
  selected: boolean;
};

export type FilterFacet = {
  kind: "attribute" | "system";

  attributeId?: string;

  code: string;
  name: string;

  type: "select" | "range" | "boolean";

  unit?: string;

  sectionName: string;
  sectionOrder: number;
  sortOrder: number;

  options: AttributeFacetOption[];

  min?: number;
  max?: number;
};

export type CategorySidebarResponse = {
  categoryId: string;
  facets: FilterFacet[];
};
