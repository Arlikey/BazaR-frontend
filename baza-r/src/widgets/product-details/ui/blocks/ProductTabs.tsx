import type { HTMLAttributes } from "react";
import CustomLink from "../../../../shared/components/ui/CustomLink";
import { PRODUCT_TABS } from "../../model/product-tabs.config";
import { useProductTabs } from "../../model/useProductTabs";

type Props = HTMLAttributes<HTMLDivElement> & {};

export function ProductTabs({ ...props }: Props) {
  const { activeHref } = useProductTabs();

  return (
    <div
      {...props}
      className="sticky top-(--top-offset) z-10 flex justify-center gap-x-11 bg-neutral-50 pt-8 text-base lg:justify-start"
    >
      {PRODUCT_TABS.map((tab) => (
        <CustomLink
          key={tab.href}
          href={tab.href}
          variant="default"
          className={`hover:text-accent pb-2 transition-colors ${
            activeHref === tab.href ? "border-b border-current" : ""
          }`}
        >
          {tab.label}
        </CustomLink>
      ))}
    </div>
  );
}
