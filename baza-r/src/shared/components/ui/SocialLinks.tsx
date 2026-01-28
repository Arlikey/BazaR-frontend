import type { ComponentType } from "react";
import IconSkeleton from "./IconSkeleton";

type Icon = ComponentType;

type Item = { label: string; href: string; icon: Icon };

type Props = {
  items: Item[];
  size?: number;
  className?: string;
};

export default function SocialLinks({ items, size = 24, className }: Props) {
  return (
    <nav
      aria-label="Social Media"
      className={["flex gap-5", className ?? ""].join(" ")}
    >
      {items.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} aria-label={label} target="_blank">
          <IconSkeleton size={size}>
            <Icon />
          </IconSkeleton>
        </a>
      ))}
    </nav>
  );
}
