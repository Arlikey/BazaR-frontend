import { useFavorites } from "@/entities/favourite/queries";
import { ProductCardRich } from "@/widgets/product-card/ProductCardRich";
import { toProduct } from "@/entities/product/model/ProductListItem.ts";

export default function WishlistPage() {
  const { data: favorites } = useFavorites();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-medium">
        Список бажань{" "}
        <span className="text-2xl text-neutral-300">
          {favorites?.length ? favorites.length : ""}
        </span>
      </h1>
      {favorites?.length ? (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(285px,1fr))] gap-2.5">
          {favorites.map((p) => (
            <ProductCardRich key={p.id} product={toProduct(p)} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-neutral-500">Список бажань порожній</p>
      )}
    </div>
  );
}
