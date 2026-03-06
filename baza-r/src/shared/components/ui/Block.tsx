import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const blockVariants = tv({
  base: "bg-surface bw-thin border-neutral-100",
  variants: {
    rounded: {
      xs: "rounded-[10px]",
      sm: "rounded-[12px]",
      md: "rounded-[15px]",
      lg: "rounded-[20px]",
      xl: "rounded-[25px]",
    },
  },
  defaultVariants: {
    rounded: "sm"
  }
});

export type BlockProps = VariantProps<typeof blockVariants> & {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
};

export default function Block({ className, children, onClick, ...rest }: BlockProps) {
  return (
    <section className={[blockVariants(rest), className ?? ""].join(" ")} onClick={onClick}>
      {children}
    </section>
  );
}