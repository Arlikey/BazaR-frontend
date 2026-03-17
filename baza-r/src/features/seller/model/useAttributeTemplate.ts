import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { sellerProductApi } from "../api/sellerProductApi";

export function useAttributeTemplate(categoryId: string | undefined) {
  const { data: template = [] } = useQuery({
    queryKey: ["attributes-template", categoryId],
    queryFn: () => sellerProductApi.getAttributeTemplate(categoryId!),
    enabled: !!categoryId,
  });

  const { data: allAttributes = [] } = useQuery({
    queryKey: ["attributes"],
    queryFn: () => sellerProductApi.getAttributes(),
    staleTime: 5 * 60 * 1000,
  });

  const enrichedTemplate = useMemo(() => {
    return template.map((t) => {
      const attr = allAttributes.find((a) => a.id === t.attributeId);
      return {
        ...t,
        name: attr?.name ?? t.attributeId,
        valueType: (attr?.valueType ?? 1) as 1 | 2 | 3 | 4 | 5,
        options: [],
      };
    });
  }, [template, allAttributes]);

  const selectAttributeIds = useMemo(
    () => enrichedTemplate
      .filter((t) => t.valueType === 4 || t.valueType === 5)
      .map((t) => t.attributeId),
    [enrichedTemplate],
  );

  const { data: optionsMap = {} } = useQuery({
    queryKey: ["attribute-options", selectAttributeIds],
    queryFn: async () => {
      const entries = await Promise.all(
        selectAttributeIds.map(async (id) => {
          const opts = await sellerProductApi.getAttributeOptions(id);
          return [id, opts] as const;
        }),
      );
      return Object.fromEntries(entries);
    },
    enabled: selectAttributeIds.length > 0,
  });

  const templateWithOptions = useMemo(() => {
    return enrichedTemplate.map((t) => ({
      ...t,
      options: optionsMap[t.attributeId] ?? [],
    }));
  }, [enrichedTemplate, optionsMap]);

  const sections = useMemo(() => {
    const map = new Map<string, typeof templateWithOptions>();
    [...templateWithOptions]
      .sort((a, b) => a.sectionOrder - b.sectionOrder || a.sortOrder - b.sortOrder)
      .forEach((item) => {
        const key = item.sectionName ?? "Основне";
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(item);
      });
    return map;
  }, [templateWithOptions]);

  return { template, templateWithOptions, sections };
}