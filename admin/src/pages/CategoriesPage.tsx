import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "../api/categoryApi";
import { CustomButton } from "../shared/CustomButton";
import { useNavigate } from "react-router";
import { useState, useMemo } from "react";
import { buildCategoryTree } from "../utils/buildCategoryTree";
import { CategoryTable } from "../components/categories/CategoryTable";

export function CategoriesPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAll,
  });

  const tree = useMemo(() => buildCategoryTree(categories), [categories]);

  const filtered = useMemo(
    () =>
      categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [categories, search],
  );

  const allParentIds = useMemo(
    () =>
      categories
        .filter((c) => categories.some((ch) => ch.parentCategoryId === c.id))
        .map((c) => c.id),
    [categories],
  );

  const onToggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isSearching = search.trim().length > 0;

  if (isLoading) return <p className="text-gray-500">Завантаження...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Категорії</h1>
        <CustomButton onClick={() => navigate("/categories/new")} color="green">
          + Додати категорію
        </CustomButton>
      </div>

      <div className="mb-4 flex items-center gap-3 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук категорії..."
          className="w-full max-w-sm border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
        />
        {!isSearching && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpandedIds(new Set(allParentIds))}
              className="text-sm text-gray-500 hover:text-gray-700 hover:underline underline-offset-4"
            >
              Розгорнути всі
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setExpandedIds(new Set())}
              className="text-sm text-gray-500 hover:text-gray-700 hover:underline underline-offset-4"
            >
              Згорнути всі
            </button>
          </div>
        )}
        {isSearching && (
          <span className="text-sm text-gray-400">
            Знайдено: {filtered.length} з {categories.length}
          </span>
        )}
      </div>

      <CategoryTable
        tree={tree}
        categories={categories}
        filtered={filtered}
        isSearching={isSearching}
        expandedIds={expandedIds}
        onToggle={onToggle}
      />
    </div>
  );
}
