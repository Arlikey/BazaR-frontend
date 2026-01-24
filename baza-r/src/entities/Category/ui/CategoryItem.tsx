import { tv, type VariantProps } from "tailwind-variants";
import type { ReactNode } from "react";
import type { Category } from "../model/Category";

const categoryItem = tv({
  slots: {
    root: "cursor-pointer group flex items-center justify-between transition-colors",
    left: "flex items-center gap-2",
    text: "font-normal text-on-dark underline-offset-3 transition-colors",
    icon: "transition-colors",
    trailing: "ml-2 shrink-0 opacity-0 transition-opacity",
  },

  variants: {
    size: {
      sm: {
        root: "px-2 py-1.5",
        text: "text-[11px]",
        icon: "h-5 w-5",
      },
      md: {
        root: "px-3 py-2",
        text: "text-[12px]",
        icon: "h-6.25 w-6.25",
      },
    },
    intent: {
      hoverable: {
        root: "hover:bg-secondary/15",
        text: "group-hover:text-secondary group-hover:underline",
        icon: "group-hover:text-secondary",
        trailing: "group-hover:opacity-100",
      },
      plain: {},
    },
  },

  defaultVariants: {
    size: "md",
  },
});

type Props = {
  category: Category;
  trailing?: ReactNode;
  className?: string;
} & VariantProps<typeof categoryItem>;

export function CategoryItem({
  category,
  size,
  intent,
  trailing,
  className,
}: Props) {
  const styles = categoryItem({ size, intent });

  return (
    <div className={styles.root({ className })}>
      <div className={styles.left()}>
        {category.iconUrl && (
          <img src={category.iconUrl} alt="" className={styles.icon()} />
        )}
        <span className={styles.text()}>{category.name}</span>
      </div>

      {trailing && <div className={styles.trailing()}>{trailing}</div>}
    </div>
  );
}
