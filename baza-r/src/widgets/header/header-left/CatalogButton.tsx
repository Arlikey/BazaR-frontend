import { CatalogIcon } from "@/shared/components/icons/ui/CatalogIcon";
import { CrossIcon } from "@/shared/components/icons/ui/CrossIcon";
import { Button } from "@/shared/components/ui/Button";
import IconWrapper from "@/shared/components/ui/IconWrapper";
import { uiText } from "@/shared/config/ui-text";
import { useUiStore } from "@/shared/model/ui.store";

export function CatalogButton() {
  const openMegamenu = useUiStore((s) => s.openMegamenu);
  const closeMegamenu = useUiStore((s) => s.closeMegamenu);
  const megaMenuOpened = useUiStore((s) => s.megamenu.open);

  return (
    <div className="hidden md:flex">
      <Button
        color="secondary"
        size="md"
        className="ml-20 hidden gap-3 rounded-[42px] px-6 lg:flex 2xl:ml-24"
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onClick={() => {
          megaMenuOpened ? closeMegamenu() : openMegamenu();
        }}
      >
        {megaMenuOpened ? (
          <IconWrapper className="h-4 w-4">
            <CrossIcon />
          </IconWrapper>
        ) : (
          <IconWrapper className="h-4 w-4">
            <CatalogIcon />
          </IconWrapper>
        )}
        <span className="capitalize">{uiText.header.catalog}</span>
      </Button>
    </div>
  );
}
