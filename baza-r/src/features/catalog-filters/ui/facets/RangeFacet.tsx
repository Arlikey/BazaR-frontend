import React, { useState } from "react";
import type { FilterFacet } from "../../model/CategorySidebarResponse";
import { Slider } from "radix-ui";
import InputField from "@/shared/components/ui/InputField";
import type { CatalogFilters } from "../../model/catalogFilters";

type Props = {
  facet: FilterFacet;
  filters: CatalogFilters;
  setFilters: React.Dispatch<React.SetStateAction<CatalogFilters>>;
};

export function RangeFacet({ facet, filters, setFilters }: Props) {
  const isPrice = facet.code === "price";
  const key = facet.kind === "attribute" ? facet.attributeId! : facet.code;

  const range = filters.range[key] ?? { min: facet.min, max: facet.max };

  const facetMin = facet.min ?? 0;
  const facetMax =
    facet.min === facet.max ? (facet.max ?? 0) + 1 : (facet.max ?? 0);

  const [localMin, setLocalMin] = useState(range.min ?? facetMin);
  const [localMax, setLocalMax] = useState(range.max ?? facetMax);

  const handleCommit = (values: number[]) => {
    const [min, max] = values;
    setFilters((prev) => ({
      ...prev,
      range: { ...prev.range, [key]: { min, max } },
      ...(isPrice ? { price: { min, max } } : {}),
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 items-center gap-2">
        <InputField
          type="text"
          inputMode="numeric"
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          onBlur={() => {
            const parsed = Number(localMin);
            const safe = isNaN(parsed) ? facetMin : parsed;
            const clamped = clamp(safe, facetMin, localMax - 1);
            setLocalMin(clamped);
            handleCommit([clamped, localMax]);
          }}
          className="flex flex-1"
          containerClassName="h-7"
          inputClassName="w-full text-center"
        />
        <div className="h-0.5 w-4 bg-neutral-200" />
        <InputField
          type="text"
          inputMode="numeric"
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          onBlur={() => {
            const parsed = Number(localMax);
            const safe = isNaN(parsed) ? facetMax : parsed;
            const clamped = clamp(safe, localMin + 1, facetMax);
            setLocalMax(clamped);
            handleCommit([localMin, clamped]);
          }}
          className="flex flex-1"
          containerClassName="h-7"
          inputClassName="w-full text-center"
        />
      </div>

      <Slider.Root
        className="relative mt-6 flex h-5 w-full touch-none items-center rounded-full select-none"
        value={[localMin, localMax]}
        min={facetMin}
        max={facetMax}
        step={1}
        minStepsBetweenThumbs={1}
        onValueChange={([min, max]) => {
          setLocalMin(min);
          setLocalMax(max);
        }}
        onValueCommit={handleCommit}
      >
        <Slider.Track className="relative h-0.75 grow rounded-full bg-neutral-100">
          <Slider.Range className="bg-accent absolute h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb className="block size-4.5 rounded-full bg-neutral-100 focus:outline-none" />
        <Slider.Thumb className="block size-4.5 rounded-full bg-neutral-100 focus:outline-none" />
      </Slider.Root>
    </div>
  );
}
