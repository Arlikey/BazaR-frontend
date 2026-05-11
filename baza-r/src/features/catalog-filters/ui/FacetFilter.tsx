import type { CatalogFilters } from "../model/catalogFilters";
import type { Dispatch, SetStateAction } from "react";
import type { FilterFacet } from "../model/CategorySidebarResponse";
import { BooleanFacet } from "./facets/BooleanFacet";
import { RangeFacet } from "./facets/RangeFacet";
import { SelectFacet } from "./facets/SelectFacet";
import { Accordion } from "radix-ui";
import IconWrapper from "@/shared/components/ui/IconWrapper";
import { CaretIcon } from "@/shared/components/icons/ui/CaretIcon";

type Props = {
  facet: FilterFacet;
  filters: CatalogFilters;
  setFilters: Dispatch<SetStateAction<CatalogFilters>>;
};

export function FacetFilter({ facet, filters, setFilters }: Props) {
  const renderContent = () => {
    switch (facet.type) {
      case "boolean":
        return <BooleanFacet facet={facet} />;
      case "range":
        return (
          <RangeFacet facet={facet} filters={filters} setFilters={setFilters} />
        );
      case "select":
        return (
          <SelectFacet
            facet={facet}
            filters={filters}
            setFilters={setFilters}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Accordion.Root type="single" collapsible defaultValue="">
      <Accordion.Item value={facet.code}>
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between outline-none">
            <h3 className="text-left text-base font-medium">
              {facet.name}
              {facet.options.length > 0 && (
                <span className="ml-2 text-neutral-300">
                  {facet.options.length}
                </span>
              )}
            </h3>

            <IconWrapper className="text-neutral-400 transition-transform duration-300 group-data-[state=open]:rotate-180">
              <CaretIcon />
            </IconWrapper>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[slideUp_0.2s_ease-out] data-[state=open]:animate-[slideDown_0.2s_ease-out]">
          <div className="pt-3">{renderContent()}</div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
