import { sellerNav } from "../model/sidebar.config";
import IconWrapper from "@/shared/components/ui/IconWrapper";
import { ShopStarIcon } from "@/shared/components/icons/ui/ShopStarIcon";
import { SidebarNavLink } from "./SidebarNavLink";

export function SellerSidebarSection() {
  return (
    <div className="mt-3 flex flex-col gap-1">
      <div className="bg-accent/10 flex h-15 items-center justify-center gap-3">
        <IconWrapper className="w-6">
          <ShopStarIcon />
        </IconWrapper>
        <span className="font-medium">Мій магазин</span>
      </div>
      <div className="mt-3 flex flex-col gap-1 px-6">
        {sellerNav.map((item) => (
          <SidebarNavLink key={item.to} {...item} />
        ))}
      </div>
    </div>
  );
}
