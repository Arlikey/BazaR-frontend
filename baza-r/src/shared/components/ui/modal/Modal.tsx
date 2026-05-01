import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
const modal = tv({
  slots: {
    overlay:
      "fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-[show_.15s_ease-in] data-[state=closed]:animate-[hide_.15s_ease-in] motion-reduce:data-[state=open]:animate-none",
    content:
      "fixed top-0 z-50  bg-neutral-50 outline-none motion-reduce:data-[state=open]:animate-none modal-content",
  },
  variants: {
    side: {
      left: {
        content:
          "left-0 h-full max-w-80 sm:max-w-100 w-full data-[state=open]:animate-[slideInLeft_.6s_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[slideOutLeft_.4s_cubic-bezier(.23,.86,.81,1.01)] shadow-(--shadow-sidebar)",
      },
      center: {
        content:
          "left-1/2 top-1/2 data-[state=open]:animate-[popIn_.21s_ease-out] data-[state=closed]:animate-[popOut_.21s_ease-in] -translate-x-1/2 -translate-y-1/2  will-change:transform",
      },
      top: {
        overlay: "top-(--top-offset) z-40",
        content:
          "left-1/2 -translate-x-1/2 z-40 bg-transparent data-[state=open]:animate-[megaIn_.26s_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[megaOut_.18s_cubic-bezier(0.4,0,1,1)] top-[var(--top-offset)]",
      },
    },
    rounded: {
      sm: { content: "rounded-[14px]" },
      md: { content: "rounded-[15px]" },
      lg: { content: "rounded-[25px]" },
    },
  },
  defaultVariants: { side: "left" },
});
type RootProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};
function Root({
  children,
  open,
  defaultOpen,
  onOpenChange,
  modal: isModal = true,
}: RootProps) {
  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={isModal}
    >
      {children}
    </Dialog.Root>
  );
}
type ContentProps = {
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  onPointerDownOutside?: (event: any) => void;
} & VariantProps<typeof modal>;
function Content({
  children,
  side,
  rounded,
  overlayClassName,
  contentClassName,
  onPointerDownOutside,
}: ContentProps) {
  const s = modal({ side, rounded });
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={s.overlay({ className: overlayClassName })} />
      <Dialog.Content
        className={s.content({ className: contentClassName })}
        onPointerDownOutside={onPointerDownOutside}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
export const Modal = {
  Root,
  Trigger: Dialog.Trigger,
  Close: Dialog.Close,
  Title: Dialog.Title,
  Description: Dialog.Description,
  Content,
};
