import { Section } from "@/shared/components/ui/product-section/ui/Section";
import { PromoTile } from "@/shared/components/ui/promo-tile/ui/PromoTile";
import { uiText } from "@/shared/config/ui-text";

export function GiftsSection() {
  const [forHer, forHim] = uiText.home.giftsTiles;

  return (
    <Section title={uiText.home.giftsTitle}>
      <div className="flex flex-col gap-3 xl:flex-row">
        <PromoTile
          title={forHer.title}
          subtitle={forHer.subtitle}
          href={forHer.href}
          className="flex-1 bg-[#F3A4A4]"
          image={
            <img
              src="/images/action-banners/love-present-blue.webp"
              alt="Подарунок для неї"
            />
          }
        />

        <PromoTile
          title={forHim.title}
          subtitle={forHim.subtitle}
          href={forHim.href}
          className="flex-1 bg-[#86CBE9]"
          image={
            <img
              src="/images/action-banners/love-present-pink.webp"
              alt="Подарунок для нього"
            />
          }
        />
      </div>
    </Section>
  );
}
