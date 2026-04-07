export type TileSize = "1x1" | "2x1" | "1x2" | "2x2";

export type CategoryLayout = {
  columns: string;
  rowHeight: string;
  defaultTile?: TileSize;
  tileVariant?: "centered" | "list";
};

export const CATEGORY_LAYOUTS: Record<string, CategoryLayout> = {
  default: {
    columns: "grid-cols-6",
    rowHeight: "",
    defaultTile: "1x1",
  },

  "41aabca4-134c-42a6-af0f-1b2697c6f76e": {
    columns: "grid-cols-2 md:grid-cols-3 xl:grid-cols-5",
    rowHeight: "",
    defaultTile: "1x1",
    tileVariant: "list",
  },

  plumbing: {
    columns: "grid-cols-6",
    rowHeight: "",
    defaultTile: "1x1",
  },
};

export const TILE_CLASSES: Record<TileSize, string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x2": "col-span-2 row-span-2",
};
