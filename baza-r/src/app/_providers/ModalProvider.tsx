import { useEffect, useLayoutEffect, useState } from "react";
import AuthModalHost from "../../widgets/login-dialog/ui/AuthModalHost";
import DrawerModalHost from "../../widgets/drawer/ui/DrawerModalHost";
import MegaMenuModalHost from "../../widgets/mega-menu/ui/MegaMenuModalHost";
import { useElementOffset } from "../../shared/hooks/useElementOffset";
import CartModalHost from "../../widgets/cart/ui/CartModalHost";

export const ModalProvider = () => {
  useElementOffset();

  return (
    <>
      <AuthModalHost />
      <DrawerModalHost />
      <MegaMenuModalHost />
      <CartModalHost />
    </>
  );
};
