import Search from "../../features/Search/Search";
import { useUiStore } from "../../shared/model/ui.store";
import CustomLink from "../../shared/components/ui/CustomLink";
import { Button } from "../../shared/components/ui/Button";
import IconWrapper from "../../shared/components/ui/IconWrapper";
import { uiText } from "../../shared/config/ui-text";
import { BurgerIcon } from "../../shared/components/icons/ui/BurgerIcon";
import { LogoIcon } from "../../shared/components/icons/ui/LogoIcon";
import { CrossIcon } from "../../shared/components/icons/ui/CrossIcon";
import { CatalogIcon } from "../../shared/components/icons/ui/CatalogIcon";
import { UserIcon } from "../../shared/components/icons/ui/UserIcon";
import { CartIcon } from "../../shared/components/icons/ui/CartIcon";
import { useMe } from "../../entities/user/queries";
import { ListIcon } from "../../shared/components/icons/ui/ListIcon";
import { useNavigate } from "react-router";

export default function Header() {
  const { data: user } = useMe();
  const navigate = useNavigate();

  const openAuth = useUiStore((s) => s.openAuth);
  const openDrawer = useUiStore((s) => s.openDrawer);
  const openCart = useUiStore((s) => s.openCart);
  const openMegamenu = useUiStore((s) => s.openMegamenu);
  const closeMegamenu = useUiStore((s) => s.closeMegamenu);
  const megaMenuOpened = useUiStore((s) => s.megamenu.open);

  return (
    <header
      data-app-header
      className="bg-brand pointer-events-auto sticky top-0 z-50 h-16 w-full px-4 md:px-6 lg:h-18 xl:px-8 2xl:px-14"
    >
      <div className="mx-auto flex h-full max-w-480 items-center">
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

        <div className="ml-20 hidden xl:flex 2xl:ml-24">
          <CustomLink to={"/"} variant="default">
            <LogoIcon />
          </CustomLink>
        </div>
        <div className="hidden md:flex">
          <Button
            color="secondary"
            size="md"
            className="ml-20 hidden gap-3 rounded-[42px] px-6 lg:flex 2xl:ml-24"
            onPointerDown={(e) => {
              e.preventDefault();
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

        <div className="mx-6 flex flex-1 lg:ml-24">
          <Search />
        </div>
        <div className="hidden 2xl:flex">
          <Button
            size="icon"
            rounded="sm"
            className="ml-20 w-21 flex-col gap-1 2xl:ml-24"
          >
            <span className="text-inverse text-xs font-normal capitalize">
              {uiText.header.premiumTryLabel}
            </span>
            <span className="bg-premium rounded-[10px] px-2.5 py-1 text-xs font-medium text-black uppercase">
              {uiText.header.premiumLabel}
            </span>
          </Button>
        </div>
        <div className="text-inverse ml-20 flex items-center gap-2 2xl:ml-24">
          <Button
            size="icon"
            rounded="sm"
            className="hidden md:flex"
            aria-label={uiText.header.userAriaLabel}
            onClick={() => (user ? navigate("/account/profile") : openAuth())}
          >
            {user ? (
              <IconWrapper>
                <ListIcon />
              </IconWrapper>
            ) : (
              <IconWrapper>
                <UserIcon />
              </IconWrapper>
            )}
          </Button>
          <Button
            size="icon"
            rounded="sm"
            className="relative"
            aria-label={uiText.header.cartAriaLabel}
            onClick={() => openCart()}
          >
            <IconWrapper>
              <CartIcon />
            </IconWrapper>
          </Button>
        </div>
      </div>
    </header>
  );
}
