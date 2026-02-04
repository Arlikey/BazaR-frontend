import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
const modal = tv({
  slots: {
    overlay:
      "fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-[show_.15s_ease-in] data-[state=closed]:animate-[hide_.15s_ease-in] motion-reduce:data-[state=open]:animate-none",
    content:
      "fixed top-0 z-50  bg-neutral-50 outline-none motion-reduce:data-[state=open]:animate-none",
  },
  variants: {
    side: {
      left: {
        content:
          "left-0 h-dvh w-[425px] data-[state=open]:animate-[slideInLeft_.6s_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[slideOutLeft_.4s_cubic-bezier(0.32,0,0.67,0)] shadow-(--shadow-sidebar)",
      },
      center: {
        content:
          "left-1/2 top-1/2 data-[state=open]:animate-[popIn_.21s_ease-out] data-[state=closed]:animate-[popOut_.21s_ease-in] -translate-x-1/2 -translate-y-1/2",
      },
    },
    rounded: {
      sm: "rounded-[14px]",
      md: "rounded-[15px]",
      lg: "rounded-[25px]",
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
} & VariantProps<typeof modal>;
function Content({
  children,
  side,
  rounded,
  overlayClassName,
  contentClassName,
}: ContentProps) {
  const s = modal({ side, rounded });
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={s.overlay({ className: overlayClassName })} />
      <Dialog.Content className={s.content({ className: contentClassName })}>
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
