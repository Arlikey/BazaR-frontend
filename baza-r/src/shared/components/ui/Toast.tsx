import { toast as sonnerToast } from "sonner";
import { Button } from "./Button";
import type { ReactNode } from "react";

interface ToastProps {
  id?: string | number;
  title: ReactNode | string;
  description?: string;
  button?: {
    children: ReactNode | string;
    onClick: () => void;
  };
}

interface ToastOptions {
  duration?: number;
}

export function toast(toast: ToastProps, options?: ToastOptions) {
  return sonnerToast.custom((id) => <Toast id={id} {...toast} />, {
    id: toast.id,
    duration: options?.duration ?? 5000,
  });
}

function Toast({ title, description, button, id }: ToastProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 font-[Montserrat] shadow-lg ring-1 ring-black/5">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-neutral-900">{title}</p>
        {description && (
          <p className="text-sm text-neutral-500">{description}</p>
        )}
      </div>
      {button && (
        <Button
          className="bg-accent/10 text-accent hover:bg-accent/20 shrink-0 rounded-lg px-3 py-1 text-sm font-medium"
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.children}
        </Button>
      )}
    </div>
  );
}
