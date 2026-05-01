import { uiText } from "@/shared/config/ui-text";

export default function PromoBanner() {
  return (
    <div
      aria-label={uiText.layout.promotionBannerAriaLabel}
      className="bg-accent flex h-8 items-center z-50 justify-center"
    >
      <span className="text-sm font-medium uppercase lg:text-lg">
        {uiText.layout.promotionBannerMessage}
      </span>
    </div>
  );
}
