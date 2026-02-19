import { Modal } from "../../../shared/components/ui/modal/Modal";
import { useUiStore } from "../../../shared/model/ui.store";
import Megamenu from "./MegaMenu";

export default function MegaMenuModalHost() {
  const open = useUiStore((s) => s.megamenu.open);
  const closeMegamenu = useUiStore((s) => s.closeMegamenu);

  return (
    <Modal.Root open={open} onOpenChange={(o) => !o && closeMegamenu()}>
      <Modal.Content
        side="top"
        rounded="md"
        contentClassName="scrollbar scrollbar-default overflow-y-auto"
      >
        <Megamenu />
      </Modal.Content>
    </Modal.Root>
  );
}
