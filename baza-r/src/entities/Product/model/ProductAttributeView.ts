export type ProductAttributeView = {
  attributeId: string;
  name: string;
  code: string;
  valueType: "Text" | "Number" | "Boolean" | "Select" | "MultiSelect";
  unit: string | null;
  sectionName: string;
  sectionOrder: number;
  sortOrder: number;
  textValue: string | null;
  numberValue: number | null;
  boolValue: boolean | null;
  optionId: string | null;
  optionIds: string[];
  options: { id: string; value: string }[];
};

export type ProductAttributesView = {
  productId: string;
  categoryId: string;
  attributes: ProductAttributeView[];
};