import React from "react";
import type { FilterFacet } from "../../model/CategorySidebarResponse";

type Props = {
  facet: FilterFacet;
};

export function BooleanFacet({ facet }: Props) {
  return (
    <label className="flex gap-2">
      <input type="checkbox" />
      {facet.name}
    </label>
  );
}
