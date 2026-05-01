import { NavLink } from "react-router";
import IconWrapper from "@/shared/components/ui/IconWrapper";

type Props = {
  to: string;
  icon: React.ComponentType;
  label: string;
  end?: boolean;
};

export function SidebarNavLink({ to, icon: Icon, label, end }: Props) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "flex items-center gap-6 rounded-xl px-5 py-2.5 text-base transition-colors",
          isActive
            ? "bg-accent/10 text-accent"
            : "text-foreground hover:bg-neutral-50",
        ].join(" ")
      }
    >
      <IconWrapper className="w-6">
        <Icon />
      </IconWrapper>
      <span className="flex-1">{label}</span>
    </NavLink>
  );
}
