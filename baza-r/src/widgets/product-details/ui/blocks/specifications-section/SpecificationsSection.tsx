import type { AttributeSection } from "@/entities/product/model/attributesSection";
import Block from "@/shared/components/ui/Block";
import { Expandable } from "@/shared/components/ui/Expandable";
import Skeleton from "@/shared/components/ui/loaders/Skeleton";

type Props = {
  sections: AttributeSection[];
};

export function SpecificationsSection({ sections }: Props) {
  if (!sections || sections.length <= 0) return null;
  return (
    <section id="specs" className="scroll-mt-(--scroll-offset)">
      <Block className="flex flex-col gap-5 p-4 md:p-6 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <h2 className="sticky top-(--scroll-offset) text-2xl">
            Характеристики
          </h2>
        </div>

        <div className="flex flex-1 flex-col">
          <Expandable labelMore="Усі характеристики">
            <div className="flex flex-1 flex-col gap-6">
              {sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">{section.name}</h3>

                  <dl className="flex flex-col gap-3 text-base">
                    {section.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex items-baseline">
                        <dt className="label flex w-[40%]">
                          <span>{spec.label}</span>
                        </dt>
                        <dd className="pl-3 text-left">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Expandable>
        </div>
      </Block>
    </section>
  );
}

export function SpecificationsSkeletonSection() {
  return (
    <section id="specs" className="scroll-mt-(--scroll-offset)">
      <Block className="flex flex-col gap-5 p-4 md:p-6 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <h2 className="sticky top-(--scroll-offset) text-2xl">
            Характеристики
          </h2>
        </div>
        <Skeleton className="h-80 flex-1 rounded-lg" />
      </Block>
    </section>
  );
}
