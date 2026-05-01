import { toProduct } from "@/entities/product/model/ProductListItem";
import { useRecentlyViewedProducts } from "@/entities/product/queries";
import { ProductCardRich } from "@/widgets/product-card/ProductCardRich";

export function ViewedPage() {
  const { data } = useRecentlyViewedProducts();

  if (!data) {
    return <p>Завантаження...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-medium">
        Переглянуті товари{" "}
        <span className="text-2xl text-neutral-300">
          {data.items?.length ? data.items.length : ""}
        </span>
      </h1>
      {data.items?.length ? (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(285px,1fr))] gap-2.5">
          {data.items.map((p) => (
            <ProductCardRich key={p.id} product={toProduct(p)} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-neutral-500">Список переглянутих товарів</p>
      )}
    </div>
  );
}
