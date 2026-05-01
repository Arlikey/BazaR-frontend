import type { Category } from "@/entities/category/model/Category";
import { AltCatalogIcon } from "@/shared/components/icons/ui/AltCatalogIcon";
import CustomLink from "@/shared/components/ui/CustomLink";
import IconWrapper from "@/shared/components/ui/IconWrapper";
import type { ProductListItem } from "@/entities/product/model/ProductListItem";

import placeholder from "@/shared/assets/images/placeholder.webp";
import {
  formatPrice,
  getCurrencySymbol,
} from "@/shared/lib/formatMoney";

type Props = {
  query: string;
  products: ProductListItem[];
  categories: Category[];
};

export function SearchProducts({ query, products, categories }: Props) {
  const q = query.toLowerCase();

  const matchedCategories = categories
    .filter((c) => c.name.toLowerCase().includes(q))
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-2 px-5.5">
      <div className="flex flex-col">
        {products.map((s) => (
          <CustomLink
            key={s.id}
            to={`/product/${s.id}`}
            className="hover:text-accent flex flex-1 items-center gap-4 py-2 text-left underline-offset-3 transition hover:underline"
          >
            <img
              src={s.mainImageUrl ?? placeholder}
              className="w-12"
              onError={(e) => (e.currentTarget.src = placeholder)}
            />
            <span className="flex flex-col text-base">
              {s.name}
              {s.offer && (
                <span className="font-medium">
                  <span>{formatPrice(s.offer?.priceAmount)}</span>
                  <span className="ml-1">
                    {getCurrencySymbol(s.offer?.priceCurrency)}
                  </span>
                </span>
              )}
            </span>
          </CustomLink>
        ))}
      </div>

      {matchedCategories.length > 0 && (
        <div>
          <div className="mb-1 text-sm">Перейти у категорію</div>
          {matchedCategories.map((c) => (
            <CustomLink
              key={c.id}
              to={`/catalog/${c.id}`}
              className="flex items-center gap-3 py-2"
            >
              <IconWrapper size={20} className="text-accent">
                <AltCatalogIcon />
              </IconWrapper>
              <span className="text-base">{c.name}</span>
            </CustomLink>
          ))}
        </div>
      )}
    </div>
  );
}
