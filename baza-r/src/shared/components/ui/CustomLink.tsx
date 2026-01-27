import type { ReactNode } from "react";
import { Link, NavLink, type LinkProps, type NavLinkProps } from "react-router";
import { tv, type VariantProps } from "tailwind-variants";

const customLink = tv({
  base: "inline-flex items-center gap-2 outline-none transition-colors underline-offset-3 focus-visible:ring-2 focus-visible:ring-secondary",
  variants: {
    variant: {
      text: "text-on-dark hover:underline hover:text-secondary",
      menu: "rounded-sm px-3 py-2 text-on-dark hover:bg-secondary/15 hover:text-secondary hover:underline",
    },
    intent: {
      default: "",
      subtle: "text-on-dark hover:text-secondary",
    },
  },
  defaultVariants: {
    variant: "text",
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
  intent,
  activeClassName,
  ...rest
}: Props) {
  const classes = customLink({ variant, intent, className });

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
