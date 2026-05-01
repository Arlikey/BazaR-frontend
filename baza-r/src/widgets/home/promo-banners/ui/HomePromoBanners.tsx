import { usePromotions } from "../model/usePromotions";
import { PromoBannersCarousel } from "./PromoBanners";
import CustomLink from "@/shared/components/ui/CustomLink";
import { uiText } from "@/shared/config/ui-text";

export function HomePromoBanners() {
  const { promotions, isLoading } = usePromotions();

  return (
    <PromoBannersCarousel
      promotions={promotions}
      isLoading={isLoading}
      variant="home"
      footer={
        <CustomLink
          to=""
          variant="primary"
          border="thin"
          className="group gap-1 px-15 py-3 text-sm"
        >
          {uiText.home.allPromotions}
          <span className="group-hover:text-accent text-neutral-500 transition">
            {promotions.length}
          </span>
        </CustomLink>
      }
    />
  );
}
