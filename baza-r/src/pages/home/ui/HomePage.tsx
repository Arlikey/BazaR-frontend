import { Sidebar } from "../../../widgets/sidebar/Sidebar";
import { TrendingProducts } from "../../../widgets/home/trending-products/ui/TrendingProducts";
import { RecommendedProducts } from "../../../widgets/home/recommended-products/ui/RecommendedProducts";
import { GiftsSection } from "../../../widgets/home/gifts-section/ui/GiftsSection";
import { PromoBanners } from "../../../widgets/home/promo-banners/ui/PromoBanners";
import { AwaitedProducts } from "../../../widgets/home/awaited-products/ui/AwaitedProducts";

export const HomePage = () => {
  return (
    <>
      <div className="sticky bottom-4 hidden self-end lg:block">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col gap-11 [&>*:nth-child(2)]:-mt-11 mb-3.5">
        <PromoBanners />
        <TrendingProducts />
        <GiftsSection />
        <RecommendedProducts />
        <AwaitedProducts />
      </div>
    </>
  );
};
