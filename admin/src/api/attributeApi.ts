import { api } from "./client";

export type AttributeDto = {
  id: string;
  name: string;
  code: string;
  valueType: 1 | 2 | 3 | 4 | 5;
  unit: string | null;
  isSystem: boolean;
};

export type AttributeOptionDto = {
  id: string;
  value: string;
  sortOrder: number;
};

export type CategoryAttributeTemplate = {
  attributeId: string;
  isRequired: boolean;
  isFilterable: boolean;
  sortOrder: number;
  sectionName: string;
  sectionOrder: number;
};

export const valueTypeLabels: Record<number, string> = {
  1: "Текст",
  2: "Число",
  3: "Булеве",
  4: "Вибір",
  5: "Мульти-вибір",
};

export const attributeApi = {
  getAll: () => api<AttributeDto[]>("/api/catalog/attributes"),
  getOptions: (id: string) =>
    api<AttributeOptionDto[]>(`/api/catalog/attributes/${id}/options`),
  create: (data: Omit<AttributeDto, "id">) =>
    api<AttributeDto>("/api/admin/attributes", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  addOptions: (
    attributeId: string,
    data: {
      value: string;
      sortOrder: number;
      options: { value: string; sortOrder: number }[];
    },
  ) =>
    api(`/api/admin/attributes/${attributeId}/options`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  assignToCategory: (
    categoryId: string,
    data: {
      attributeId: string;
      isRequired: boolean;
      isFilterable: boolean;
      sortOrder: number;
      sectionName: string;
      sectionOrder: number;
    },
  ) =>
    api(`/api/admin/catalog/categories/${categoryId}/attributes`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getCategoryTemplate: (categoryId: string) =>
    api<CategoryAttributeTemplate[]>(
      `/api/catalog/categories/${categoryId}/attributes-template`,
    ),
};
