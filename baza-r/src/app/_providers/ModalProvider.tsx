import { useEffect, useState } from "react";
import AuthModalHost from "../../widgets/login-dialog/ui/AuthModalHost";
import DrawerModalHost from "../../widgets/drawer/ui/DrawerModalHost";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModalHost />
      <DrawerModalHost />
    </>
  );
};
