import AuthModalHost from "@/widgets/login-dialog/ui/AuthModalHost";
import DrawerModalHost from "@/widgets/drawer/ui/DrawerModalHost";
import MegaMenuModalHost from "@/widgets/mega-menu/ui/MegaMenuModalHost";
import CartModalHost from "@/widgets/cart/ui/CartModalHost";
import CreateReviewModalHost from "@/features/review/ui/CreateReviewModalHost";

export const ModalProvider = () => {
  return (
    <>
      <AuthModalHost />
      <DrawerModalHost />
      <MegaMenuModalHost />
      <CartModalHost />
      <CreateReviewModalHost />
    </>
  );
};
