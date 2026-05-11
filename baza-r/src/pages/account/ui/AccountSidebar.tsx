import { NavLink } from "react-router";
import Block from "@/shared/components/ui/Block";
import { AccountUserCard } from "./AccountUserCard";
import { sidebarNav } from "../model/sidebar.config";
import { useAuthStore } from "@/shared/model/auth.store";
import { SellerSidebarSection } from "./SellerSidebarSection";
import { SidebarNavLink } from "./SidebarNavLink";

export function AccountSidebar() {
  const { isSeller } = useAuthStore();

  return (
    <aside className="w-full max-w-90 shrink-0 flex-col gap-3 hidden xl:flex">
      <Block
        rounded="xl"
        className="sticky top-[calc(var(--top-offset)+2rem)] flex flex-col gap-1 pb-4"
      >
        <div className="bw-b-thin border-neutral-100 px-6 py-4">
          <NavLink to="/account/profile">
            {({ isActive }) => (
              <AccountUserCard
                className={
                  isActive
                    ? "bg-accent/15 rounded-xl"
                    : "rounded-xl hover:bg-neutral-50"
                }
              />
            )}
          </NavLink>
        </div>

        <div className="flex flex-col gap-1 px-6 pt-4">
          {sidebarNav.map((item) => (
            <SidebarNavLink key={item.to} {...item} />
          ))}
        </div>
        {isSeller && <SellerSidebarSection />}
      </Block>
    </aside>
  );
}
