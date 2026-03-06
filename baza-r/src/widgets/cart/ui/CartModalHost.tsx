import { Modal } from "../../../shared/components/ui/modal/Modal";
import { useUiStore } from "../../../shared/model/ui.store";
import { Cart } from "./Cart";

export default function CartModalHost() {
  const open = useUiStore((s) => s.cart.open);
  const closeCart = useUiStore((s) => s.closeCart);

  return (
    <Modal.Root open={open} onOpenChange={(o) => !o && closeCart()}>
      <Modal.Content
        side="center"
        rounded="lg"
        contentClassName="max-w-[1140px] w-[calc(100%-2rem)] scrollbar scrollbar-default overflow-y-auto"
      >
        <Cart />
      </Modal.Content>
    </Modal.Root>
  );
}
