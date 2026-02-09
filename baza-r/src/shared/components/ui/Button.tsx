import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "cursor-pointer inline-flex items-center justify-center font-medium whitespace-nowrap transition select-none focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      solid: "",
      ghost: "bg-transparent hover:bg-accent/10",
      outline: "bg-transparent border border-current",
      link: "bg-transparent p-0 h-auto",
    },
    color: {
      primary: "bg-brand hover:bg-brand-hover",
      secondary: "bg-accent hover:bg-accent-hover",
      premium: "bg-premium hover:bg-premium-hover",
      black: "bg-ink hover:bg-ink-hover",
      link: "text-link hover:text-link-hover",
      subtle: "text-foreground hover:text-accent",
      inverse: "text-inverse hover:text-accent",
      default: "text-foreground"
    },
    size: {
      sm: "h-8 px-2 text-sm",
      md: "h-10 px-2.5 text-base",
      lg: "h-12 px-4 text-lg",
    },
    textSize: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    fullWidth: {
      true: "w-full",
    },
    shape: {
      icon: "rounded-[5px] w-11.25 h-11.25",
    },
  },
  defaultVariants: {
    variant: "solid",
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
  variant,
  color,
  size,
  textSize,
  fullWidth,
  shape,
  className,
  children,
  type,
  ...rest
}: Props) {
  const classes = button({
    variant,
    color,
    size,
    textSize,
    fullWidth,
    shape,
    className,
  });

  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
