import { Section } from "../../../../shared/components/ui/product-section/ui/Section";
import { PromoTile } from "../../../../shared/components/ui/promo-tile/ui/PromoTile";

export function GiftsSection() {
  return (
    <Section title="Кращі подарунки">
      <div className="grid grid-cols-2 gap-3">
        <PromoTile
          title="Для неї"
          subtitle={"Товари для краси, здоров'я і догляду за тілом"}
          href="/gifts/for-her"
          className="bg-[#F3A4A4]"
          image={<img src="/images/action-banners/love-present-blue.png" />}
        />

        <PromoTile
          title="Для нього"
          subtitle={"Побутова техніка"}
          href="/gifts/for-him"
          className="bg-[#86CBE9]"
          image={<img src="/images/action-banners/love-present-pink.png" />}
        />
      </div>
    </Section>
  );
}
