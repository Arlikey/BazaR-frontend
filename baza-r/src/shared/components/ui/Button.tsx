// import { type ButtonHTMLAttributes, type ReactNode } from "react";
// import { tv, type VariantProps } from "tailwind-variants";

// const button = tv({
//   base: "cursor-pointer inline-flex items-center justify-center font-medium whitespace-nowrap transition select-none focus:outline-none disabled:pointer-events-none disabled:opacity-50",
//   variants: {
//     variant: {
//       solid: "",
//       ghost: "bg-transparent hover:bg-accent/10",
//       outline: "bg-transparent border border-current",
//       link: "bg-transparent p-0 h-auto",
//     },
//     color: {
//       primary: "bg-brand hover:bg-brand-hover",
//       secondary: "bg-accent hover:bg-accent-hover",
//       premium: "bg-premium hover:bg-premium-hover",
//       black: "bg-ink hover:bg-ink-hover",
//       link: "text-link hover:text-link-hover",
//       subtle: "text-foreground hover:text-accent",
//       inverse: "text-inverse hover:text-accent",
//       default: "text-foreground",
//     },
//     size: {
//       sm: "h-8 px-2 text-sm",
//       md: "h-10 px-2.5 text-base",
//       lg: "h-12 px-4 text-lg",
//     },
//     textSize: {
//       sm: "text-sm",
//       md: "text-base",
//       lg: "text-lg",
//       xl: "text-xl",
//     },
//     fullWidth: {
//       true: "w-full",
//     },
//     shape: {
//       icon: "rounded-[5px] w-11.25 h-11.25",
//     },
//   },
//   defaultVariants: {
//     variant: "solid",
//     color: "primary",
//   },
// });

// type ButtonVariants = VariantProps<typeof button>;

// type Props = {
//   className?: string;
//   children?: ReactNode;
// } & ButtonVariants &
//   Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

// export default function Button({
//   variant,
//   color,
//   size,
//   textSize,
//   fullWidth,
//   shape,
//   className,
//   children,
//   type,
//   ...rest
// }: Props) {
//   const classes = button({
//     variant,
//     color,
//     size,
//     textSize,
//     fullWidth,
//     shape,
//     className,
//   });

//   return (
//     <button type={type ?? "button"} className={classes} {...rest}>
//       {children}
//     </button>
//   );
// }

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn, tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    "font-medium transition",
    "disabled:pointer-events-none disabled:opacity-50",
    "outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50",
    "aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/25",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  variants: {
    variant: {
      solid: "border border-transparent",
      ghost: "bg-transparent hover:bg-accent/10",
      outline: "bg-transparent border border-current",
      link: "bg-transparent p-0 h-auto underline-offset-3",
    },
    color: {
      primary: "bg-brand text-inverse hover:bg-brand-hover",
      secondary: "bg-accent text-foreground hover:bg-accent-hover",
      premium: "bg-premium text-foreground hover:bg-premium-hover",
      black: "bg-ink text-inverse hover:bg-ink-hover",
      link: "text-link hover:text-link-hover",
      subtle: "text-foreground hover:text-accent",
      inverse: "text-inverse hover:text-accent",
      default: "text-foreground",
    },
    size: {
      sm: "h-8 px-2 text-sm",
      md: "h-10 text-base",
      lg: "h-12 px-4 text-lg",
      icon: " w-11.25 h-11.25",
    },
    textSize: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    rounded: {
      sm: "rounded-[5px]",
      md: "rounded-[6px]",
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
      variant: "link",
      color: "secondary",
      class: "bg-transparent text-link hover:text-link-hover",
    },
    {
      variant: "link",
      color: "secondary",
      class: "hover:none",
    },
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
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
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
