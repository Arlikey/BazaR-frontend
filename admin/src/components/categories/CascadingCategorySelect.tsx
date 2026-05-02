import { useMemo } from "react";
import { type CategoryDto } from "../../api/categoryApi";

type Props = {
  categories: CategoryDto[];
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
    const map = new Map<string | null, CategoryDto[]>();
    categories
      .filter((c) => c.id !== excludeId)
      .forEach((c) => {
        const key = c.parentCategoryId ?? null;
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
      current = cat?.parentCategoryId ?? null;
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
              <span className="text-neutral-500 text-lg font-medium tracking-widest select-none">
                {"›".repeat(index)}
              </span>
            )}
            <select
              value={selectedAtThisLevel}
              onChange={(e) => handleSelect(index, e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
            >
              <option value="">
                {index === 0
                  ? "— Без батьківської —"
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
