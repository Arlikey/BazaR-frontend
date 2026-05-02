import { uiText } from "@/shared/config/ui-text";
import { useProductsByCategory } from "@/entities/product/queries";
import { toProduct } from "@/entities/product/model/ProductListItem";
import { ProductSection } from "../../../product-section/ProductSection";

export function TrendingProducts() {
  const { data: products, isLoading } = useProductsByCategory(
    "b379ad76-0bdc-4eec-b9c0-22a77123c56d",
  );

  if (!products || products.length <= 0) return null;

  const trendingProducts = products.slice(0, 8);

  return (
    <ProductSection
      title={uiText.home.trendingProductsTitle}
      products={trendingProducts.map((item) => toProduct(item))}
      isLoading={isLoading}
    />
  );
}
