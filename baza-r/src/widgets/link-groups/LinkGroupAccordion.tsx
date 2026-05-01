import type { LinkType } from "@/shared/config/types";
import { LinkGroup } from "./LinkGroup";
import { AccordionItem } from "@/shared/components/ui/AccordionItem";

type AccordionItemProps = {
  group: LinkType;
  value: string;
  className?: string;
};

export function LinksGroupAccordionItem({
  group,
  value,
  className,
}: AccordionItemProps) {
  return (
    <AccordionItem value={value} title={group.title} className={className}>
      <div className="mt-2">
        <LinkGroup group={{ ...group, title: "" }} />
      </div>
    </AccordionItem>
  );
}
