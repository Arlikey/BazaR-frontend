import { Link } from "react-router";
import type { LinkType } from "../../shared/config/types";
import CustomLink from "../../shared/components/ui/CustomLink";

export default function LinkGroup({
  groups,
  className,
}: {
  groups: LinkType[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {groups.map((g) => (
        <li key={g.title}>
          <span className="font-medium">{g.title}</span>
          <ul className="mt-2 space-y-2">
            {g.links.map((l) => (
              <li key={l.label}>
                <CustomLink to={l.to} variant="text">
                  {l.label}
                </CustomLink>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
