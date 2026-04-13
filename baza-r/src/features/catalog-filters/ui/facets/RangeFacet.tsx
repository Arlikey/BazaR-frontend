import React from "react";
import type { FilterFacet } from "../../model/CategorySidebarResponse";
import { Slider } from "radix-ui";
import InputField from "../../../../shared/components/ui/InputField";
import type { CatalogFilters } from "../../model/catalogFilters";

type Props = {
  facet: FilterFacet;
  filters: CatalogFilters;
  setFilters: React.Dispatch<React.SetStateAction<CatalogFilters>>;
};

export function RangeFacet({ facet, filters, setFilters }: Props) {
  const isPrice = facet.code === "price";
  const key = facet.kind === "attribute" ? facet.attributeId! : facet.code;

  const range = filters.range[key] ?? {
    min: facet.min,
    max: facet.max,
  };

  const handleChange = (values: number[]) => {
    const [min, max] = values;

    if (isPrice) {
      setFilters((prev) => ({
        ...prev,
        range: {
          ...prev.range,
          [key]: { min, max },
        },
        price: { min, max },
      }));
      return;
    }

    setFilters((prev) => ({
      ...prev,
      range: {
        ...prev.range,
        [key]: { min, max },
      },
    }));
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-medium">{facet.name}</h3>

      <div className="mt-2 flex flex-1 items-center gap-2">
        <InputField
          type="text"
          inputMode="numeric"
          value={range.min ?? ""}
          onChange={(e) => {
            const value = Number(e.target.value);

            setFilters((prev) => ({
              ...prev,
              range: {
                ...prev.range,
                [key]: {
                  ...prev.range[key],
                  min: value,
                },
              },
            }));
          }}
          className="flex flex-1"
          containerClassName="h-7"
          inputClassName="w-full text-center"
        />

        <div className="h-0.5 w-4 bg-neutral-200" />

        <InputField
          type="text"
          inputMode="numeric"
          value={range.max ?? ""}
          onChange={(e) => {
            const value = Number(e.target.value);

            setFilters((prev) => ({
              ...prev,
              range: {
                ...prev.range,
                [key]: {
                  ...prev.range[key],
                  max: value,
                },
              },
            }));
          }}
          className="flex flex-1"
          containerClassName="h-7"
          inputClassName="w-full text-center"
        />
      </div>

      <Slider.Root
        className="relative mt-6 flex h-5 w-full touch-none items-center rounded-full select-none"
        value={[range.min ?? facet.min!, range.max ?? facet.max!]}
        min={facet.min}
        max={facet.max}
        step={1}
        onValueChange={handleChange}
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
