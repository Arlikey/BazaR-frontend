import { Sidebar } from "../../../widgets/sidebar/Sidebar";
import { TrendingProducts } from "../../../widgets/home/trending-products/ui/TrendingProducts";
import { RecommendedProducts } from "../../../widgets/home/recommended-products/ui/RecommendedProducts";
import { GiftsSection } from "../../../widgets/home/gifts-section/ui/GiftsSection";

export const HomePage = () => {
  return (
    <>
      <div className="sticky bottom-4 hidden self-end lg:block">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col gap-11">
        <TrendingProducts />
        <GiftsSection />
        <RecommendedProducts />
      </div>
    </>
  );
};
