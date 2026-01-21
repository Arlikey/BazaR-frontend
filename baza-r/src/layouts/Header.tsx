import React from "react";
import Logo from "../core/components/icons/ui/LogoIcon";
import Catalogue from "../core/components/icons/ui/CatalogueIcon";
import { Link } from "react-router";
import User from "../core/components/icons/ui/UserIcon";
import Cart from "../core/components/icons/ui/CartIcon";
import Search from "../features/Search/Search";
import Button from "../core/components/ui/Button";
import BurgerIcon from "../core/components/icons/ui/BurgerIcon";

const Header = () => {
  return (
    <header className="w-full">
      <section
        aria-label="Promotion banner"
        className="bg-secondary flex h-8 items-center justify-center"
      >
        <span className="text-lg font-medium uppercase">
          тотальний розпродаж до -50%
        </span>
      </section>
      <div className="bg-primary flex h-18 items-center px-14">
        <Button shape="icon">
          <BurgerIcon />
        </Button>
        <div className="ml-29">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <Button color="secondary" size="md" className="ml-29 gap-3 rounded-[42px] px-6">
          <Catalogue />
          <span className="capitalize">каталог</span>
        </Button>
        <div className="ml-31 flex flex-1">
          <Search />
        </div>
        <Button shape="icon" className="ml-29 w-21 flex-col gap-1">
          <span className="text-on-light text-[10px] capitalize font-normal">
            спробуйте
          </span>
          <span className="bg-premium rounded-[10px] px-2.5 py-1 text-[10px] font-medium uppercase">
            premium
          </span>
        </Button>
        <div className="ml-29 flex items-center gap-2">
          <Button shape="icon">
            <User />
          </Button>
          <Button shape="icon" className="relative">
            <Cart />
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
