import type { ButtonHTMLAttributes } from "react";
import { NavLink, type NavLinkProps } from "react-router";
import { cn, tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "px-4 py-2 rounded-lg text-base font-medium transition-colors underline-offset-3",
  variants: {
    color: {
      default: "text-black hover:bg-gray-100",
      green: "bg-accent hover:bg-accent-hover text-white",
    },
    underline: {
      true: "hover:underline",
    },
  },
  compoundVariants: [],
  defaultVariants: { color: "default" },
});

type Props = VariantProps<typeof buttonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function CustomButton({ color, underline, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        buttonVariants({ color, underline }),
        typeof className === "string" ? className : "",
      )}
    />
  );
}
