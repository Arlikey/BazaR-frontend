import { CaretIcon } from "../icons/ui/CaretIcon";
import { HomeIcon } from "../icons/ui/HomeIcon";
import CustomLink from "./CustomLink";
import IconWrapper from "./IconWrapper";
import { Fragment } from "react/jsx-runtime";

export type BreadcrumbItem = {
  label: string;
  to: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 pt-8">
      <CustomLink to="/" aria-label="Головна">
        <IconWrapper>
          <HomeIcon />
        </IconWrapper>
      </CustomLink>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Fragment key={item.to}>
            <IconWrapper className="-rotate-90">
              <CaretIcon />
            </IconWrapper>
            {isLast ? (
              <span className="text-sm text-neutral-400">{item.label}</span>
            ) : (
              <CustomLink to={item.to} className="text-sm">
                {item.label}
              </CustomLink>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
