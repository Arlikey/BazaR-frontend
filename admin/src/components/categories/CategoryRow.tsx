import { useNavigate } from "react-router";
import type { CategoryDto } from "@api/categoryApi";
import IconWrapper from "@/shared/IconWrapper";
import { CaretIcon } from "@/shared/CaretIcon";
import type { CategoryNode } from "@utils/buildCategoryTree";

type Props = {
  node: CategoryNode;
  categories: CategoryDto[];
  depth: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
};

export function CategoryRow({
  node,
  categories,
  depth,
  expandedIds,
  onToggle,
}: Props) {
  const navigate = useNavigate();
  const hasChildren = node.children.length > 0;
  const open = expandedIds.has(node.id);

  return (
    <>
      <tr className="border-b border-neutral-100 hover:bg-gray-50">
        <td className="px-6 py-3 font-medium">
          <div
            className="flex items-center gap-2"
            style={{ paddingLeft: `${depth * 20}px` }}
          >
            {hasChildren ? (
              <button
                onClick={() => onToggle(node.id)}
                className="w-5 h-5 flex items-center justify-center text-black hover:text-accent shrink-0"
              >
                <IconWrapper className={open ? "" : "-rotate-90"}>
                  <CaretIcon />
                </IconWrapper>
              </button>
            ) : (
              <span className="w-5 h-5 shrink-0" />
            )}
            <span className="truncate">{node.name}</span>
          </div>
        </td>
        <td className="px-6 py-3 text-gray-500 text-sm">
          {node.parentCategoryId
            ? (categories.find((c) => c.id === node.parentCategoryId)?.name ??
              "")
            : ""}
        </td>
        <td className="px-6 py-3 text-gray-500 text-sm">{node.sortOrder}</td>
        <td className="px-6 py-3 text-right">
          <div className="flex gap-3 justify-end underline-offset-4">
            <button
              onClick={() => navigate(`/categories/${node.id}/attributes`)}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Атрибути
            </button>
            <button
              onClick={() => navigate(`/categories/${node.id}/image`)}
              className="text-accent hover:underline text-sm font-medium"
            >
              Редагувати
            </button>
          </div>
        </td>
      </tr>
      {open &&
        node.children.map((child) => (
          <CategoryRow
            key={child.id}
            node={child}
            categories={categories}
            depth={depth + 1}
            expandedIds={expandedIds}
            onToggle={onToggle}
          />
        ))}
    </>
  );
}
