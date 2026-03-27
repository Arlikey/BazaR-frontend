import type { Category } from "../../../entities/category/model/Category";
import type { ProductListItem } from "../../../entities/product/model/ProductListItem";
import { ArrowEnterIcon } from "../../../shared/components/icons/ui/ArrowEnterIcon";
import { ArrowIcon } from "../../../shared/components/icons/ui/ArrowIcon";
import CustomLink from "../../../shared/components/ui/CustomLink";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { SearchHistory } from "./SearchHistory";
import { SearchProducts } from "./SearchProducts";

type Props = {
  query: string;
  history: string[];
  products: ProductListItem[];
  categories: Category[];
  onClearHistory: () => void;
  onSubmit: () => void;
  onSelect: (query: string) => void;
};

export default function SearchDropdown({
  query,
  history,
  products,
  categories,
  onClearHistory,
  onSubmit,
  onSelect,
}: Props) {
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

  return (
    <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-2xl bg-white py-2">
      {hasQuery && (
        <CustomLink
          to={`/search?q=${encodeURIComponent(trimmedQuery)}`}
          onClick={() => onSelect(trimmedQuery)}
          className="hover:text-accent flex h-full w-full items-center gap-2 px-5.5 py-2 text-sm transition"
        >
          <span>
            Всі результати для «
            <span className="text-accent font-medium">{trimmedQuery}</span>»
          </span>
          <IconWrapper size={12}>
            <ArrowIcon />
          </IconWrapper>
        </CustomLink>
      )}
      {hasQuery ? (
        <SearchProducts
          query={query}
          products={products}
          categories={categories}
        />
      ) : (
        <SearchHistory
          history={history}
          onClear={onClearHistory}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}
