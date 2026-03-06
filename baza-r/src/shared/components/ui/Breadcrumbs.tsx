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
    <nav className="mb-9 flex items-center gap-1">
      <CustomLink to="/">
        <IconWrapper>
          <HomeIcon />
        </IconWrapper>
      </CustomLink>
      {items.map((item) => (
        <Fragment key={item.to}>
          <IconWrapper className="-rotate-90">
            <CaretIcon />
          </IconWrapper>
          <CustomLink to={item.to} className="text-sm">
            {item.label}
          </CustomLink>
        </Fragment>
      ))}
    </nav>
  );
}
