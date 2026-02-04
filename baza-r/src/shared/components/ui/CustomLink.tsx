import type { ReactNode } from "react";
import { Link, NavLink, type LinkProps, type NavLinkProps } from "react-router";
import { tv, type VariantProps } from "tailwind-variants";

const customLink = tv({
  base: "inline-flex items-center gap-2 outline-none transition-colors underline-offset-3 focus-visible:ring-2 focus-visible:ring-accent",
  variants: {
    variant: {
      default: "",
      underline: "text-foreground hover:underline hover:text-accent",
      menu: "rounded-sm px-3 py-2 text-foreground hover:bg-accent/15 hover:text-accent hover:underline",
    },
    color: {
      blue: "text-link hover:text-link-hover",
    },
    intent: {
      default: "",
      subtle: "text-foreground hover:text-accent",
    },
  },
  defaultVariants: {
    variant: "underline",
    intent: "default",
  },
});

type CustomLinkVariants = VariantProps<typeof customLink>;

type Props = {
  children: ReactNode;
  className?: string;
  activeClassName?: string;
} & CustomLinkVariants &
  Omit<LinkProps, "className" | "children"> &
  Partial<Omit<NavLinkProps, "className" | "children">>;

export default function CustomLink({
  children,
  className,
  variant,
  color,
  intent,
  activeClassName,
  ...rest
}: Props) {
  const classes = customLink({ variant, color, intent, className });

  if (activeClassName) {
    return (
      <NavLink
        {...(rest as NavLinkProps)}
        className={({ isActive }) =>
          `${classes} ${isActive ? activeClassName : ""}`
        }
      >
        {children}
      </NavLink>
    );
  }

  return (
    <Link {...(rest as LinkProps)} className={classes}>
      {children}
    </Link>
  );
}
