import { uiText } from "@/shared/config/ui-text";
import { useProductsByCategory } from "@/entities/product/queries";
import { toProduct } from "@/entities/product/model/ProductListItem";
import { ProductSection } from "../../../product-section/ProductSection";

export function TrendingProducts() {
  const { data: products, isLoading } = useProductsByCategory(
    "7a8fa541-8603-464a-863e-7bd41420b241",
  );

  if (!products || products.length <= 0) return null;

  return (
    <ProductSection
      title={uiText.home.trendingProductsTitle}
      products={products.map((item) => toProduct(item))}
      isLoading={isLoading}
    />
  );
}
