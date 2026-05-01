import { useParams } from "react-router";
import ProductDetails from "@/widgets/product-details/ui/ProductDetails";

export default function ProductPage() {
  const { productId } = useParams();
  if (!productId) return null;
  return (
    <div className="w-full">
      <ProductDetails productId={productId} />
    </div>
  );
}