import { Modal } from "../../../shared/components/ui/modal/Modal";
import { useUiStore } from "../../../shared/model/ui.store";
import Megamenu from "./MegaMenu";

export default function MegaMenuModalHost() {
  const open = useUiStore((s) => s.megamenu.open);
  const setMegamenuOpen = useUiStore((s) => s.setMegamenuOpen);

  return (
    <Modal.Root open={open} onOpenChange={setMegamenuOpen}>
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
