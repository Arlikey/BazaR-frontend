import CustomLink from "../../shared/components/ui/CustomLink";
import type { LinkType } from "../../shared/config/types";

type Props = {
  group: LinkType;
  className?: string;
  titleClassName?: string;
  listClassName?: string;
};

export function LinkGroup({
  group,
  className,
  titleClassName = "font-medium text-md",
  listClassName = "mt-2 space-y-2",
}: Props) {
  return (
    <div className={className}>
      <span className={titleClassName}>{group.title}</span>
      <ul className={listClassName}>
        {group.links.map((l) => (
          <li key={l.label}>
            <CustomLink to={l.to} variant="underline">
              {l.label}
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
