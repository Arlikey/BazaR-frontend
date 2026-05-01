import { Sidebar } from "@/widgets/sidebar/Sidebar";
import { GiftsSection } from "@/widgets/home/gifts-section/ui/GiftsSection";
import { TrendingProducts } from "@/widgets/home/trending-products/ui/TrendingProducts";
import { HomePromoBanners } from "@/widgets/home/promo-banners/ui/HomePromoBanners";
import { RecentlyViewedProducts } from "@/widgets/home/recently-viewed-products/ui/RecentlyViewedProducts";
import { useAuthStore } from "@/shared/model/auth.store";

export const HomePage = () => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  return (
    <>
      <div className="sticky bottom-4 hidden self-end pt-8 lg:block">
        <Sidebar />
      </div>
      <div className="mb-3.5 flex w-full flex-col gap-11 lg:w-[calc(100%-360px)]">
        <HomePromoBanners />
        <TrendingProducts />
        <GiftsSection />
        {/* <RecommendedProducts /> */}
        {isAuth && <RecentlyViewedProducts />}
      </div>
    </>
  );
};
