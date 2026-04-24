import type { AttributeSection } from "../../../../../entities/product/model/attributesSection";
import {
  useProductReviews,
  useProductReviewsSummary,
} from "../../../../../entities/review/queries";
import Block from "../../../../../shared/components/ui/Block";

type Props = {
  sections: AttributeSection[];
};

export function SpecificationsSection({ sections }: Props) {
  return (
    <section id="specs" className="scroll-mt-(--scroll-offset)">
      <Block className="flex flex-col gap-5 p-4 md:p-6 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <h2 className="sticky top-(--scroll-offset) text-2xl">
            Характеристики
          </h2>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-xl font-medium">{section.name}</p>
              <ul className="flex flex-col gap-3">
                {section.specs.map((spec, specIndex) => (
                  <li
                    key={specIndex}
                    className="flex items-baseline gap-1 text-base"
                  >
                    <dt className="label flex w-[40%]">
                      <span>{spec.label}</span>
                    </dt>
                    <dd className="pl-3 text-left text-base">
                      {spec.value}
                    </dd>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>
    </section>
  );
}
