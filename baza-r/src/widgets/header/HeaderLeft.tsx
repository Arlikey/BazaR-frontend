import { CatalogButton } from "./header-left/CatalogButton";
import { DrawerButton } from "./header-left/DrawerButton";
import { LogoLink } from "./header-left/LogoLink";

export function HeaderLeft() {
  return (
    <>
      <DrawerButton />
      <LogoLink />
      <CatalogButton />
    </>
  );
}
