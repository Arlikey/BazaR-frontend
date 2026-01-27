import React from "react";
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
    <header className="w-full">
      <section
        aria-label="Promotion banner"
        className="bg-secondary hidden h-8 items-center justify-center md:flex"
      >
        <span className="text-lg font-medium uppercase">
          тотальний розпродаж до -50%
        </span>
      </section>
      <div className="bg-primary flex h-18 items-center px-14">
        <div className="hidden md:flex">
          <Button shape="icon">
            <BurgerIcon />
          </Button>
        </div>
        <div className="ml-29">
          <Link to={"/"}>
            <LogoIcon />
          </Link>
        </div>
        <div className="hidden md:flex">
          <Button
            color="secondary"
            size="md"
            className="ml-29 gap-3 rounded-[42px] px-6"
          >
            <CatalogueIcon />
            <span className="capitalize">каталог</span>
          </Button>
        </div>
        <div className="ml-31 flex flex-1">
          <Search />
        </div>
        <div className="hidden md:flex">
          <Button shape="icon" className="ml-29 w-21 flex-col gap-1">
            <span className="text-on-light text-[10px] font-normal capitalize">
              спробуйте
            </span>
            <span className="bg-premium rounded-[10px] px-2.5 py-1 text-[10px] font-medium uppercase">
              premium
            </span>
          </Button>
        </div>
        <div className="ml-29 flex items-center gap-2">
          <Button shape="icon">
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
