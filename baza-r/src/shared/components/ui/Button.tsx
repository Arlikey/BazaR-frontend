import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "cursor-pointer inline-flex items-center justify-center font-medium whitespace-nowrap transition select-none focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  variants: {
    color: {
      primary: "bg-primary hover:bg-hover-primary",
      secondary: "bg-secondary hover:bg-hover-secondary",
      premium: "bg-premium hover:bg-hover-premium",
      black: "bg-[#221F1F] hover:bg-[#1A1818] hover:scale-105 ",
    },
    size: {
      sm: "h-8 px-2 text-sm",
      md: "h-10 px-2.5 text-base",
      lg: "h-12 px-4 text-lg",
    },
    shape: {
      icon: "rounded-[5px] w-11.25 h-11.25",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

type ButtonVariants = VariantProps<typeof button>;

type Props = {
  className?: string;
  children: ReactNode;
} & ButtonVariants &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export default function Button({
  color,
  size,
  shape,
  className,
  children,
  type,
  ...rest
}: Props) {
  const classes = button({ color, size, shape, className });

  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
