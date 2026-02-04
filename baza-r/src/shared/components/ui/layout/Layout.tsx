import { useEffect, useState } from "react";
import Header from "../../../../widgets/header/Header";
import { tryCatch } from "../../../lib/try-catch";
import { Sidebar } from "../../../../widgets/sidebar/Sidebar";
import ProductsGrid from "../../../../widgets/product-grid/ui/ProductGrid";
import Footer from "../../../../widgets/footer/Footer";
import ProductDao from "../../../../entities/product/api/__mocks__/ProductDao";
import type { Product } from "../../../../entities/product/model/Product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);

      const [data, err] = await tryCatch(ProductDao.getProducts());

      if (err) setError(err);
      else if (data) setProducts(data);

      setIsLoading(false);
    };

    load();
    return () => {};
  }, []);

  return { products, error, isLoading };
}

export function Layout() {
  const { products, error, isLoading } = useProducts();

  if (error) return <p className="text-error">Failed to load categories</p>;
  if (isLoading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No categories</p>;

  return (
    <div className="mx-auto flex min-h-screen flex-col">
      <section
        aria-label="Promotion banner"
        className="bg-accent flex h-8 items-center justify-center"
      >
        <span className="text-sm font-medium uppercase lg:text-lg">
          тотальний розпродаж до -50%
        </span>
      </section>
      <div className="min-h-screen">
        <Header />

        <main className="mx-auto flex min-h-75 max-w-480 gap-10 px-4 py-7.5 md:px-8 lg:px-13.75">
          <div className="sticky bottom-4 hidden self-end lg:block">
            <Sidebar />
          </div>
          <ProductsGrid products={products} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
