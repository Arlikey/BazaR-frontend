import type { ComponentType } from "react";
import IconWrapper from "./IconWrapper";
import CustomLink from "./CustomLink";
import { uiText } from "../../config/ui-text";

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
      aria-label={uiText.socialLinks.navAriaLabel}
      className={["flex gap-5", className ?? ""].join(" ")}
    >
      {items.map(({ label, href, icon: Icon }) => (
        <CustomLink
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          variant="icon"
        >
          <IconWrapper size={size}>
            <Icon />
          </IconWrapper>
        </CustomLink>
      ))}
    </nav>
  );
}
