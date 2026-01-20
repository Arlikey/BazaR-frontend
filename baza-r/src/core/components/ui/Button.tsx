import React, { type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "cursor-pointer inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors select-none focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  variants: {
    color: {
      primary: "bg-primary hover:bg-hover-primary",
      secondary: "bg-secondary hover:bg-hover-secondary",
    },
    size: {
      sm: "h-8 px-2 text-sm",
      md: "h-10 px-2.5 text-base",
      lg: "h-12 px-4 text-lg",
    },
    shape: {
      rounded: "rounded-[5px]",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    shape: "rounded",
  },
});

type ButtonVariants = VariantProps<typeof button>;
interface ButtonProps extends ButtonVariants {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button className={`${button(props)} ${props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
