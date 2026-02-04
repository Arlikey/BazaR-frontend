import { Link } from "react-router";
import Button from "../../shared/components/ui/Button";
import Search from "../../features/Search/Search";
import {
  BurgerIcon,
  CartIcon,
  CategoryItemSkeletonIcon,
  LogoIcon,
  UserIcon,
} from "../../shared/components/icons/ui";
import { Modal } from "../../shared/components/ui/modal/Modal";
import Drawer from "../drawer/Drawer";
import LoginDialog from "../login-dialog/ui/LoginDialog";

export default function Header() {
  return (
    <header className="bg-brand sticky top-0 z-50 h-16 w-full px-4 md:px-6 lg:h-18 xl:px-8 2xl:px-14">
      <div className="mx-auto flex h-full max-w-480 items-center">
        <Modal.Root>
          <Modal.Trigger asChild>
            <div className="hidden sm:flex">
              <Button
                shape="icon"
                aria-label="Open menu"
                className="text-inverse"
              >
                <BurgerIcon />
              </Button>
            </div>
          </Modal.Trigger>

          <Modal.Content
            side="left"
            contentClassName="scrollbar scrollbar-default overflow-y-auto"
          >
            <Drawer />
          </Modal.Content>
        </Modal.Root>

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
            <CategoryItemSkeletonIcon />
            <span className="capitalize">каталог</span>
          </Button>
        </div>

        <div className="mx-6 flex flex-1 lg:ml-24">
          <Search />
        </div>
        <div className="hidden 2xl:flex">
          <Button shape="icon" className="ml-20 w-21 flex-col gap-1 2xl:ml-24">
            <span className="text-inverse text-xs font-normal capitalize">
              спробуйте
            </span>
            <span className="bg-premium rounded-[10px] px-2.5 py-1 text-xs font-medium uppercase">
              premium
            </span>
          </Button>
        </div>
        <div className="text-inverse ml-20 flex items-center gap-2 2xl:ml-24">
          <Modal.Root>
            <Modal.Trigger asChild>
              <Button shape="icon" className="hidden md:flex" aria-label="User">
                <UserIcon />
              </Button>
            </Modal.Trigger>

            <Modal.Content
              side="center"
              contentClassName="scrollbar scrollbar-default overflow-y-auto"
            >
              <LoginDialog />
            </Modal.Content>
          </Modal.Root>

          <Button shape="icon" className="relative" aria-label="Cart">
            <CartIcon />
            <div className="bg-accent text-foreground absolute top-0.75 right-0.75 flex h-4.5 w-4.5 items-center justify-center rounded-full">
              <span className="text-sm font-medium">2</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
