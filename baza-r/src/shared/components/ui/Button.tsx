import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn, tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    "font-medium transition duration-150 ease-out leading-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50",
    "aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/25",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  variants: {
    variant: {
      solid: "",
      ghost: "bg-transparent hover:bg-accent/10",
      outline: "bg-transparent border border-current",
      link: "bg-transparent p-0 h-auto underline-offset-3",
    },
    color: {
      default: "bg-transparent",
      primary: "bg-brand text-inverse hover:bg-brand-hover",
      secondary: "bg-accent text-foreground hover:bg-accent-hover",
      premium: "bg-premium text-foreground hover:bg-premium-hover",
      black: "bg-ink text-inverse hover:bg-ink-hover",
      link: "text-link hover:text-link-hover",
      subtle: "hover:bg-subtle/15 bg-surface text-subtle",
      inverse: "text-inverse hover:text-accent",
    },
    size: {
      sm: "h-8 px-2",
      md: "h-10",
      lg: "h-12 px-4",
      icon: " w-11.25 h-11.25",
    },
    border: {
      thin: "bw-thin border-neutral-100",
    },
    textSize: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    rounded: {
      sm: "rounded-[4px]",
      md: "rounded-[10px]",
      pill: "rounded-full",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  compoundVariants: [
    {
      variant: "link",
      color: "primary",
      class: "bg-transparent text-link hover:text-link-hover",
    },
    {
      size: "icon",
      class: "active:scale-90"
    }
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      rounded,
      border,
      textSize,
      fullWidth,
      asChild = false,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-rounded={rounded}
        data-border={border}
        type={type}
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
            border,
            rounded,
            textSize,
            fullWidth,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
