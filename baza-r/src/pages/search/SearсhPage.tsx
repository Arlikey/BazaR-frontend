import { useSearchParams } from "react-router";
import { toProduct } from "@/entities/product/model/ProductListItem";
import { useSearchProducts } from "./useSearchProducts";
import { pluralize, PLURALS } from "@/shared/lib/pluralize";
import { ProductCardRich } from "@/widgets/product-card/ProductCardRich";
import { Pagination } from "@/widgets/pagination/Pagination";
import { SEARCH_PAGE_SIZE } from "@/shared/model/constants";
import LoadingOverlay from "@/shared/components/ui/loaders/LoadingOverlay";

export default function SearchPage() {
  const [params, setSearchParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const page = Number(params.get("page") ?? 1);

  const {
    data: products,
    isLoading,
    isFetching,
  } = useSearchProducts(query, page, SEARCH_PAGE_SIZE);
  const items = products?.items ?? [];

  const totalCount = products?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / SEARCH_PAGE_SIZE);

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      q: query,
      page: String(newPage),
    });

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <LoadingOverlay show={isFetching} />
      <h1 className="mt-8 text-2xl font-medium md:text-3xl">
        Результати пошуку «<span className="text-accent">{query}</span>»
      </h1>

      <div className="mt-8 flex flex-col gap-2.5">
        <div
          data-app-filter
          className="sticky top-(--top-offset) z-25 bg-neutral-50 py-2 text-base"
        >
          <p>
            Знайдено <span className="tabular-nums">{totalCount}</span>{" "}
            {pluralize(totalCount, PLURALS.product)}
          </p>
        </div>

        <div className="flex gap-2.5">
          <div className="grid w-full grid-cols-2 gap-1 md:grid-cols-[repeat(auto-fill,minmax(285px,1fr))] lg:gap-2.5">
            {items.map((p) => (
              <ProductCardRich key={p.id} product={toProduct(p)} />
            ))}
          </div>
        </div>

        <Pagination
          onPageChange={handlePageChange}
          totalPages={totalPages}
          page={page}
        />
      </div>
    </div>
  );
}
