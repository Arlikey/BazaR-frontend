import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, NavLink, type LinkProps, type NavLinkProps } from "react-router";
import { tv, type VariantProps } from "tailwind-variants";

const customLink = tv({
  base: "inline-flex items-center gap-2 outline-none transition-colors underline-offset-3 focus-visible:ring-2 focus-visible:ring-accent",
  variants: {
    variant: {
      default: "",
      primary:
        "text-foreground bg-white rounded-4xl hover:text-accent hover:border-accent",
      underline: "text-foreground hover:underline hover:text-accent",
      menu: "rounded-sm px-3 py-2 text-foreground hover:bg-accent/15 hover:text-accent hover:underline",
      icon: "rounded-md text-muted hover:text-accent",
    },
    color: {
      blue: "text-link hover:text-link-hover",
      secondary: "bg-accent hover:bg-accent-hover",
    },
    intent: {
      default: "",
      subtle: "text-foreground hover:text-accent",
    },
    border: {
      none: "",
      thin: "bw-thin border-neutral-300",
    },
    textSize: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "underline",
    intent: "default",
    border: "none",
  },
});

type CustomLinkVariants = VariantProps<typeof customLink>;

type BaseProps = {
  children: ReactNode;
  className?: string;
  activeClassName?: string;
} & CustomLinkVariants;

type RouterLinkProps = BaseProps &
  Omit<LinkProps, "className" | "children" | "to"> &
  Partial<Omit<NavLinkProps, "className" | "children" | "to">> & {
    to: LinkProps["to"];
    href?: never;
  };

type ExternalLinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    to?: never;
  };

type Props = RouterLinkProps | ExternalLinkProps;

export default function CustomLink({
  children,
  className,
  variant,
  color,
  border,
  intent,
  textSize,
  activeClassName,
  ...rest
}: Props) {
  const classes = customLink({
    variant,
    color,
    border,
    intent,
    textSize,
    className,
  });

  if ("href" in rest) {
    const rel =
      rest.target === "_blank" && !rest.rel ? "noopener noreferrer" : rest.rel;

    return (
      <a {...rest} className={classes} rel={rel}>
        {children}
      </a>
    );
  }

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
