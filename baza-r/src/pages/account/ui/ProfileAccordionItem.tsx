import * as Accordion from "@radix-ui/react-accordion";
import type { ReactNode } from "react";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { CaretIcon } from "../../../shared/components/icons/ui/CaretIcon";
import { AccordionItem } from "../../../shared/components/ui/AccordionItem";

type Props = {
  value: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

export function ProfileAccordionItem({ value, icon, title, children }: Props) {
  return (
    <AccordionItem value={value} icon={icon} title={title} variant="profile">
      {children}
    </AccordionItem>
  );
}
