// import { useEffect, useState } from "react";
// import ProductCardSkeleton from "@/shared/components/ui/loaders/ProductCardSkeleton";
// import { Section } from "@/shared/components/ui/product-section/ui/Section";
// import { tryCatch } from "@/shared/lib/try-catch";
// import { ProductCardCompact } from "@product-card/ProductCardCompact";
// import { ProductsGrid } from "@product-grid/ui/ProductGrid";
// import { uiText } from "@/shared/config/ui-text";
// import type { Product } from "@/entities/product/model/Product";

// export function RecommendedProducts() {
//   const [data, setData] = useState<Product[]>([]);
//   const [error, setError] = useState<Error | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const load = async () => {
//       setIsLoading(true);
//       const [items, err] = await tryCatch(ProductDao.getRecommendedProducts());
//       if (err) setError(err);
//       else setData(items ?? []);
//       setIsLoading(false);
//     };
//     load();
//   }, []);

//   return (
//     <Section
//       aria-label={uiText.home.recommendedProductsTitle}
//       title={uiText.home.recommendedProductsTitle}
//     >
//       {error ? (
//         <div className="text-error text-sm">{uiText.home.loadingError}</div>
//       ) : (
//         <ProductsGrid className="">
//           {isLoading
//             ? Array.from({ length: 5 }).map((_, i) => (
//                 <li key={i}>
//                   <ProductCardSkeleton className="h-75" />
//                 </li>
//               ))
//             : data.map((p) => (
//                 <li key={p.id} className="flex-1">
//                   <ProductCardCompact product={p} className="" />
//                 </li>
//               ))}
//         </ProductsGrid>
//       )}
//     </Section>
//   );
// }
