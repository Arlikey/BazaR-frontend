import { Modal } from "@/shared/components/ui/modal/Modal";
import { VisuallyHidden } from "radix-ui";
import { useUiStore } from "@/shared/model/ui.store";
import AuthDialog from "./AuthDialog";

export default function AuthModalHost() {
  const open = useUiStore((s) => s.auth.open);
  const mode = useUiStore((s) => s.auth.mode);
  const closeAuth = useUiStore((s) => s.closeAuth);
  const setAuthMode = useUiStore((s) => s.setAuthMode);

  return (
    <Modal.Root open={open} onOpenChange={(o) => !o && closeAuth()}>
      <Modal.Content side="center" rounded="md">
        <VisuallyHidden.Root>
          <VisuallyHidden.Root>
            <Modal.Title>
              {mode === "login" ? "Вхід до акаунту" : "Реєстрація"}
            </Modal.Title>
            <Modal.Description>
              {mode === "login"
                ? "Введіть email та пароль для входу"
                : "Заповніть форму для створення акаунту"}
            </Modal.Description>
          </VisuallyHidden.Root>
        </VisuallyHidden.Root>
        <AuthDialog mode={mode} onModeChange={setAuthMode} />
      </Modal.Content>
    </Modal.Root>
  );
}
