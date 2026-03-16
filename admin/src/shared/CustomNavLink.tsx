import { NavLink, type NavLinkProps } from "react-router";
import { cn, tv, type VariantProps } from "tailwind-variants";

const navLinkVariants = tv({
  base: "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
  variants: {
    color: {
      default: "text-black hover:bg-gray-100",
    },
  },
  compoundVariants: [],
  defaultVariants: { color: "default" },
});

type Props = VariantProps<typeof navLinkVariants> & NavLinkProps;

export function CustomNavLink({ color, className, ...props }: Props) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        cn(
          navLinkVariants({ color }),
          isActive ? "bg-accent/10 text-accent" : "",
          typeof className === "string" ? className : "",
        )
      }
    />
  );
}
