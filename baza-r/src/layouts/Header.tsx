import React from "react";
import Burger from "../core/components/icons/Burger";
import Logo from "../core/components/icons/Logo";
import Catalogue from "../core/components/icons/Catalogue";
import Search from "../core/components/icons/Search";
import Microphone from "../core/components/icons/Microphone";
import { Link, NavLink } from "react-router";
import User from "../core/components/icons/User";
import Cart from "../core/components/icons/Cart";
import Cross from "../core/components/icons/Cross";

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
          <Logo />
        </div>
        <button className="bg-secondary ml-29 flex items-center justify-center gap-3 rounded-[43px] px-6 py-2.5">
          <Catalogue />
          <span className="capitalize">каталог</span>
        </button>
        <div className="bg-on-light ml-31 flex h-10 flex-1 items-center justify-between rounded-[20px]">
          <div className="flex h-full flex-1 items-center">
            <div className="ml-5">
              <Search />
            </div>
            <input
              className="ml-3 flex-1 pr-4 outline-0 text-neutral"
              type="text"
              placeholder="Я шукаю..."
            />
            <div className="mr-3">
              <Cross />
            </div>
          </div>
          <div className="flex h-full items-center">
            <div className="border-l border-gray-200 px-3">
              <Microphone />
            </div>
            <button className="bg-secondary flex h-full items-center rounded-r-[20px] px-4 py-2.5">
              <span className="capitalize">знайти</span>
            </button>
          </div>
        </div>
        <div className="ml-29 flex flex-col items-center justify-center gap-1.5">
          <span className="text-on-light text-[10px] capitalize">
            спробуйте
          </span>
          <button className="bg-premium rounded-[10px] px-2.5 py-1 text-[10px] font-medium uppercase">
            premium
          </button>
        </div>
        <div className="ml-29 flex items-center gap-6">
          <Link to={""}>
            <User />
          </Link>
          <Link to={""} className="relative">
            <Cart />
            <div className="bg-secondary absolute -top-1/3 -right-1/3 flex h-4.5 w-4.5 items-center justify-center rounded-full">
              <span className="text-[12px] font-medium">2</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
