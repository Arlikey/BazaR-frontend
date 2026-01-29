import { Link } from "react-router";
import {
  BurgerIcon,
  CartIcon,
  CatalogueIcon,
  LogoIcon,
  UserIcon,
} from "../../shared/components/icons/ui";
import Button from "../../shared/components/ui/Button";
import Search from "../../features/Search/Search";

const Header = () => {
  return (
    <header className="bg-primary sticky top-0 z-50 h-16 w-full px-4 md:px-6 lg:h-18 xl:px-8 2xl:px-14">
      <div className="mx-auto flex h-full max-w-480 items-center">
        <div className="hidden sm:flex">
          <Button shape="icon">
            <BurgerIcon />
          </Button>
        </div>
        <div className="ml-20 hidden xl:flex 2xl:ml-24">
          <Link to={"/"}>
            <LogoIcon />
          </Link>
        </div>
        <div className="hidden md:flex">
          <Button
            color="secondary"
            size="md"
            className="ml-20 hidden gap-3 rounded-[42px] px-6 lg:flex 2xl:ml-24"
          >
            <CatalogueIcon />
            <span className="capitalize">каталог</span>
          </Button>
        </div>
        <div className="mx-6 flex flex-1 lg:ml-24">
          <Search />
        </div>
        <div className="hidden 2xl:flex">
          <Button shape="icon" className="ml-20 w-21 flex-col gap-1 2xl:ml-24">
            <span className="text-on-light text-[10px] font-normal capitalize">
              спробуйте
            </span>
            <span className="bg-premium rounded-[10px] px-2.5 py-1 text-[10px] font-medium uppercase">
              premium
            </span>
          </Button>
        </div>
        <div className="ml-20 flex items-center gap-2 2xl:ml-24">
          <Button shape="icon" className="hidden md:flex">
            <UserIcon />
          </Button>
          <Button shape="icon" className="relative">
            <CartIcon />
            <div className="bg-secondary absolute top-0.75 right-0.75 flex h-4.5 w-4.5 items-center justify-center rounded-full">
              <span className="text-[12px] font-medium">2</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
