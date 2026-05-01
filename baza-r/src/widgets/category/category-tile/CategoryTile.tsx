import type { Category } from "../../../entities/category/model/Category";
import Block from "../../../shared/components/ui/Block";
import { CategoryCenteredTile } from "./CategoryCenteredTile";
import { CategoryListTile } from "./CategoryListTile";
import { CategoryRowTile } from "./CategoryRowTile";

type Props = {
  category: Category;
  variant?: "centered" | "list" | "row";
  className?: string;
};

export function CategoryTile({
  category,
  variant = "centered",
  className,
}: Props) {
  return (
    <Block rounded="lg" className={`h-full p-7.5 ${className}`}>
      {variant === "centered" && <CategoryCenteredTile category={category} />}

      {variant === "list" && <CategoryListTile category={category} />}

      {variant === "row" && <CategoryRowTile category={category} />}
    </Block>
  );
}
