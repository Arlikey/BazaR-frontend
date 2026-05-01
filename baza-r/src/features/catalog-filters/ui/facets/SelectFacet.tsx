import type { Dispatch, SetStateAction } from "react";
import { Checkbox } from "../../../../shared/components/ui/Checkbox";
import type { CatalogFilters } from "../../model/catalogFilters";
import type { FilterFacet } from "../../model/CategorySidebarResponse";

type Props = {
  facet: FilterFacet;
  filters: CatalogFilters;
  setFilters: Dispatch<SetStateAction<CatalogFilters>>;
};

export function SelectFacet({ facet, filters, setFilters }: Props) {
  const totalCount = facet.options.length;

  const key = facet.kind === "attribute" ? facet.attributeId! : facet.code;

  const selectedValues = filters.select[key] ?? [];

  return (
    <>
      <h3 className="text-base font-medium">
        {facet.name} <span className="text-muted">{totalCount}</span>
      </h3>

      <div className="mt-3 flex flex-col gap-3">
        {facet.options.map((option) => {
          const selected = selectedValues.includes(option.value);

          return (
            <Checkbox
              key={option.value}
              checked={selected}
              onChange={(checked) => {
                setFilters((prev) => {
                  const current = prev.select[key] ?? [];

                  let nextValues: string[];

                  if (checked) {
                    nextValues = [...current, option.value];
                  } else {
                    nextValues = current.filter((v) => v !== option.value);
                  }

                  const nextSelect = { ...prev.select };

                  if (nextValues.length === 0) {
                    delete nextSelect[key];
                  } else {
                    nextSelect[key] = nextValues;
                  }

                  return {
                    ...prev,
                    select: nextSelect,
                  };
                });
              }}
            >
              <span className="text-base">
                {option.label}{" "}
                <span className="text-muted text-sm">({option.count})</span>
              </span>
            </Checkbox>
          );
        })}
      </div>
    </>
  );
}
