import { useState, type ReactNode } from "react";
import Block from "../../../../shared/components/ui/Block";
import { Button } from "../../../../shared/components/ui/Button";

type SpecItem = {
  label: string;
  value: string;
};

type SpecBadge = {
  id: string;
  icon: ReactNode;
};

type ProductSpecsBlockProps = {
  specs: SpecItem[];
  badges?: SpecBadge[];
};

const DEFAULT_VISIBLE = 6;

export function ProductSpecsBlock({ specs, badges }: ProductSpecsBlockProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleSpecs = expanded ? specs : specs.slice(0, DEFAULT_VISIBLE);
  const hasMore = specs.length > DEFAULT_VISIBLE;

  return (
    <Block rounded="xl" className="flex gap-6 px-4 md:px-8 py-5 overflow-hidden">
      <div className="flex flex-1 flex-col gap-4">
        <h3 className="text-xl font-medium">Основні характеристики:</h3>

        <div className="flex flex-col gap-1.5">
          {visibleSpecs.map((spec) => (
            <div key={spec.label} className="flex items-baseline gap-1">
              <span className="shrink-0 text-base">{spec.label}</span>
              <span className="flex-1 border-b border-dotted" />
              <span className="shrink-0 text-right text-base">
                {spec.value}
              </span>
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

      {badges && badges.length > 0 && (
        <div className="flex flex-col gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="bw-thin flex flex-col items-center gap-1 rounded-xl border-neutral-100 p-3 text-center"
            >
              {badge.icon}
            </div>
          ))}
        </div>
      )}
    </Block>
  );
}
