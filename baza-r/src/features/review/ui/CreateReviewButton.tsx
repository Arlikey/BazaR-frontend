import { Button } from "../../../shared/components/ui/Button";
import { useUiStore } from "../../../shared/model/ui.store";

type Props = {
  productId: string;
};

export default function CreateReviewButton({ productId }: Props) {
  const openCreateReview = useUiStore((s) => s.openCreateReview);

  return (
    <Button
      color="secondary"
      size="lg"
      className="text-white"
      rounded="pill"
      onClick={() => openCreateReview(productId)}
    >
      Написати відгук
    </Button>
  );
}
