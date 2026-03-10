import { NavLink } from "react-router";
import Block from "../../../shared/components/ui/Block";
import { AccountUserCard } from "./AccountUserCard";
import { sidebarNav, type SidebarNavItem } from "../model/sidebar.config";

export function AccountSidebar() {
  return (
    <aside className="flex w-full max-w-90 shrink-0 flex-col gap-3">
      <Block
        rounded="xl"
        className="sticky top-[calc(var(--top-offset)+2rem)] flex flex-col gap-1 pb-45"
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
          {sidebarNav.map(({ icon: Icon, label, to }) => {
            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-6 rounded-xl px-5 py-2.5 text-base transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-foreground hover:bg-neutral-50",
                  ].join(" ")
                }
              >
                <Icon />
                <span className="flex-1">{label}</span>
              </NavLink>
            );
          })}
        </div>
      </Block>
    </aside>
  );
}
