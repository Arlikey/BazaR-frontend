import { VisuallyHidden } from "radix-ui";
import { Modal } from "@/shared/components/ui/modal/Modal";
import { useUiStore } from "@/shared/model/ui.store";
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
        <VisuallyHidden.Root>
          <Modal.Title>Меню навігації</Modal.Title>
          <Modal.Description>
            Бічне меню з навігацією та посиланнями
          </Modal.Description>
        </VisuallyHidden.Root>
        <Drawer />
      </Modal.Content>
    </Modal.Root>
  );
}
