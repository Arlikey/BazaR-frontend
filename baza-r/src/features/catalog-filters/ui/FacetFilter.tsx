import type { CatalogFilters } from "../model/catalogFilters";
import type { Dispatch, SetStateAction } from "react";
import type { FilterFacet } from "../model/CategorySidebarResponse";
import { BooleanFacet } from "./facets/BooleanFacet";
import { RangeFacet } from "./facets/RangeFacet";
import { SelectFacet } from "./facets/SelectFacet";

type Props = {
  facet: FilterFacet;
  filters: CatalogFilters;
  setFilters: Dispatch<SetStateAction<CatalogFilters>>;
};

export function FacetFilter({ facet, filters, setFilters }: Props) {
  switch (facet.type) {
    case "boolean":
      return <BooleanFacet facet={facet} />;
    case "range":
      return (
        <RangeFacet facet={facet} filters={filters} setFilters={setFilters} />
      );
    case "select":
      return (
        <SelectFacet facet={facet} filters={filters} setFilters={setFilters} />
      );

    default:
      return null;
  }
}
