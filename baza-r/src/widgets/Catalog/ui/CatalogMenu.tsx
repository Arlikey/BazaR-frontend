import { tv, type VariantProps } from "tailwind-variants";
import { CategoryItem } from "../../../entities/category/ui/CategoryItem";
import CategoryItemSkeleton from "../../../shared/components/ui/loaders/CategoryItemSkeleton";
import type { Category } from "../../../entities/category/model/Category";

const catalogMenu = tv({
  base: "bg-surface bw-thin border-neutral-100",
  variants: {
    variant: {
      sidebar: "max-w-81.25 rounded-xl px-6 py-3",
      mega: "px-2.5 py-2 rounded-[20px] max-w-75",
    },
  },
  defaultVariants: { variant: "sidebar" },
});

type Props = {
  className?: string;
  trailing?: React.ReactNode;

  categories: Category[];
  isLoading?: boolean;

  onCategoryHover?: (category: Category) => void;
  activeCategoryId?: Category["id"];
} & VariantProps<typeof catalogMenu>;

export default function CatalogMenu({
  className,
  trailing,
  variant,
  categories,
  isLoading,
  onCategoryHover,
  activeCategoryId,
}: Props) {
  return (
    <nav className={catalogMenu({ variant, className })}>
      <ul>
        {isLoading &&
          [...Array(8)].map((_, i) => (
            <li key={i}>
              <CategoryItemSkeleton />
            </li>
          ))}

        {!isLoading &&
          categories.map((category) => (
            <li key={category.id}>
              <CategoryItem
                category={category}
                to={`/catalog/${category.slug}`}
                intent="hoverable"
                className="rounded-sm"
                trailing={trailing}
                active={category.id === activeCategoryId}
                onHover={onCategoryHover}
                onFocusItem={onCategoryHover}
              />
            </li>
          ))}
      </ul>
    </nav>
  );
}
