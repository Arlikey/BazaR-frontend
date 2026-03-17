import { useQuery } from "@tanstack/react-query";
import { sellerProductApi } from "../../../../../features/seller/api/sellerProductApi";
import { Link } from "react-router";
import { useSellerMe } from "../../../../../features/seller/api/queries";

export default function SellerProductsPage() {
  const { data: seller } = useSellerMe();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["seller-products", seller?.id],
    queryFn: () => sellerProductApi.getBySeller(seller!.id),
    enabled: !!seller?.id,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Мої товари</h1>
        <Link
          to="/account/seller/products/create"
          className="bg-accent rounded-xl px-5 py-2.5 text-base font-medium text-white"
        >
          + Створити товар
        </Link>
      </div>

      {isLoading && <p className="text-neutral-400">Завантаження...</p>}

      {!isLoading && products.length === 0 && (
        <p className="text-neutral-400">Товарів ще немає</p>
      )}

      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-white p-4">
            {p.mainImageUrl ? (
              <img
                src={`http://localhost:8080${p.mainImageUrl}`}
                className="h-16 w-16 rounded-lg object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-lg bg-neutral-100" />
            )}
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-base font-medium">{p.name}</span>
              {p.vendorCode && <span className="text-sm text-neutral-400">Артикул: {p.vendorCode}</span>}
              <span className="text-sm text-neutral-400">{p.status}</span>
            </div>
            <Link
              to={`/account/seller/offers/create?productId=${p.id}`}
              className="rounded-xl border border-neutral-200 px-4 py-2 text-sm transition-colors hover:bg-neutral-50"
            >
              Створити оффер
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}