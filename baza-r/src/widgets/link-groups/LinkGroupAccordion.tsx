import * as Accordion from "@radix-ui/react-accordion";
import type { LinkType } from "../../shared/config/types";
import { LinkGroup } from "./LinkGroup";
import ArrowDownIcon from "../../shared/components/icons/ui/ArrowDownIcon";
import IconWrapper from "../../shared/components/ui/IconWrapper";

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
    <Accordion.Item value={value} className={className}>
      <Accordion.Header>
        <Accordion.Trigger className="group hover:text-accent text-md relative flex w-full cursor-pointer items-center justify-between py-0 font-medium transition outline-none after:absolute after:-inset-2">
          {group.title}
          <IconWrapper
            aria-hidden="true"
            className="transition-transform duration-300 ease-out group-data-[state=open]:rotate-180"
          >
            <ArrowDownIcon />
          </IconWrapper>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[slideUp_0.3s_ease-out] data-[state=open]:animate-[slideDown_0.3s_ease-out]">
        <div className="mt-2">
          <LinkGroup
            group={{ ...group, title: "" }}
            titleClassName="hidden"
            listClassName="[&>li]:mb-2"
          />
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
