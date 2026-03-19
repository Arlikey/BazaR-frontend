// import { useEffect, useState } from "react";
// import ProductCardSkeleton from "../../../../shared/components/ui/loaders/ProductCardSkeleton";
// import { Section } from "../../../../shared/components/ui/product-section/ui/Section";
// import { ProductCardCompact } from "../../../product-card/ProductCardCompact";
// import type { Product } from "../../../../entities/product_old/model/Product";
// import ProductDao from "../../../../entities/product_old/api/__mocks__/ProductDao";
// import { tryCatch } from "../../../../shared/lib/try-catch";
// import { uiText } from "../../../../shared/config/ui-text";
// import { Button } from "../../../../shared/components/ui/Button";

// export function AwaitedProducts() {
//   const [data, setData] = useState<Product[]>([]);
//   const [error, setError] = useState<Error | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const load = async () => {
//       setIsLoading(true);

//       const [data, err] = await tryCatch(ProductDao.getAwaitedProducts());

//       if (err) setError(err);
//       else if (data) setData(data);

//       setIsLoading(false);
//     };

//     load();
//     return () => {};
//   }, []);

//   return (
//     <Section
//       aria-label={uiText.home.awaitedProductsTitle}
//       title={uiText.home.awaitedProductsTitle}
//     >
//       {isLoading && (
//         <div className="grid grid-cols-5 gap-4">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <ProductCardSkeleton key={i} className="h-64 rounded-xl" />
//           ))}
//         </div>
//       )}

//       {error && (
//         <div className="text-error text-sm">{uiText.home.loadingError}</div>
//       )}

//       {data && (
//         <div className="grid h-152.5 grid-cols-[591px_417px_417px] grid-rows-2 gap-2.5 [&>*:first-child]:row-span-2">
//           {data.map((p, i) => (
//             <ProductCardCompact size={i === 0 ? "lg" : "md"} product={p} />
//           ))}
//         </div>
//       )}
//       <Button
//         border="thin"
//         color="subtle"
//         className="self-center rounded-4xl px-15 py-3.5 mt-11"
//       >
//         <span className="text-sm font-medium">Показати ще</span>
//       </Button>
//     </Section>
//   );
// }
