import type { CategoryDto } from "../../api/categoryApi";
import { useNavigate } from "react-router";
import type { CategoryNode } from "../../utils/buildCategoryTree";
import { CategoryRow } from "./CategoryRow";

type Props = {
  tree: CategoryNode[];
  categories: CategoryDto[];
  filtered: CategoryDto[];
  isSearching: boolean;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function CategoryTable({ tree, categories, filtered, isSearching, expandedIds, onToggle, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm table-fixed">
        <thead className="bg-gray-50 border-b border-neutral-100">
          <tr>
            <th className="text-left px-6 py-3 font-medium text-gray-600 w-1/3">Назва</th>
            <th className="text-left px-6 py-3 font-medium text-gray-600 w-1/3">Батьківська категорія</th>
            <th className="text-left px-6 py-3 font-medium text-gray-600 w-24">Порядок</th>
            <th className="px-6 py-3 w-48"></th>
          </tr>
        </thead>
        <tbody>
          {isSearching ? (
            filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">Нічого не знайдено</td>
              </tr>
            ) : (
              filtered.map((cat) => (
                <tr key={cat.id} className="border-b border-neutral-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium truncate">{cat.name}</td>
                  <td className="px-6 py-3 text-gray-500 text-sm">
                    {cat.parentCategoryId
                      ? (categories.find((c) => c.id === cat.parentCategoryId)?.name ?? "—")
                      : "—"}
                  </td>
                  <td className="px-6 py-3 text-gray-500 text-sm">{cat.sortOrder}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex gap-3 justify-end underline-offset-4">
                      <button onClick={() => navigate(`/categories/${cat.id}/attributes`)} className="text-blue-600 hover:underline text-sm font-medium">Атрибути</button>
                      <button onClick={() => navigate(`/categories/${cat.id}/edit`)} className="text-accent hover:underline text-sm font-medium">Редагувати</button>
                      <button onClick={() => onDelete(cat.id)} className="text-red-500 hover:underline text-sm font-medium">Видалити</button>
                    </div>
                  </td>
                </tr>
              ))
            )
          ) : (
            tree.map((node) => (
              <CategoryRow
                key={node.id}
                node={node}
                categories={categories}
                depth={0}
                expandedIds={expandedIds}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}