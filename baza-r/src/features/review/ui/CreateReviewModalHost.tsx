import { VisuallyHidden } from "radix-ui";
import { Modal } from "../../../shared/components/ui/modal/Modal";
import { useUiStore } from "../../../shared/model/ui.store";
import { CreateReviewForm } from "./CreateReviewForm";

export default function CreateReviewModalHost() {
  const { open, productId } = useUiStore((s) => s.createReview);
  const closeCreateReview = useUiStore((s) => s.closeCreateReview);

  if (!productId) return null;

  return (
    <Modal.Root open={open} onOpenChange={(o) => !o && closeCreateReview()}>
      <Modal.Content
        side="center"
        rounded="md"
        contentClassName="max-w-180 w-full pb-4"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <VisuallyHidden.Root>
          <Modal.Title>Написати відгук</Modal.Title>
          <Modal.Description>Опишіть ваш досвід з продуктом</Modal.Description>
        </VisuallyHidden.Root>

        <CreateReviewForm productId={productId} />
      </Modal.Content>
    </Modal.Root>
  );
}
