import { useQuery } from "@tanstack/react-query";
import { sellerProductApi } from "../../../../../features/seller/api/sellerProductApi";
import { Link } from "react-router";
import { useSellerMe } from "../../../../../features/seller/api/queries";
import { API_URL } from "../../../../../shared/config/env";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("uk-UA").format(amount);
}

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

      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-neutral-100"
            />
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-neutral-400">
          <span className="text-5xl">📦</span>
          <p>Товарів ще немає</p>
          <Link
            to="/account/seller/products/create"
            className="text-accent hover:underline"
          >
            Створити перший товар
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-white p-4"
          >
            {p.mainImageUrl ? (
              <img
                src={`${API_URL}${p.mainImageUrl}`}
                className="h-20 w-20 shrink-0 rounded-xl object-contain"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-xs text-neutral-300">
                Немає фото
              </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="line-clamp-2 text-base font-medium">
                {p.name}
              </span>
              <span className="text-sm text-neutral-400">{p.slug}</span>
            </div>

            <div className="flex min-w-[140px] shrink-0 flex-col items-end gap-1">
              {p.offer ? (
                <>
                  {p.offer.oldPriceAmount &&
                    p.offer.oldPriceAmount > p.offer.priceAmount && (
                      <span className="text-sm text-neutral-400 line-through">
                        {formatPrice(p.offer.oldPriceAmount)} ₴
                      </span>
                    )}
                  <span className="text-lg font-medium">
                    {formatPrice(p.offer.priceAmount)} ₴
                  </span>
                  <span
                    className={`text-xs font-medium ${p.offer.inStock ? "text-accent" : "text-neutral-400"}`}
                  >
                    {p.offer.inStock ? "Є в наявності" : "Немає в наявності"}
                  </span>
                </>
              ) : (
                <span className="text-sm text-neutral-400">Немає офферу</span>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              {p.offer ? (
                <Link
                  to={`/account/seller/offers/edit?productId=${p.id}`}
                  className="rounded-xl border border-neutral-200 px-4 py-2 text-center text-sm transition-colors hover:bg-neutral-50"
                >
                  Редагувати оффер
                </Link>
              ) : (
                <Link
                  to={`/account/seller/offers/create?productId=${p.id}`}
                  className="bg-accent rounded-xl px-4 py-2 text-center text-sm font-medium text-white"
                >
                  Створити оффер
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
