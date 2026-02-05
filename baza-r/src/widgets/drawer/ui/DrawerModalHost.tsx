import { Modal } from "../../../shared/components/ui/modal/Modal";
import { useUiStore } from "../../../shared/model/ui.store";
import Drawer from "./Drawer";

export default function DrawerModalHost() {
  const open = useUiStore((s) => s.drawer.open);
  const closeDrawer = useUiStore((s) => s.closeDrawer);

  return (
    <Modal.Root open={open} onOpenChange={(o) => !o && closeDrawer()}>
      <Modal.Content
        side="left"
        contentClassName="scrollbar scrollbar-default overflow-y-auto"
      >
        <Drawer />
      </Modal.Content>
    </Modal.Root>
  );
}
