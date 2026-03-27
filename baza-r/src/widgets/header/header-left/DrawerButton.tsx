import { BurgerIcon } from "../../../shared/components/icons/ui/BurgerIcon";
import { Button } from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { uiText } from "../../../shared/config/ui-text";
import { useUiStore } from "../../../shared/model/ui.store";

export function DrawerButton() {
  const openDrawer = useUiStore((s) => s.openDrawer);

  return (
    <div className="hidden sm:flex">
      <Button
        size="icon"
        rounded="sm"
        aria-label={uiText.header.openMenuAriaLabel}
        className="text-inverse"
        onClick={() => openDrawer()}
      >
        <IconWrapper>
          <BurgerIcon />
        </IconWrapper>
      </Button>
    </div>
  );
}
