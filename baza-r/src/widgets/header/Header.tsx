import Search from "../../features/search/Search";
import { useCart } from "../../entities/cart/queries";
import { useFavorites } from "../../entities/favourite/queries";
import { useAuthStore } from "../../shared/model/auth.store";
import { HeaderActions } from "./HeaderActions";
import { HeaderLeft } from "./HeaderLeft";
import { TryPremiumButton } from "./TryPremiumButton";

export default function Header() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: favorites = [] } = useFavorites();
  const { data: cart } = useCart();

  const favCount = favorites?.length ?? 0;
  const cartCount = cart?.totalQuantity ?? 0;

  return (
    <header
      data-app-header
      className="bg-brand pointer-events-auto sticky top-0 z-50 h-16 w-full px-4 md:px-6 lg:h-18 xl:px-8 2xl:px-14"
    >
      <div className="mx-auto flex h-full max-w-480 items-center">
        <HeaderLeft />

        <div className="mx-2 flex flex-1 lg:ml-24">
          <Search />
        </div>

        <TryPremiumButton />

        <HeaderActions
          cartCount={cartCount}
          favCount={favCount}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </header>
  );
}
