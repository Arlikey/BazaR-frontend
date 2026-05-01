import { uiText } from "../../../../shared/config/ui-text";
import { useRecentlyViewedProducts } from "../../../../entities/product/queries";
import { toProduct } from "../../../../entities/product/model/ProductListItem";
import { ProductSection } from "../../../product-section/ProductSection";

type Props = {
  slidesCount?: number;
};

export function RecentlyViewedProducts({ slidesCount }: Props) {
  const { data, isLoading } = useRecentlyViewedProducts();

  if (!data || data.items.length === 0) {
    return null;
  }

  return (
    <ProductSection
      title={uiText.home.recentlyViewedTitle}
      products={data?.items.map((item) => toProduct(item))}
      slidesCount={slidesCount}
      isLoading={isLoading}
    />
  );
}
