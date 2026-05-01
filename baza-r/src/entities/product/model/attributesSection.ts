import { getAttributeValue } from "./getAttributeValue";
import type { ProductAttributeView } from "./ProductAttributeView";

export type SpecItem = {
  label: string;
  value: string;
};

export type AttributeSection = {
  name: string;
  order: number;
  specs: SpecItem[];
};

export function buildAttributeSections(
  attributes: ProductAttributeView[],
): AttributeSection[] {
  const map = new Map<string, AttributeSection>();

  for (const attr of attributes) {
    const value = getAttributeValue(attr);
    if (!value?.trim()) continue;

    if (!map.has(attr.sectionName)) {
      map.set(attr.sectionName, {
        name: attr.sectionName,
        order: attr.sectionOrder,
        specs: [],
      });
    }

    map.get(attr.sectionName)!.specs.push({
      label: attr.name,
      value,
    });
  }

  return Array.from(map.values()).sort((a, b) => a.order - b.order);
}
