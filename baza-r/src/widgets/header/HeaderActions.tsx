import { CartIcon } from "@/shared/components/icons/ui/CartIcon";
import { FavoriteIcon } from "@/shared/components/icons/ui/FavouriteIcon";
import { ListIcon } from "@/shared/components/icons/ui/ListIcon";
import { UserIcon } from "@/shared/components/icons/ui/UserIcon";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import CustomLink from "@/shared/components/ui/CustomLink";
import IconWrapper from "@/shared/components/ui/IconWrapper";
import { useUiStore } from "@/shared/model/ui.store";

type Props = {
  isAuthenticated: boolean;
  favCount: number;
  cartCount: number;
};

export function HeaderActions({ isAuthenticated, favCount, cartCount }: Props) {
  const openAuth = useUiStore((s) => s.openAuth);
  const openCart = useUiStore((s) => s.openCart);

  return (
    <div className="text-background flex justify-end gap-1">
      {isAuthenticated ? (
        <Button
          size="icon"
          rounded="sm"
          className="hidden hover:text-white md:flex"
          asChild
        >
          <CustomLink
            to="/account/profile"
            aria-label="Перейти на сторінку профілю"
            title="Профіль"
          >
            <IconWrapper>
              <ListIcon />
            </IconWrapper>
          </CustomLink>
        </Button>
      ) : (
        <Button
          size="icon"
          rounded="sm"
          className="hidden md:flex"
          onClick={() => openAuth()}
          aria-label="Увійти"
          title="Увійти"
          aria-haspopup="dialog"
        >
          <IconWrapper>
            <UserIcon />
          </IconWrapper>
        </Button>
      )}

      {favCount > 0 && (
        <Button
          size="icon"
          rounded="sm"
          title="Список бажаного"
          aria-label="Перейти до бажаного"
          className="relative hidden hover:text-white md:flex"
          asChild
        >
          <CustomLink to="/account/wishlist">
            <IconWrapper>
              <FavoriteIcon />
            </IconWrapper>
            <Badge count={favCount} variant="subtle" />
          </CustomLink>
        </Button>
      )}

      <Button
        size="icon"
        rounded="sm"
        className="relative"
        title="Кошик"
        aria-label="Відкрити кошик"
        aria-haspopup="dialog"
        onClick={openCart}
      >
        <IconWrapper>
          <CartIcon />
        </IconWrapper>
        <Badge count={cartCount} />
      </Button>
    </div>
  );
}
