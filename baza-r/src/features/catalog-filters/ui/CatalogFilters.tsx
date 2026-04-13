import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useCategorySidebar } from "../queries";
import { FacetFilter } from "./FacetFilter";
import Block from "../../../shared/components/ui/Block";
import type { CatalogFilters } from "../model/catalogFilters";
import Skeleton from "../../../shared/components/ui/loaders/Skeleton";

type Props = {
  categoryId: string;
  filters: CatalogFilters;
  setFilters: Dispatch<SetStateAction<CatalogFilters>>;
};
export function CatalogFilters({ categoryId, filters, setFilters }: Props) {
  const { data, isLoading } = useCategorySidebar(categoryId);

  if (isLoading)
    return (
      <div className="w-full flex-1">
        <Skeleton className="h-full w-full" />
      </div>
    );

  return (
    <div className="sticky flex flex-1 flex-col gap-2.5">
      {data?.facets.map((facet) => (
        <Block key={facet.code} className="p-5 pr-4">
          <FacetFilter
            facet={facet}
            filters={filters}
            setFilters={setFilters}
          />
        </Block>
      ))}
    </div>
  );
}
