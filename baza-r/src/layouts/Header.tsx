import React from "react";
import Burger from "../core/components/icons/BurgerIcon";
import Logo from "../core/components/icons/LogoIcon";
import Catalogue from "../core/components/icons/CatalogueIcon";
import { Link, NavLink } from "react-router";
import User from "../core/components/icons/UserIcon";
import Cart from "../core/components/icons/CartIcon";
import Search from "../features/Search/Search";

const Header = () => {
  return (
    <div className="w-full">
      <div className="bg-secondary flex h-8 items-center justify-center">
        <span className="text-lg font-medium uppercase">
          тотальний розпродаж до -50%
        </span>
      </div>
      <div className="bg-primary flex h-18 items-center px-14">
        <button>
          <Burger />
        </button>
        <div className="ml-29">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <button className="bg-secondary hover:bg-hover-secondary ml-29 flex items-center justify-center gap-3 rounded-[43px] px-6 py-2.5">
          <Catalogue />
          <span className="capitalize">каталог</span>
        </button>
        <div className="ml-31 flex flex-1">
          <Search />
        </div>
        <Link
          to={""}
          className="hover:bg-hover-primary ml-29 flex h-[45px] w-[84px] flex-col items-center justify-center gap-1 rounded-[5px]"
        >
          <span className="text-on-light text-[10px] capitalize">
            спробуйте
          </span>
          <span className="bg-premium rounded-[10px] px-2.5 py-1 text-[10px] font-medium uppercase">
            premium
          </span>
        </Link>
        <div className="ml-29 flex items-center gap-2">
          <Link
            to={""}
            className="hover:bg-hover-primary flex h-[45px] w-[45px] items-center justify-center rounded-[5px]"
          >
            <User />
          </Link>
          <Link to={""}>
            <button className="hover:bg-hover-primary flex h-[45px] w-[45px] items-center justify-center rounded-[5px]">
              <Cart />
              <div className="bg-secondary absolute -top-1/3 -right-1/3 flex h-4.5 w-4.5 items-center justify-center rounded-full">
                <span className="text-[12px] font-medium">2</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
