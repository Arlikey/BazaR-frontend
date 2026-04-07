import type { Category } from "../../../entities/category/model/Category";
import Block from "../../../shared/components/ui/Block";
import { CategoryCenteredTile } from "./CategoryCenteredTile";
import { CategoryListTile } from "./CategoryListTile";

type Props = {
  category: Category;
  variant?: "centered" | "list";
};

export function CategoryTile({ category, variant = "centered" }: Props) {
  return (
    <Block rounded="lg" className="h-full p-7.5">
      {variant === "centered" && <CategoryCenteredTile category={category} />}

      {variant === "list" && <CategoryListTile category={category} />}
    </Block>
  );
}
