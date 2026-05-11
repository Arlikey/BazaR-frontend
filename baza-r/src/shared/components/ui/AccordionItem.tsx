import { Accordion } from "radix-ui";
import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import IconWrapper from "./IconWrapper";
import { CaretIcon } from "../icons/ui/CaretIcon";

const accordionItem = tv({
  slots: {
    root: "",
    trigger:
      "group hover:text-accent flex w-full items-center justify-between transition-colors outline-none",
    iconWrap: "flex-shrink-0 flex items-center justify-center",
    content:
      "overflow-hidden data-[state=closed]:animate-[slideUp_0.3s_ease-out] data-[state=open]:animate-[slideDown_0.3s_ease-out]",
    contentInner: "",
    caretWrap:
      "transition-transform duration-300 group-data-[state=open]:rotate-180",
  },
  variants: {
    variant: {
      default: {
        root: "",
        trigger: "py-6 px-7",
        iconWrap: "hidden",
        contentInner: "px-7 -mt-3 pb-6",
        caretWrap: "w-4",
      },
      profile: {
        root: "rounded-2xl bg-white",
        trigger: "py-8 px-8 md:px-14 text-lg",
        iconWrap: "w-5",
        contentInner: "md:px-14 pb-8",
        caretWrap: "w-6",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AccordionItemProps = {
  value: string;
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof accordionItem>;

export function AccordionItem({
  value,
  icon,
  title,
  children,
  className,
  variant,
}: AccordionItemProps) {
  const s = accordionItem({ variant });

  return (
    <Accordion.Item value={value} className={s.root({ className })}>
      <Accordion.Header>
        <Accordion.Trigger className={s.trigger()}>
          <div className="flex items-center gap-5">
            <div className={s.iconWrap()}>
              {icon && <IconWrapper>{icon}</IconWrapper>}
            </div>
            <span>{title}</span>
          </div>
          <IconWrapper className={s.caretWrap()}>
            <CaretIcon />
          </IconWrapper>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className={s.content()}>
        <div className={s.contentInner()}>{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
