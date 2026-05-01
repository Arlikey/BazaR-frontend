import { useState } from "react";
import Block from "../../../../shared/components/ui/Block";
import { Button } from "../../../../shared/components/ui/Button";
import type { AttributeSection } from "../../../../entities/product/model/attributesSection";

type Props = {
  section?: AttributeSection;
};

const DEFAULT_VISIBLE = 6;

export function ProductSpecsBlock({ section }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!section) {
    return null;
  }

  const visibleSpecs = expanded
    ? section.specs
    : section.specs.slice(0, DEFAULT_VISIBLE);
  const hasMore = section.specs.length > DEFAULT_VISIBLE;

  return (
    <Block
      rounded="xl"
      className="flex gap-6 overflow-hidden px-4 py-5 md:px-8"
    >
      <div className="flex flex-1 flex-col gap-4">
        <h3 className="text-xl font-medium">Основні характеристики:</h3>

        <div className="flex flex-col gap-1.5">
          {visibleSpecs.map((spec) => (
            <div key={spec.label} className="flex items-baseline gap-1">
              <dt className="label flex">
                <span>{spec.label}</span>
              </dt>
              <dd className="pl-3 text-left text-base">{spec.value}</dd>
            </div>
          ))}
        </div>

        {hasMore && (
          <Button
            onClick={() => setExpanded((prev) => !prev)}
            color="default"
            className="hover:text-accent-hover w-fit text-base"
          >
            {expanded ? "Сховати" : "Показати ще"}
          </Button>
        )}
      </div>
    </Block>
  );
}
