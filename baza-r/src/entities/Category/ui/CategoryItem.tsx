import { tv, type VariantProps } from "tailwind-variants";
import type { ReactNode } from "react";
import { type To } from "react-router";
import type { Category } from "../model/Category";
import CustomLink from "../../../shared/components/ui/CustomLink";
import { getCategoryIcon } from "../model/category.config";
import IconWrapper from "../../../shared/components/ui/IconWrapper";

const categoryItem = tv({
  slots: {
    root: "group flex w-full items-center justify-between rounded-sm transition-colors outline-none",
    left: "flex items-center gap-2",
    text: "font-normal text-foreground underline-offset-3 transition-colors",
    icon: "transition-colors",
    trailing: "flex ml-2 shrink-0 opacity-0 transition-opacity",
  },

  variants: {
    size: {
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
    state: {
      active: {
        root: "bg-accent/15",
        text: "text-accent underline",
        icon: "text-accent",
        trailing: "text-accent opacity-100",
      },
      idle: {},
    },
  },

  defaultVariants: {
    size: "md",
    intent: "plain",
    state: "idle",
  },
});

type Props = {
  category: Category;
  to: To;
  trailing?: ReactNode;
  className?: string;
  onHover?: (category: Category) => void;
  onFocusItem?: (category: Category) => void;
  active?: boolean;
} & VariantProps<typeof categoryItem>;

export function CategoryItem({
  category,
  to,
  size,
  intent,
  trailing,
  className,
  onHover,
  onFocusItem,
  active,
}: Props) {
  const styles = categoryItem({
    size,
    intent,
    state: active ? "active" : "idle",
  });
  const Icon = getCategoryIcon(category.name);

  return (
    <CustomLink
      to={to}
      variant="menu"
      className={styles.root({ className })}
      onMouseEnter={() => onHover?.(category)}
      onFocus={() => onFocusItem?.(category)}
    >
      <span className={styles.left()}>
        {Icon && (
          <IconWrapper className={styles.icon()}>
            <Icon />
          </IconWrapper>
        )}
        <span className={styles.text()}>{category.name}</span>
      </span>

      {trailing && <span className={styles.trailing()}>{trailing}</span>}
    </CustomLink>
  );
}
