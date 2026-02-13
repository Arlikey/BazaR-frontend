import { tv, type VariantProps } from "tailwind-variants";
import type { ReactNode } from "react";
import { type To } from "react-router";
import type { Category } from "../model/Category";
import CustomLink from "../../../shared/components/ui/CustomLink";

const categoryItem = tv({
  slots: {
    root: "group flex w-full items-center justify-between rounded-sm transition-colors outline-none",
    left: "flex items-center gap-2",
    text: "font-normal text-foreground underline-offset-3 transition-colors",
    icon: "transition-colors",
    trailing: "ml-2 shrink-0 opacity-0 transition-opacity",
  },

  variants: {
    size: {
      sm: { root: "px-2 py-1", text: "text-[11px]", icon: "h-5 w-5" },
      md: { root: "px-3 py-1", text: "text-sm", icon: "h-6.25 w-6.25" },
    },
    intent: {
      hoverable: {
        root: "hover:bg-accent/15 focus-visible:bg-accent/15",
        text: "group-hover:text-accent group-hover:underline group-focus-visible:text-accent group-focus-visible:underline",
        icon: "group-hover:text-accent group-focus-visible:text-accent",
        trailing: "group-hover:opacity-100 group-focus-visible:opacity-100",
      },
      plain: {},
    },
  },

  defaultVariants: {
    size: "md",
    intent: "plain",
  },
});

type Props = {
  category: Category;
  to: To;
  trailing?: ReactNode;
  className?: string;
} & VariantProps<typeof categoryItem>;

export function CategoryItem({
  category,
  to,
  size,
  intent,
  trailing,
  className,
}: Props) {
  const styles = categoryItem({ size, intent });

  return (
    <CustomLink to={to} variant="menu" className={styles.root({ className })}>
      <span className={styles.left()}>
        {category.iconUrl && (
          <img
            src={category.iconUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className={styles.icon()}
          />
        )}
        <span className={styles.text()}>{category.name}</span>
      </span>

      {trailing && <span className={styles.trailing()}>{trailing}</span>}
    </CustomLink>
  );
}
