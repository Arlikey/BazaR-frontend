import { useMemo } from "react";
import type { Category } from "@/entities/category/model/Category";

type Props = {
  categories: Category[];
  value: string | null;
  onChange: (id: string | null) => void;
  excludeId?: string;
};

export function CascadingCategorySelect({
  categories,
  value,
  onChange,
  excludeId,
}: Props) {
  const childrenMap = useMemo(() => {
    const map = new Map<string | null, Category[]>();
    categories
      .filter((c) => c.id !== excludeId)
      .forEach((c) => {
        const key = c.parentId ?? null;
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(c);
      });
    return map;
  }, [categories, excludeId]);

  const chain = useMemo(() => {
    if (!value) return [];
    const path: string[] = [];
    let current: string | null = value;
    while (current) {
      path.unshift(current);
      const cat = categories.find((c) => c.id === current);
      current = cat?.parentId ?? null;
    }
    return path;
  }, [value, categories]);

  const levels = [null, ...chain];

  const handleSelect = (levelIndex: number, selectedId: string) => {
    if (selectedId === "") {
      if (levelIndex === 0) {
        onChange(null);
      } else {
        onChange(chain[levelIndex - 1]);
      }
    } else {
      onChange(selectedId);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {levels.map((parentId, index) => {
        const options = childrenMap.get(parentId) ?? [];
        if (options.length === 0) return null;

        const selectedAtThisLevel = chain[index] ?? "";

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-lg font-medium tracking-widest text-neutral-500 select-none">
                {"›".repeat(index)}
              </span>
            )}
            <select
              value={selectedAtThisLevel}
              onChange={(e) => handleSelect(index, e.target.value)}
              className="focus:ring-accent/80 flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
            >
              <option value="">
                {index === 0
                  ? "— Оберіть категорію —"
                  : "— Обрати підкатегорію —"}
              </option>
              {options.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
