import { useEffect, useMemo, useState } from "react";
import { ArrowDownIcon } from "../../../shared/components/icons/ui";
import { Button } from "../../../shared/components/ui/Button";
import CustomLink from "../../../shared/components/ui/CustomLink";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import CatalogMenu from "../../catalog/ui/CatalogMenu";
import { useCatalogCategories } from "../../catalog/model/useCategories";

const Megamenu = () => {
  const { roots, isLoading } = useCatalogCategories();
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    if (activeId == null && roots.length) setActiveId(roots[0].id);
  }, [activeId, roots]);

  const active = useMemo(
    () => roots.find((x) => x.id === activeId) ?? null,
    [roots, activeId],
  );

  return (
    <nav className="flex max-h-180 min-w-420 gap-5 p-7.5">
      <CatalogMenu
        variant="mega"
        className="flex-1"
        categories={roots}
        isLoading={isLoading}
        activeCategoryId={activeId ?? undefined}
        onCategoryHover={(c) => setActiveId(c.id)}
        trailing={
          <IconWrapper className="-rotate-90">
            <ArrowDownIcon />
          </IconWrapper>
        }
      />

      <section className="bw-thin flex flex-1 rounded-[15px] border-neutral-100 bg-white px-8 py-5">
        {!active ? (
          <div className="text-muted">—</div>
        ) : (
          <div className="flex flex-col flex-wrap content-start items-start gap-x-22 gap-y-3">
            {active.children.map((group) => (
              <div
                key={group.id}
                className="flex max-w-[270px] min-w-0 flex-col items-start"
              >
                <CustomLink
                  to={`/catalog/${active.slug}/${group.slug}`}
                  variant="underline"
                  className="text-accent hover:text-accent-hover w-full min-w-0 text-lg font-medium whitespace-normal"
                >
                  {group.name}
                </CustomLink>

                <div className="flex w-full min-w-0 flex-col items-start gap-1">
                  {group.children.map((leaf) => (
                    <Button
                      key={leaf.id}
                      variant="link"
                      color="subtle"
                      className="min-w-0 text-base font-normal"
                      asChild
                    >
                      <CustomLink
                        to={`/catalog/${active.slug}/${group.slug}/${leaf.slug}`}
                        variant="default"
                        className="min-w-0 whitespace-normal"
                      >
                        {leaf.name}
                      </CustomLink>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </nav>
  );
};

export default Megamenu;
