import { useEffect, useLayoutEffect, useState } from "react";
import AuthModalHost from "../../widgets/login-dialog/ui/AuthModalHost";
import DrawerModalHost from "../../widgets/drawer/ui/DrawerModalHost";
import MegaMenuModalHost from "../../widgets/mega-menu/ui/MegaMenuModalHost";
import { useHeaderOffset } from "./hook/useHeaderOffset";

export const ModalProvider = () => {
  useHeaderOffset();

  return (
    <>
      <AuthModalHost />
      <DrawerModalHost />
      <MegaMenuModalHost />
    </>
  );
};
