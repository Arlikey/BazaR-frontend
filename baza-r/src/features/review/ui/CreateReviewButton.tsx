import type { ReactNode } from "react";
import { Button } from "@/shared/components/ui/Button";
import { useUiStore } from "@/shared/model/ui.store";
import { cn } from "tailwind-variants";

type Props = {
  className?: string;
  children: ReactNode;
  productId: string;
};

export default function CreateReviewButton({
  className,
  productId,
  children,
}: Props) {
  const openCreateReview = useUiStore((s) => s.openCreateReview);

  return (
    <Button
      size="lg"
      className={cn(
        "text-accent border-accent hover:bg-accent border bg-transparent hover:text-white",
        className,
      )}
      rounded="md"
      onClick={() => openCreateReview(productId)}
    >
      {children}
    </Button>
  );
}
