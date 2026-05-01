import { useMemo } from "react";
import type { ProductAttributeView } from "../model/ProductAttributeView";
import { buildAttributeSections } from "../model/attributesSection";

export function useAttributeSections(attributes?: ProductAttributeView[]) {
  return useMemo(() => buildAttributeSections(attributes ?? []), [attributes]);
}
