import ProductCardSkeleton from "../../../../shared/components/ui/loaders/ProductCardSkeleton";
import { Section } from "../../../../shared/components/ui/product-section/ui/Section";
import { ProductCardCompact } from "../../../product-card/ProductCardCompact";
import { uiText } from "../../../../shared/config/ui-text";
import {
  useProductsByCategory,
  useRecentlyViewedProducts,
} from "../../../../entities/product/queries";
import { toProduct } from "../../../../entities/product/model/ProductListItem";
import CustomLink from "../../../../shared/components/ui/CustomLink";
// import { useRecentlyViewedProducts } from "../../../../features/recently-viewed/useRecentlyViewedProducts";
import { ProductsGrid } from "../../../product-grid/ui/ProductGrid";
import { ProductSection } from "../../../product-section/ProductSection";

type Props = {
  slidesCount?: number;
};

export function RecentlyViewedProducts({ slidesCount }: Props) {
  const { data, isLoading } = useRecentlyViewedProducts();
  //const { data: products = [], isLoading } = { isLoading: true, data: [] };

  if (!data || data.items.length === 0) {
    return null;
  }

  return (
    <ProductSection
      title={uiText.home.recentlyViewedTitle}
      products={data?.items.map(toProduct)}
      slidesCount={slidesCount}
      isLoading={isLoading}
    />
  );
}
