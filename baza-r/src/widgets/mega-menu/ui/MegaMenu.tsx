import { useState } from "react";
import { Button } from "../../../shared/components/ui/Button";
import CustomLink from "../../../shared/components/ui/CustomLink";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import CatalogMenu from "../../catalog/ui/CatalogMenu";
import { useCatalogCategories } from "../../catalog/model/useCategories";
import { CaretIcon } from "../../../shared/components/icons/ui/CaretIcon";

const Megamenu = () => {
  const { roots, isLoading } = useCatalogCategories();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = roots.find((x) => x.id === (activeId ?? roots[0]?.id)) ?? null;

  return (
    <div className="flex">
      <nav className="flex max-h-180 w-full gap-5 rounded-[15px] bg-neutral-50 p-7.5">
        <CatalogMenu
          variant="mega"
          className="max-h-161.25 w-75 shrink-0"
          categories={roots}
          isLoading={isLoading}
          activeCategoryId={activeId ?? undefined}
          onCategoryHover={(c) => setActiveId(c.id)}
          trailing={
            <IconWrapper className="-rotate-90">
              <CaretIcon />
            </IconWrapper>
          }
        />

        <section className="bw-thin flex max-h-161.25 flex-1 flex-col rounded-[15px] border-neutral-100 bg-white px-8 py-5">
          {active && active.children.length > 0 ? (
            <div className="flex max-h-161.25 flex-col flex-wrap content-start gap-x-10 2xl:gap-x-20 gap-y-3 overflow-y-auto">
              {active.children.map((group) => (
                <div key={group.id} className="break-inside-avoid">
                  <CustomLink
                    to={`/catalog/${group.id}`}
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
                          to={`/catalog/${leaf.id}`}
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
          ) : (
            <p className="m-auto text-sm text-gray-400">Підкатегорій немає</p>
          )}
        </section>
      </nav>
    </div>
  );
};

export default Megamenu;
