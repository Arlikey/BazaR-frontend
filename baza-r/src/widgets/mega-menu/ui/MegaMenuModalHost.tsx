import { VisuallyHidden } from "radix-ui";
import { Modal } from "@/shared/components/ui/modal/Modal";
import { useUiStore } from "@/shared/model/ui.store";
import Megamenu from "./MegaMenu";
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function MegaMenuModalHost() {
  const location = useLocation();
  const open = useUiStore((s) => s.megamenu.open);
  const setMegamenuOpen = useUiStore((s) => s.setMegamenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setMegamenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMegamenuOpen]);

  useEffect(() => {
    setMegamenuOpen(false);
  }, [location.pathname]);

  return (
    <Modal.Root open={open} onOpenChange={setMegamenuOpen}>
      <Modal.Content
        side="top"
        rounded="md"
        contentClassName="scrollbar scrollbar-default overflow-y-auto max-w-420 w-[calc(100%-4rem)]"
      >
        <VisuallyHidden.Root>
          <Modal.Title>Каталог</Modal.Title>
          <Modal.Description>
            Мегаменю зі списком категорій та підкатегорій
          </Modal.Description>
        </VisuallyHidden.Root>
        <Megamenu />
      </Modal.Content>
    </Modal.Root>
  );
}
